<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProductDummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID'); // Indonesian locale
        
        $businessTypes = [
            'Makanan & Minuman',
            'Fashion & Pakaian',
            'Kerajinan Tangan',
            'Elektronik & Gadget',
            'Perhiasan & Aksesoris',
            'Furniture',
            'Kosmetik & Perawatan',
            'Toko Buku & Alat Tulis',
            'Jasa Fotografi',
            'Bengkel & Service',
            'Toko Bunga',
            'Toko Mainan',
            'Toko Alat Musik',
            'Toko Olahraga',
            'Toko Hewan Peliharaan',
            'Toko Kue & Roti',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir'
        ];

        $locations = [
            'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan',
            'Semarang', 'Denpasar', 'Malang', 'Bekasi', 'Tangerang',
            'Depok', 'Bogor', 'Palembang', 'Makassar', 'Balikpapan',
            'Banjarmasin', 'Pekanbaru', 'Pontianak', 'Semarang', 'Surakarta',
            'Bandar Lampung', 'Cirebon', 'Cimahi', 'Cilegon', 'Bogor',
            'Depok', 'Bekasi', 'Tangerang', 'Serang', 'Tasikmalaya',
            'Cianjur', 'Ciparay', 'Cimahi', 'Cirebon', 'Cirebon',
            'Cirebon', 'Cirebon', 'Cirebon', 'Cirebon', 'Cirebon',
            'Cirebon', 'Cirebon', 'Cirebon', 'Cirebon', 'Cirebon'
        ];

        // Generate 30 random business names
        $businessNames = [
            'Warung Makan Nusantara',
            'Bakul Baju Cantik',
            'Kerajinan Bambu',
            'Tekno Shop',
            'Perhiasan Emas',
            'Furniture Jati',
            'Kosmetik Alami',
            'Toko Buku Edukasi',
            'Studio Foto',
            'Bengkel Motor',
            'Toko Bunga Segar',
            'Mainan Edukasi',
            'Alat Musik',
            'Toko Olahraga',
            'Pet Shop',
            'Roti & Kue',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir',
            'Toko Souvenir'
        ];

        // Mapping tipe usaha ke nama file gambar dummy lokal
        $typeToImage = [
            'Makanan & Minuman' => '/images/dummy/makanan.png',
            'Fashion & Pakaian' => '/images/dummy/fashion.png',
            'Kerajinan Tangan' => '/images/dummy/kerajinan.png',
            'Elektronik & Gadget' => '/images/dummy/elektronik.png',
            'Perhiasan & Aksesoris' => '/images/dummy/perhiasan.png',
            'Furniture' => '/images/dummy/furniture.png',
            'Kosmetik & Perawatan' => '/images/dummy/kosmetik.png',
            'Toko Buku & Alat Tulis' => '/images/dummy/buku.png',
            'Jasa Fotografi' => '/images/dummy/fotografi.png',
            'Bengkel & Service' => '/images/dummy/bengkel.png',
            'Toko Bunga' => '/images/dummy/bunga.png',
            'Toko Mainan' => '/images/dummy/mainan.png',
            'Toko Alat Musik' => '/images/dummy/alatmusik.png',
            'Toko Olahraga' => '/images/dummy/olahraga.png',
            'Toko Hewan Peliharaan' => '/images/dummy/hewan.png',
            'Toko Kue & Roti' => '/images/dummy/kue.png',
            'Toko Souvenir' => '/images/dummy/souvenir.png',
        ];

        // Generate 30 products
        for ($i = 0; $i < 30; $i++) {
            Product::create([
                'nama_usaha' => $businessNames[$i],
                'lokasi' => $locations[$i],
                'email' => $faker->unique()->safeEmail,
                'telephone' => $faker->e164PhoneNumber,
                // Seed unik gabungan nama usaha dan index agar gambar benar-benar variatif
                'image' => 'https://picsum.photos/seed/' . urlencode($businessNames[$i] . '-' . $i) . '/400/300',
            ]);
        }
    }
}
