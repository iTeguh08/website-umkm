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
            ->where('is_published', true)
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
            'is_published' => 'sometimes|boolean',
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
        $product->is_published = $request->input('is_published', false);

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
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'existing_images' => 'nullable|array',
            'existing_images.*.id' => 'required|exists:product_images,id',
            'existing_images.*.order' => 'required|integer|min:0',
            'image_orders' => 'nullable|json',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'is_published' => 'sometimes|boolean',
        ]);

        $productData = $request->only([
            'nama_usaha', 'lokasi', 'email', 'telephone', 'description',
            'bidang_usaha', 'jenis_usaha', 'latitude', 'longitude'
        ]);
        $productData['is_published'] = $request->input('is_published', false);

        $product->update($productData);

        // Update existing images order
        if ($request->has('existing_images')) {
            foreach ($request->input('existing_images') as $imageData) {
                ProductImage::where('id', $imageData['id'])
                            ->where('product_id', $product->id)
                            ->update(['order' => $imageData['order']]);
            }
        }
        
        // Handle new image uploads and their order
        if ($request->hasFile('images')) {
            $imageOrders = json_decode($request->input('image_orders'), true);
            $uploadedFiles = $request->file('images');

            // Create a map of original filename to uploaded file object
            $fileMap = [];
            foreach ($uploadedFiles as $file) {
                $fileMap[$file->getClientOriginalName()] = $file;
            }

            if(!empty($imageOrders) && !empty($fileMap)) {
                foreach($imageOrders as $orderInfo) {
                    $fileName = $orderInfo['name'];
                    if (isset($fileMap[$fileName])) {
                        $imageFile = $fileMap[$fileName];
                        $path = $imageFile->store('products', 'public');
                        
                        $product->images()->create([
                            'image_path' => $path,
                            'order' => $orderInfo['order']
                        ]);
                    }
                }
            } else {
                // Fallback if order info is not correctly provided
                foreach ($uploadedFiles as $index => $image) {
                    $path = $image->store('products', 'public');
                    // Calculate a fallback order
                    $maxOrder = $product->images()->max('order') ?? -1;
                    $product->images()->create([
                        'image_path' => $path,
                        'order' => $maxOrder + 1 + $index
                    ]);
                }
            }
        }
        
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
        
        // Cache key untuk nearby products berdasarkan product ID dan koordinat
        $cacheKey = 'nearby_products_' . $product->id . '_' . $product->latitude . '_' . $product->longitude;
        
        // Simpan cache key untuk management
        $cacheKeys = cache()->get('nearby_products_keys', []);
        if (!in_array($cacheKey, $cacheKeys)) {
            $cacheKeys[] = $cacheKey;
            cache()->forever('nearby_products_keys', $cacheKeys);
        }
        
        // Cache nearby products selama 1 jam untuk mengurangi query database
        $nearbyProducts = cache()->remember($cacheKey, 3600, function() use ($product) {
            if ($product->latitude && $product->longitude) {
                return Product::with('images')
                    ->where('id', '!=', $product->id)
                    ->whereNotNull('latitude')
                    ->whereNotNull('longitude')
                    ->has('images')
                    ->selectRaw('
                        *,
                        (6371 * acos(
                            cos(radians(?)) * 
                            cos(radians(latitude)) * 
                            cos(radians(longitude) - radians(?)) + 
                            sin(radians(?)) * 
                            sin(radians(latitude))
                        )) AS distance', 
                        [$product->latitude, $product->longitude, $product->latitude]
                    )
                    ->having('distance', '<=', 25) // 25km radius
                    ->orderBy('distance', 'asc')
                    ->limit(12) // Batasi untuk performa
                    ->get();
            }
            
            return collect();
        });

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'nearbyProducts' => $nearbyProducts,
            'googleMapsApiKey' => config('services.google_maps.api_key', null)
        ]);
    }
}
