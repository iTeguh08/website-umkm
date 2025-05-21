<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;

Route::middleware(['auth'])->group(function () {
    Route::resource('admin/tags', TagController::class)->names('tags');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('admin/posts', PostController::class)->names('posts');
});

///


// PRODUCTS
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/products', ProductController::class);
});

Route::post('products/{product}/reorder-images', [ProductController::class, 'reorderImages'])
    ->name('products.reorder-images');

Route::delete('/product-images/{id}', [ProductController::class, 'deleteImage'])->name('product-images.delete');

// Admin routes
// Route::get('/admin/dashboard/{page?}', function ($page = 'jenis-usaha') {
//     return Inertia::render('Admin/DashboardUMKM', [
//         'currentPage' => $page
//     ]);
// })->name('admin.dashboard');

// Add explicit routes for products
// Route::get('/admin/product', function () {
//     return Inertia::render('Admin/DashboardUMKM', [
//         'currentPage' => 'index'
//     ]);
// })->name('admin.product');

// Public routes
// Route::get('/', function () {
//     return Inertia::render('Index', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', [ProductController::class, 'homeProduct'])->name('homepage');
Route::get('/product/{product}', [ProductController::class, 'showPublic'])->name('product.detail');
Route::get('/posts', [PostController::class, 'frontendIndex'])->name('frontend.posts.index');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication routes
require __DIR__ . '/auth.php';
