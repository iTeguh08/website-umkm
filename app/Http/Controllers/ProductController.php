<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Enums\BidangUsaha;
use App\Enums\JenisUsaha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $products = Product::with('images')
            ->when($search, function ($query, $search) {
                return $query->where('nama_usaha', 'like', '%' . $search . '%')
                    ->orWhere('lokasi', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->latest()->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    public function homeProduct(Request $request)
    {
        $search = $request->query('search');
        
        $products = Product::with('images')
            ->when($search, function ($query) use ($search) {
                return $query->where(function($q) use ($search) {
                    $q->where('nama_usaha', 'like', '%' . $search . '%')
                      ->orWhere('lokasi', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->has('images')
            ->latest()
            ->paginate(6);

        return Inertia::render('Index', [
            'products' => $products,
            'filters' => [
                'search' => $search
            ],
            'canLogin' => true,
            'canRegister' => true,
            'laravelVersion' => '1',
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'bidangUsahaOptions' => BidangUsaha::values(),
            'jenisUsahaOptions' => JenisUsaha::values(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'bidang_usaha' => 'required|in:' . implode(',', BidangUsaha::values()),
            'jenis_usaha' => 'required|in:' . implode(',', JenisUsaha::values()),
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = new Product();
        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;
        $product->description = $request->description;
        $product->bidang_usaha = $request->bidang_usaha;
        $product->jenis_usaha = $request->jenis_usaha;

        $product->save();
        
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');

                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->route('products.index', ['page' => $request->page ?? 1])
            ->with('message', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $product->load('images');

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'bidangUsahaOptions' => BidangUsaha::values(),
            'jenisUsahaOptions' => JenisUsaha::values(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'nama_usaha' => 'required|string|max:255',
            'lokasi' => 'required|string',
            'email' => 'required|email',
            'telephone' => 'required|string',
            'bidang_usaha' => 'required|in:' . implode(',', BidangUsaha::values()),
            'jenis_usaha' => 'required|in:' . implode(',', JenisUsaha::values()),
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;
        $product->description = $request->description;
        $product->bidang_usaha = $request->bidang_usaha;
        $product->jenis_usaha = $request->jenis_usaha;

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');

                $product->images()->create([
                    'image_path' => $path
                ]);
            }
        }

        $product->save();

        return redirect()->route('products.index', ['page' => $request->page ?? 1])
            ->with('message', 'Product updated successfully.');
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
        $product->load('images');
        return Inertia::render('Admin/Products/View', [
            'product' => $product
        ]);
    }

    public function deleteImage($id)
    {
        $image = ProductImage::findOrFail($id);

        // Hapus file dari storage
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        $image->delete();

        return back()->with('message', 'Image deleted successfully');
    }

    public function showPublic(Product $product)
    {
        $product->load('images');
        return Inertia::render('ProductDetail', [
            'product' => $product
        ]);
    }
}
