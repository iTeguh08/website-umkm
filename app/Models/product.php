<?php
// Langkah 1: Membuat Model dan Migration sekaligus
// Command: php artisan make:model Product -m

// File: app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    // Tentukan fields yang dapat diisi
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock'
    ];
}

// File: database/migrations/xxxx_xx_xx_xxxxxx_create_products_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

// Langkah 3: Mendaftarkan Route di web.php
// File: routes/web.php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::resource('products', ProductController::class);

// Langkah 4: Menjalankan migrasi
// Command: php artisan migrate