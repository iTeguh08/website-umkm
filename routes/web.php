<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin routes
Route::middleware(['auth'])->group(function () {
    // Fix CRUD routes for daftar-usaha using ProductController
    // These specific routes need to come BEFORE the catch-all route
    Route::get('/admin/dashboard/daftar-usaha', [ProductController::class, 'index'])->name('admin.dashboard.daftar-usaha');
    Route::post('/admin/dashboard/daftar-usaha', [ProductController::class, 'store'])->name('admin.dashboard.daftar-usaha.store');
    Route::put('/admin/dashboard/daftar-usaha/{id}', [ProductController::class, 'update'])->name('admin.dashboard.daftar-usaha.update');
    Route::delete('/admin/dashboard/daftar-usaha/{id}', [ProductController::class, 'destroy'])->name('admin.dashboard.daftar-usaha.destroy');
    
    // This catch-all route should come AFTER the specific routes
    Route::get('/admin/dashboard/{page?}', function ($page = 'jenis-usaha') {
        return Inertia::render('Admin/DashboardUMKM', [
            'currentPage' => $page
        ]);
    })->name('admin.dashboard');
});

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