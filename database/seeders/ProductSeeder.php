<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Enums\BidangUsaha;
use App\Enums\JenisUsaha;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        // Data koordinat real di berbagai provinsi Indonesia
        // Beberapa yang berdekatan untuk fitur nearby products
        $indonesianLocations = [
            // Jakarta & Sekitarnya (Cluster 1)
            [
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta Pusat',
                'latitude' => -6.2088,
                'longitude' => 106.8456,
            ],
            [
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta Selatan',
                'latitude' => -6.2614,
                'longitude' => 106.8106,
            ],
            [
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta Timur',
                'latitude' => -6.2250,
                'longitude' => 106.9004,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Bogor',
                'latitude' => -6.5971,
                'longitude' => 106.8060,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Depok',
                'latitude' => -6.4025,
                'longitude' => 106.7942,
            ],
            
            // Jawa Barat (Cluster 2)
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Bandung',
                'latitude' => -6.9175,
                'longitude' => 107.6191,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Cimahi',
                'latitude' => -6.8721,
                'longitude' => 107.5420,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Bekasi',
                'latitude' => -6.2383,
                'longitude' => 106.9756,
            ],
            
            // Jawa Tengah (Cluster 3)
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Semarang',
                'latitude' => -6.9667,
                'longitude' => 110.4167,
            ],
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Solo',
                'latitude' => -7.5755,
                'longitude' => 110.8243,
            ],
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Yogyakarta',
                'latitude' => -7.7956,
                'longitude' => 110.3695,
            ],
            
            // Jawa Timur (Cluster 4)
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Surabaya',
                'latitude' => -7.2504,
                'longitude' => 112.7688,
            ],
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Malang',
                'latitude' => -7.9797,
                'longitude' => 112.6304,
            ],
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Sidoarjo',
                'latitude' => -7.4378,
                'longitude' => 112.7178,
            ],
            
            // Bali (Cluster 5)
            [
                'provinsi' => 'Bali',
                'kota' => 'Denpasar',
                'latitude' => -8.6500,
                'longitude' => 115.2167,
            ],
            [
                'provinsi' => 'Bali',
                'kota' => 'Ubud',
                'latitude' => -8.5069,
                'longitude' => 115.2625,
            ],
            [
                'provinsi' => 'Bali',
                'kota' => 'Sanur',
                'latitude' => -8.6872,
                'longitude' => 115.2632,
            ],
            
            // Sumatra Utara
            [
                'provinsi' => 'Sumatra Utara',
                'kota' => 'Medan',
                'latitude' => 3.5952,
                'longitude' => 98.6722,
            ],
            [
                'provinsi' => 'Sumatra Utara',
                'kota' => 'Binjai',
                'latitude' => 3.6004,
                'longitude' => 98.4851,
            ],
            
            // Sumatra Barat
            [
                'provinsi' => 'Sumatra Barat',
                'kota' => 'Padang',
                'latitude' => -0.9471,
                'longitude' => 100.4172,
            ],
            [
                'provinsi' => 'Sumatra Barat',
                'kota' => 'Bukittinggi',
                'latitude' => -0.3049,
                'longitude' => 100.3691,
            ],
            
            // Sulawesi Selatan
            [
                'provinsi' => 'Sulawesi Selatan',
                'kota' => 'Makassar',
                'latitude' => -5.1477,
                'longitude' => 119.4327,
            ],
            [
                'provinsi' => 'Sulawesi Selatan',
                'kota' => 'Gowa',
                'latitude' => -5.2112,
                'longitude' => 119.4419,
            ],
            
            // Kalimantan Timur
            [
                'provinsi' => 'Kalimantan Timur',
                'kota' => 'Samarinda',
                'latitude' => -0.5017,
                'longitude' => 117.1536,
            ],
            [
                'provinsi' => 'Kalimantan Timur',
                'kota' => 'Balikpapan',
                'latitude' => -1.2379,
                'longitude' => 116.8289,
            ],
            
            // Papua
            [
                'provinsi' => 'Papua',
                'kota' => 'Jayapura',
                'latitude' => -2.5920,
                'longitude' => 140.6689,
            ],
            
            // Aceh
            [
                'provinsi' => 'Aceh',
                'kota' => 'Banda Aceh',
                'latitude' => 5.5483,
                'longitude' => 95.3238,
            ],
            
            // Lombok
            [
                'provinsi' => 'Nusa Tenggara Barat',
                'kota' => 'Mataram',
                'latitude' => -8.5833,
                'longitude' => 116.1167,
            ],
            
            // Riau
            [
                'provinsi' => 'Riau',
                'kota' => 'Pekanbaru',
                'latitude' => 0.5333,
                'longitude' => 101.4500,
            ],
            
            // Sulawesi Utara
            [
                'provinsi' => 'Sulawesi Utara',
                'kota' => 'Manado',
                'latitude' => 1.4748,
                'longitude' => 124.8421,
            ],
            
            // Lampung
            [
                'provinsi' => 'Lampung',
                'kota' => 'Bandar Lampung',
                'latitude' => -5.3971,
                'longitude' => 105.2668,
            ],
        ];

        // Data nama usaha yang realistis berdasarkan bidang usaha
        $businessData = [
            'kuliner' => [
                'Warung Nasi Gudeg Bu Sari',
                'Bakso Malang Pak Bambang',
                'Sate Ayam Madura Asli',
                'Kedai Kopi Rakyat',
                'Gado-Gado Jakarta Bu Ani',
                'Pecel Lele Lamongan',
                'Nasi Padang Sederhana',
                'Mie Ayam Pak Karso',
                'Bubur Ayam Sukses',
                'Martabak Manis House'
            ],
            'fashion' => [
                'Boutique Cantik Azzahra',
                'Konveksi Baju Muslim',
                'Distro Anak Muda',
                'Jahit Express Ibu Ratna',
                'Fashion Store Trendy',
                'Baju Batik Nusantara',
                'Tas Kulit Handmade',
                'Sepatu Custom Jogja',
                'Hijab Collection',
                'Kemeja Kantor Premium'
            ],
            'jasa' => [
                'Bengkel Motor Jaya',
                'Salon Kecantikan Dewi',
                'Jasa Fotografi Wedding',
                'Laundry Kilat 24 Jam',
                'Service HP & Laptop',
                'Cuci Mobil Premium',
                'Kursus Bahasa Inggris',
                'Jasa Desain Grafis',
                'Tukang Bangunan Ahli',
                'Ekspedisi Cepat Kirim'
            ],
            'pertanian' => [
                'Toko Pupuk & Bibit',
                'Sayuran Hidroponik Fresh',
                'Buah-buahan Organik',
                'Peternak Ayam Kampung',
                'Budidaya Ikan Lele',
                'Kebun Strawberry Pick',
                'Tanaman Hias Anggrek',
                'Beras Organik Sawah',
                'Madu Hutan Asli',
                'Jamur Tiram Segar'
            ],
            'kreatif' => [
                'Kerajinan Bambu Unik',
                'Souvenir Kayu Handmade',
                'Lukisan Canvas Custom',
                'Pottery Studio Keramik',
                'Aksesoris Daur Ulang',
                'Miniatur Replika',
                'Rajutan Wol Hangat',
                'Ukiran Kayu Jepara',
                'Anyaman Rotan Cantik',
                'Digital Art Studio'
            ]
        ];

        $allBusinessNames = array_merge(...array_values($businessData));
        
        // Untuk memastikan distribusi yang baik
        $bidangUsahaValues = BidangUsaha::values();
        $jenisUsahaValues = JenisUsaha::values();

        // Generate 30 products dengan distribusi yang merata
        for ($i = 0; $i < 30; $i++) {
            $location = $indonesianLocations[$i % count($indonesianLocations)];
            $bidangUsaha = $bidangUsahaValues[$i % count($bidangUsahaValues)];
            $jenisUsaha = $jenisUsahaValues[$i % count($jenisUsahaValues)];
            
            // Pilih nama usaha berdasarkan bidang usaha
            $businessNames = $businessData[$bidangUsaha];
            $namaUsaha = $businessNames[$i % count($businessNames)];
            
            // Tambahkan sedikit variasi pada koordinat untuk realisme
            $latVariation = $faker->randomFloat(4, -0.01, 0.01);
            $lngVariation = $faker->randomFloat(4, -0.01, 0.01);

            Product::create([
                'nama_usaha' => $namaUsaha,
                'lokasi' => $location['kota'] . ', ' . $location['provinsi'],
                'email' => strtolower(str_replace(' ', '', $namaUsaha)) . $faker->unique()->numberBetween(1, 999) . '@gmail.com',
                'telephone' => $faker->phoneNumber,
                'description' => $this->generateDescription($namaUsaha, $bidangUsaha),
                'bidang_usaha' => $bidangUsaha,
                'jenis_usaha' => $jenisUsaha,
                'latitude' => $location['latitude'] + $latVariation,
                'longitude' => $location['longitude'] + $lngVariation,
            ]);
        }
    }

    /**
     * Generate description based on business name and type
     */
    private function generateDescription($namaUsaha, $bidangUsaha): string
    {
        $descriptions = [
            'kuliner' => [
                "Usaha kuliner yang telah berdiri sejak bertahun-tahun dengan cita rasa autentik dan pelayanan terbaik. Kami menggunakan bahan-bahan pilihan dan resep turun temurun untuk memberikan pengalaman kuliner yang tak terlupakan.",
                "Hidangan lezat dengan harga terjangkau untuk seluruh keluarga. Tempat favorit untuk menikmati makanan tradisional dengan suasana yang nyaman dan ramah.",
                "Sajian istimewa yang memadukan kelezatan tradisional dengan sentuhan modern. Cocok untuk acara keluarga, meeting, atau sekadar menikmati waktu santai."
            ],
            'fashion' => [
                "Menyediakan koleksi fashion terkini dengan kualitas premium dan harga yang bersahabat. Kami mengutamakan kenyamanan dan gaya untuk penampilan Anda yang lebih percaya diri.",
                "Busana berkualitas tinggi dengan desain eksklusif dan trendy. Melayani berbagai kebutuhan fashion untuk segala usia dengan pilihan warna dan model yang beragam.",
                "Fashion store yang menawarkan produk original dengan kualitas terjamin. Dapatkan penampilan menawan dengan koleksi terbaru kami yang selalu update mengikuti trend."
            ],
            'jasa' => [
                "Layanan profesional dengan tim berpengalaman dan peralatan modern. Kami berkomitmen memberikan hasil terbaik dengan waktu pengerjaan yang efisien dan harga kompetitif.",
                "Jasa berkualitas tinggi dengan standar pelayanan internasional. Kepuasan pelanggan adalah prioritas utama kami dengan garansi dan after-sales service yang memuaskan.",
                "Solusi terpercaya untuk berbagai kebutuhan Anda. Tim ahli kami siap memberikan pelayanan terbaik dengan teknologi terdepan dan pengalaman bertahun-tahun."
            ],
            'pertanian' => [
                "Produk pertanian segar langsung dari petani lokal dengan kualitas terbaik. Kami mendukung pertanian organik dan ramah lingkungan untuk kesehatan keluarga Anda.",
                "Menyediakan hasil pertanian berkualitas premium dengan harga langsung dari petani. Freshness dan nutrisi terjaga melalui proses penanganan yang higienis dan professional.",
                "Agribisnis terpercaya yang menghubungkan petani dengan konsumen. Produk segar, sehat, dan bergizi untuk memenuhi kebutuhan dapur Anda setiap hari."
            ],
            'kreatif' => [
                "Karya seni dan kerajinan unik hasil kreativitas tangan-tangan terampil. Setiap produk memiliki nilai seni tinggi dan dapat menjadi dekorasi istimewa atau hadiah berkesan.",
                "Kreasi inovatif dengan sentuhan artistik yang memukau. Kami menghadirkan produk handmade berkualitas tinggi yang menggabungkan tradisi dan modernitas.",
                "Studio kreatif yang menghasilkan karya seni original dan berkualitas. Cocok untuk kolektor seni, dekorasi rumah, atau sebagai investasi nilai seni yang berkelanjutan."
            ]
        ];

        $descriptionOptions = $descriptions[$bidangUsaha];
        return $descriptionOptions[array_rand($descriptionOptions)];
    }
} 