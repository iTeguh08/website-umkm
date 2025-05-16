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
    public function frontendIndex()
    {
        $posts = Post::with(['tags'])
            ->latest()
            ->paginate(9);

        return Inertia::render('PostIndex', [
            'posts' => $posts->items(),
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ]
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
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;

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
            // 'tags' => 'nullable|array',
            // 'tags.*' => 'exists:tags,id',
        ]);

        $post->title = $request->title;
        $post->description = $request->description;

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
