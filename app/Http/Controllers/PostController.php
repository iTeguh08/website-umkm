<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the posts for admin.
     */
    public function index()
    {
        $posts = Post::latest()->get();
        return Inertia::render('Admin/Posts/Index', compact('posts'));
    }

    /**
     * Display a listing of the posts for frontend.
     */
    public function frontendIndex(Request $request)
    {
        $category = $request->query('category', 'Semua');
        $showAll = $request->query('show_all', false);

        // Get sticky posts (not affected by category filter)
        $stickyQuery = Post::query()
            ->with(['tags', 'user'])
            ->where('sticky', true);

        if (!$showAll) {
            $stickyQuery->where('published', true);
        }

        $stickyPosts = $stickyQuery->latest()->take(3)->get();
        $stickyPostIds = $stickyPosts->pluck('id')->toArray();

        // Get featured posts (non-sticky)
        $featuredQuery = Post::query()
            ->with(['tags', 'user'])
            ->where('featured', true)
            ->where('sticky', false) // Exclude sticky posts
            ->whereNotIn('id', $stickyPostIds); // Also exclude sticky posts by ID

        if (!$showAll) {
            $featuredQuery->where('published', true);
        }

        // Filter featured posts by category if not 'Semua'
        if ($category !== 'Semua') {
            $featuredQuery->whereHas('tags', function ($query) use ($category) {
                $query->where('title', $category);
            });
        }

        $featuredPosts = $featuredQuery->latest()
            ->get();

        $featuredPostIds = $featuredPosts->pluck('id')->toArray();

        // Get all posts (non-sticky, non-featured, and not in sticky posts)
        $query = Post::query()
            ->with(['tags', 'user'])
            ->where('sticky', false) // Exclude sticky posts
            ->whereNotIn('id', $stickyPostIds) // Also exclude by ID to be safe
            ->whereNotIn('id', $featuredPostIds); // Exclude featured posts

        // Filter by published status if not showing all
        if (!$showAll) {
            $query->where('published', true);
        }

        // If category is not 'Semua', filter by category
        if ($category !== 'Semua') {
            $categoryPosts = Post::query()
                ->with('tags')
                ->where('sticky', false) // Exclude sticky posts from category filter
                ->whereNotIn('id', $stickyPostIds) // Exclude sticky posts by ID
                ->whereHas('tags', function ($query) use ($category) {
                    $query->where('title', $category);
                });

            if (!$showAll) {
                $categoryPosts->where('published', true);
            }

            $categoryPostIds = $categoryPosts->pluck('id')->toArray();
            $query->whereIn('id', $categoryPostIds);
        }

        $posts = $query->latest()->paginate(9);

        // Get all tags that have been used by posts
        $usedTagsQuery = Post::query()->with('tags');
        if (!$showAll) {
            $usedTagsQuery->where('published', true);
        }

        $usedTags = $usedTagsQuery->get()
            ->pluck('tags')
            ->flatten()
            ->unique('title')
            ->pluck('title')
            ->toArray();

        // Add 'Semua' to the categories array
        $categories = array_merge(['Semua'], $usedTags);

        // Combine sticky and regular posts
        $paginatedPosts = $stickyPosts->merge($posts->items())->forPage(1, 9);

        return Inertia::render('PostIndex', [
            'posts' => $paginatedPosts,
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'total' => $posts->total() + $stickyPosts->count(),
            ],
            'categories' => $categories,
            'activeCategory' => $category,
            'featuredPosts' => $featuredPosts,
            'stickyPosts' => $stickyPosts, // Add sticky posts to the response
        ]);
    }

    public function create()
    {
        $tags = Tag::all();
        return Inertia::render('Admin/Posts/Create', [
            'tags' => $tags
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sticky' => 'boolean',
            'published' => 'boolean',
            'featured' => 'boolean',
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        $post->sticky = $request->boolean('sticky');
        $post->published = $request->boolean('published');
        $post->featured = $request->boolean('featured');

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->store('posts', 'public');
            $post->photo = basename($path);
        }

        $post->save();

        // Attach tags if provided
        if ($request->has('tags') && !empty($request->tags)) {
            // Pastikan hanya ID yang dikirim ke attach
            $tagIds = collect($request->tags)->pluck('id')->toArray();
            $post->tags()->attach($tagIds);
        }

        return redirect()->route('posts.index')
            ->with('message', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        $tags = Tag::all();
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post->load('tags'),
            'tags' => $tags
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'sticky' => 'boolean',
            'published' => 'boolean',
            'featured' => 'boolean',
            // 'tags' => 'nullable|array',
            // 'tags.*' => 'exists:tags,id',
        ]);

        $post->title = $request->title;
        $post->description = $request->description;
        $post->sticky = $request->boolean('sticky');
        $post->published = $request->boolean('published');
        $post->featured = $request->boolean('featured');

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($post->photo) {
                Storage::delete('public/posts/' . $post->photo);
            }

            $file = $request->file('photo');
            $path = $file->store('posts', 'public');
            $post->photo = basename($path);
        }

        $post->save();

        // Sync tags
        if ($request->has('tags')) {
            $tagIds = collect($request->tags)->pluck('id')->toArray();
            $post->tags()->sync($tagIds);
        } else {
            $post->tags()->detach();
        }

        return redirect()->route('posts.index')
            ->with('message', 'Post updated successfully.');
    }

    public function show(Post $post)
    {
        $posts = Post::where('published', true)
            ->where('id', '!=', $post->id)
            ->with(['user', 'tags'])
            ->latest()
            ->take(6)
            ->get();

        // Load relasi yang diperlukan
        $post->load(['user', 'tags']);

        return Inertia::render('PostDetail', [  // Ubah dari 'Posts/Show' menjadi 'PostDetail'
            'post' => $post,
            'posts' => $posts
        ]);
    }

    public function destroy(Post $post)
    {
        if ($post->photo) {
            Storage::delete('public/posts/' . $post->photo);
        }

        $post->delete();

        return redirect()->route('posts.index')
            ->with('message', 'Post deleted successfully.');
    }
}
