<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
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

        return redirect()->route('posts.index')
            ->with('message', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $post->title = $request->title;
        $post->description = $request->description;

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($post->photo) {
                Storage::delete('public/posts/' . $post->photo);
            }
            
            $file = $request->file('photo');
            // $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->store('posts', 'public');
            $post->photo = basename($path);
        }

        $post->save();

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