<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class Product2Controller extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $products = Product::when($search, function ($query, $search) {
            return $query->where('nama_usaha', 'like', '%' . $search . '%')
                ->orWhere('lokasi', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })->latest()->paginate(10);

        // Log the count to verify
        Log::info('Fetching products. Count: ' . $products->count());

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = new Product();
        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('products', 'public');
            $product->image = basename($path);
        }

        $product->save();

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::delete('public/products/' . $product->image);
            }

            $file = $request->file('image');
            // $fileName = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->store('products', 'public');
            $product->image = basename($path);
        }

        $product->save();

        return redirect()->route('products.index')
            ->with('message', 'Products updated successfully.');
    }

    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::delete('public/products/' . $product->image);
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('message', 'Product deleted successfully.');
    }
    public function show(Product $product)
    {
        return Inertia::render('Admin/Products/View', [
            'product' => $product
        ]);
    }
}
