<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::latest()->get();
        
        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tags/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $tag = new Tag();
        $tag->title = $request->title;
        $tag->description = $request->description;

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $path = $file->store('tags', 'public');
            $tag->photo = basename($path);
        }

        $tag->save();

        return redirect()->route('tags.index')
            ->with('message', 'Tag created successfully.');
    }

    public function edit(Tag $tag)
    {
        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, Tag $tag)
    {
        // dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $tag->title = $request->title;
        $tag->description = $request->description;

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($tag->photo) {
                Storage::delete('public/tags/' . $tag->photo);
            }
            
            $file = $request->file('photo');
            // $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->store('tags', 'public');
            $tag->photo = basename($path);
        }

        $tag->save();

        return redirect()->route('tags.index')
            ->with('message', 'Tag updated successfully.');
    }

    public function destroy(Tag $tag)
    {
        if ($tag->photo) {
            Storage::delete('public/tags/' . $tag->photo);
        }
        
        $tag->delete();

        return redirect()->route('tags.index')
            ->with('message', 'Tag deleted successfully.');
    }
}