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
        $createdFrom = $request->query('created_from');
        $createdTo = $request->query('created_to');
        $updatedFrom = $request->query('updated_from');
        $updatedTo = $request->query('updated_to');
        $timestampType = $request->query('timestamp_type', 'created_at');

        $products = Product::with('images')
            ->when($search, function ($query, $search) {
                return $query->where('nama_usaha', 'like', '%' . $search . '%')
                    ->orWhere('lokasi', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($createdFrom && $createdTo, function ($query) use ($createdFrom, $createdTo) {
                return $query->whereBetween('created_at', [$createdFrom, $createdTo]);
            })
            ->when($updatedFrom && $updatedTo, function ($query) use ($updatedFrom, $updatedTo) {
                return $query->whereBetween('updated_at', [$updatedFrom, $updatedTo]);
            })
            ->latest($timestampType) // Order by the selected timestamp type
            ->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'created_from' => $createdFrom,
                'created_to' => $createdTo,
                'updated_from' => $updatedFrom,
                'updated_to' => $updatedTo,
                'timestamp_type' => $timestampType
            ]
        ]);
    }

    public function homeProduct(Request $request)
    {
        $search = $request->query('search');
        $jenisUsaha = $request->query('jenis_usaha');
        $bidangUsaha = $request->query('bidang_usaha');

        $products = Product::with('images')
            ->when($search, function ($query) use ($search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('nama_usaha', 'like', '%' . $search . '%')
                        ->orWhere('lokasi', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            ->when($jenisUsaha, function ($query) use ($jenisUsaha) {
                return $query->where('jenis_usaha', $jenisUsaha);
            })
            ->when($bidangUsaha, function ($query) use ($bidangUsaha) {
                return $query->where('bidang_usaha', $bidangUsaha);
            })
            ->has('images')
            ->latest()
            ->paginate(6);

        return Inertia::render('Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'jenis_usaha' => $jenisUsaha,
                'bidang_usaha' => $bidangUsaha
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
            'description' => 'nullable|string',
            'bidang_usaha' => 'required|in:' . implode(',', BidangUsaha::values()),
            'jenis_usaha' => 'required|in:' . implode(',', JenisUsaha::values()),
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_orders' => 'nullable|array',
            'image_orders.*' => 'integer|min:0',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $product = new Product();
        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;
        $product->description = $request->description;
        $product->bidang_usaha = $request->bidang_usaha;
        $product->jenis_usaha = $request->jenis_usaha;
        $product->latitude = $request->latitude;
        $product->longitude = $request->longitude;

        $product->save();

        if ($request->hasFile('images')) {
            $imageOrders = $request->input('image_orders', []);
            
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');

                // Use the order from frontend drag & drop, fallback to index
                $order = isset($imageOrders[$index]) ? $imageOrders[$index] : $index;

                $product->images()->create([
                    'image_path' => $path,
                    'order' => $order
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
            'description' => 'nullable|string',
            'bidang_usaha' => 'required|in:' . implode(',', BidangUsaha::values()),
            'jenis_usaha' => 'required|in:' . implode(',', JenisUsaha::values()),
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'existing_images' => 'nullable|array',
            'existing_images.*.id' => 'exists:product_images,id',
            'existing_images.*.order' => 'integer|min:0',
            'image_orders' => 'nullable|array',
            'image_orders.*' => 'integer|min:0',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $product->nama_usaha = $request->nama_usaha;
        $product->lokasi = $request->lokasi;
        $product->email = $request->email;
        $product->telephone = $request->telephone;
        $product->description = $request->description;
        $product->bidang_usaha = $request->bidang_usaha;
        $product->jenis_usaha = $request->jenis_usaha;
        $product->latitude = $request->latitude;
        $product->longitude = $request->longitude;

        // Update existing images order
        if ($request->has('existing_images')) {
            foreach ($request->input('existing_images') as $imageData) {
                $image = ProductImage::find($imageData['id']);
                if ($image && $image->product_id === $product->id) {
                    $image->update(['order' => $imageData['order']]);
                }
            }
        }
        
        // Handle new image uploads with proper ordering
        if ($request->hasFile('images')) {
            $imageOrders = $request->input('image_orders', []);
            
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                
                // Use the order from frontend drag & drop, fallback to calculated order
                $order = isset($imageOrders[$index]) ? $imageOrders[$index] : $product->images()->count() + $index;
                
                $product->images()->create([
                    'image_path' => $path,
                    'order' => $order
                ]);
            }
        }
        
        $product->update($request->except(['images', 'existing_images', 'image_orders']));
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
