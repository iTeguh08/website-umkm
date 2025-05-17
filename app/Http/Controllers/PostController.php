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
    
        // Get featured posts first
        $featuredPosts = Post::where('published', true)
            ->where('featured', true)
            ->with(['tags', 'user'])
            ->latest()
            ->take(3) // Get up to 3 featured posts
            ->get();
    
        $query = Post::with(['tags', 'user'])
            ->where('published', true)
            ->latest();
    
        if ($category !== 'Semua') {
            $query->whereHas('tags', function ($query) use ($category) {
                $query->where('title', $category);
            });
        }
    
        $posts = $query->paginate(9);
    
        $categories = Tag::pluck('title')->toArray();
    
        return Inertia::render('PostIndex', [
            'posts' => $posts->items(),
            'featuredPosts' => $featuredPosts,
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
            'activeCategory' => $category,
            'categories' => $categories
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
