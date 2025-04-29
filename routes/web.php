<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Product2Controller;

// POSTS
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/posts', PostController::class);
});
///

// PRODUCTS
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/products', Product2Controller::class);
});


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
Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication routes
require __DIR__.'/auth.php';