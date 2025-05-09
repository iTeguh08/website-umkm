<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\BidangUsaha;
use App\Enums\JenisUsaha;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_usaha',
        'lokasi',
        'email',
        'telephone',
        'image',
        'description',
        'bidang_usaha',
        'jenis_usaha'
    ];

    protected $casts = [
        'bidang_usaha' => BidangUsaha::class,
        'jenis_usaha' => JenisUsaha::class,
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    /**
     * Get the main image for the product.
     */
    public function mainImage()
    {
        return $this->hasOne(ProductImage::class)->where('is_main', true);
    }

    protected $dates = ['deleted_at'];
}
