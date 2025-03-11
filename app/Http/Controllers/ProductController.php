<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
{
    // Make sure we're getting ALL products without any filters
    $products = Product::latest()->get();
    
    // Log the count to verify
    Log::info('Fetching all products. Count: ' . $products->count());
    
    return Inertia::render('Admin/DashboardUMKM', [
        'currentPage' => 'daftar-usaha',
        'products' => $products
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

        Product::create($validated);

        return redirect()->back()->with('success', 'Product created successfully');
    } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Error creating product: ' . $e->getMessage());
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
                'image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            // Handle image updates
            if ($request->hasFile('image')) {
                // Delete old image
                if ($product->image) {
                    Storage::disk('public')->delete(
                        str_replace('/storage/', '', $product->image)
                    );
                }
                // Store new image
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = Storage::url($path);
            } else {
                // Preserve existing image
                $validated['image'] = $product->image;
            }

            $product->update($validated);

            return redirect()->route('admin.dashboard.daftar-usaha')
                   ->with('success', 'Product updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Update error: ' . $e->getMessage());
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
