<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $products = Product::when($search, function ($query, $search) {
            return $query->where('nama_usaha', 'like', '%' . $search . '%');
        })->latest()->paginate(10);

        // Log the count to verify
        Log::info('Fetching all products. Count: ' . $products->count());
        
        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => 'daftar-usaha',
            'products' => $products,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        }

        $product = Product::create($validated);

        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => 'daftar-usaha',
            'products' => Product::latest()->paginate(10),
            'filters' => [
                'search' => $request->query('search')
            ],
            'flash' => ['success' => 'Product created successfully']
        ]);
    } catch (\Exception $e) {
        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => 'daftar-usaha',
            'products' => Product::latest()->paginate(10),
            'filters' => [
                'search' => $request->query('search')
            ],
            'flash' => ['error' => 'Error creating product: ' . $e->getMessage()]
        ]);
    }
}

public function update(Request $request, $id)
{
    try {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:255',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handle image updates
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                $oldImagePath = str_replace('/storage/', '', $product->image);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }
            // Store new image
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = Storage::url($path);
        } else {
            // Keep existing image
            $validated['image'] = $product->image;
        }

        $product->update($validated);

        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => 'daftar-usaha',
            'products' => Product::latest()->paginate(10),
            'filters' => [
                'search' => $request->query('search')
            ],
            'flash' => ['success' => 'Product updated successfully']
        ]);
    } catch (\Exception $e) {
        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => 'daftar-usaha',
            'products' => Product::latest()->paginate(10),
            'filters' => [
                'search' => $request->query('search')
            ],
            'flash' => ['error' => 'Update error: ' . $e->getMessage()]
        ]);
    }
}

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            if ($product->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
            }

            $product->delete();

            return redirect()->route('admin.dashboard.daftar-usaha')->with('success', 'Product deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Error deleting product: ' . $e->getMessage());
        }
    }
}
