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
        // Diperbanyak agar setiap cluster memiliki 4-6 produk untuk nearby products
        $indonesianLocations = [
            // Jakarta & Sekitarnya (Cluster 1 - 8 produk)
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
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta Barat',
                'latitude' => -6.1352,
                'longitude' => 106.8133,
            ],
            [
                'provinsi' => 'DKI Jakarta',
                'kota' => 'Jakarta Utara',
                'latitude' => -6.1378,
                'longitude' => 106.8631,
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
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Bekasi',
                'latitude' => -6.2383,
                'longitude' => 106.9756,
            ],
            
            // Jawa Barat - Bandung Raya (Cluster 2 - 6 produk)
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
                'kota' => 'Bandung Barat',
                'latitude' => -6.8486,
                'longitude' => 107.4981,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Sumedang',
                'latitude' => -6.8389,
                'longitude' => 107.9239,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Subang',
                'latitude' => -6.5697,
                'longitude' => 107.7586,
            ],
            [
                'provinsi' => 'Jawa Barat',
                'kota' => 'Purwakarta',
                'latitude' => -6.5569,
                'longitude' => 107.4431,
            ],
            
            // Jawa Tengah (Cluster 3 - 6 produk)
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
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Salatiga',
                'latitude' => -7.3317,
                'longitude' => 110.4928,
            ],
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Magelang',
                'latitude' => -7.4797,
                'longitude' => 110.2175,
            ],
            [
                'provinsi' => 'Jawa Tengah',
                'kota' => 'Klaten',
                'latitude' => -7.7061,
                'longitude' => 110.6067,
            ],
            
            // Jawa Timur - Surabaya Raya (Cluster 4 - 6 produk)
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
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Gresik',
                'latitude' => -7.1556,
                'longitude' => 112.6536,
            ],
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Mojokerto',
                'latitude' => -7.4664,
                'longitude' => 112.4339,
            ],
            [
                'provinsi' => 'Jawa Timur',
                'kota' => 'Pasuruan',
                'latitude' => -7.6453,
                'longitude' => 112.9075,
            ],
            
            // Bali (Cluster 5 - 5 produk)
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
            [
                'provinsi' => 'Bali',
                'kota' => 'Canggu',
                'latitude' => -8.6481,
                'longitude' => 115.1394,
            ],
            [
                'provinsi' => 'Bali',
                'kota' => 'Seminyak',
                'latitude' => -8.6947,
                'longitude' => 115.1731,
            ],
            
            // Sumatra Utara (Cluster 6 - 4 produk)
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
            [
                'provinsi' => 'Sumatra Utara',
                'kota' => 'Deli Serdang',
                'latitude' => 3.5306,
                'longitude' => 98.6719,
            ],
            [
                'provinsi' => 'Sumatra Utara',
                'kota' => 'Pematangsiantar',
                'latitude' => 2.9597,
                'longitude' => 99.0681,
            ],
            
            // Sumatra Barat (Cluster 7 - 4 produk)
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
            [
                'provinsi' => 'Sumatra Barat',
                'kota' => 'Payakumbuh',
                'latitude' => -0.2297,
                'longitude' => 100.6339,
            ],
            [
                'provinsi' => 'Sumatra Barat',
                'kota' => 'Padang Panjang',
                'latitude' => -0.4656,
                'longitude' => 100.4044,
            ],
            
            // Sulawesi Selatan (Cluster 8 - 4 produk)
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
            [
                'provinsi' => 'Sulawesi Selatan',
                'kota' => 'Maros',
                'latitude' => -4.9675,
                'longitude' => 119.5847,
            ],
            [
                'provinsi' => 'Sulawesi Selatan',
                'kota' => 'Takalar',
                'latitude' => -5.4078,
                'longitude' => 119.4883,
            ],
            
            // Kalimantan Timur (Cluster 9 - 3 produk)
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
            [
                'provinsi' => 'Kalimantan Timur',
                'kota' => 'Bontang',
                'latitude' => 0.1347,
                'longitude' => 117.4758,
            ],
            
            // Single locations untuk variasi geografis
            [
                'provinsi' => 'Papua',
                'kota' => 'Jayapura',
                'latitude' => -2.5920,
                'longitude' => 140.6689,
            ],
            [
                'provinsi' => 'Aceh',
                'kota' => 'Banda Aceh',
                'latitude' => 5.5483,
                'longitude' => 95.3238,
            ],
            [
                'provinsi' => 'Nusa Tenggara Barat',
                'kota' => 'Mataram',
                'latitude' => -8.5833,
                'longitude' => 116.1167,
            ],
            [
                'provinsi' => 'Riau',
                'kota' => 'Pekanbaru',
                'latitude' => 0.5333,
                'longitude' => 101.4500,
            ],
            [
                'provinsi' => 'Sulawesi Utara',
                'kota' => 'Manado',
                'latitude' => 1.4748,
                'longitude' => 124.8421,
            ],
            [
                'provinsi' => 'Lampung',
                'kota' => 'Bandar Lampung',
                'latitude' => -5.3971,
                'longitude' => 105.2668,
            ],
        ];

        // Data nama usaha yang realistis berdasarkan bidang usaha - diperbanyak
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
                'Martabak Manis House',
                'Warung Soto Betawi',
                'Nasi Uduk Bu Tinah',
                'Ayam Geprek Sambal Ijo',
                'Warung Tegal Asli',
                'Bakmi GM Lokal',
                'Rendang Minang Pak Ajo',
                'Pempek Palembang Asli',
                'Gudeg Jogja Bu Kasinem',
                'Rawon Setan Bu Wiwik',
                'Coto Makassar Pak Daud'
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
                'Kemeja Kantor Premium',
                'Dress Pesta Elegan',
                'Kaos Distro Branded',
                'Celana Jeans Original',
                'Jaket Kulit Premium',
                'Sandal Kulit Asli',
                'Topi Baseball Custom',
                'Dompet Kulit Handmade',
                'Ikat Pinggang Branded',
                'Kacamata Fashion',
                'Jam Tangan Trendy'
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
                'Ekspedisi Cepat Kirim',
                'Jasa Pindahan Rumah',
                'Service AC & Kulkas',
                'Kursus Mengemudi',
                'Jasa Cleaning Service',
                'Barbershop Modern',
                'Spa & Massage',
                'Jasa Catering',
                'Event Organizer',
                'Jasa Renovasi Rumah',
                'Travel & Tour'
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
                'Jamur Tiram Segar',
                'Bibit Tanaman Unggul',
                'Pakan Ternak Berkualitas',
                'Pestisida Organik',
                'Alat Pertanian Modern',
                'Benih Sayuran Hibrida',
                'Pupuk Kompos Organik',
                'Tanaman Obat Herbal',
                'Ikan Air Tawar',
                'Telur Ayam Kampung',
                'Susu Kambing Segar'
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
                'Digital Art Studio',
                'Kerajinan Manik-manik',
                'Patung Fiber Custom',
                'Bordir Komputer',
                'Sablon Kaos Manual',
                'Kerajinan Kulit',
                'Vas Bunga Keramik',
                'Lampion Kertas Hias',
                'Kaligrafi Arab',
                'Mozaik Kaca',
                'Origami Kreatif'
            ]
        ];

        // Untuk memastikan distribusi yang baik
        $bidangUsahaValues = BidangUsaha::values();
        $jenisUsahaValues = JenisUsaha::values();

        // Generate 50 products untuk memastikan setiap cluster punya cukup produk nearby
        $totalProducts = 50;
        
        for ($i = 0; $i < $totalProducts; $i++) {
            $location = $indonesianLocations[$i % count($indonesianLocations)];
            $bidangUsaha = $bidangUsahaValues[$i % count($bidangUsahaValues)];
            $jenisUsaha = $jenisUsahaValues[$i % count($jenisUsahaValues)];
            
            // Pilih nama usaha berdasarkan bidang usaha
            $businessNames = $businessData[$bidangUsaha];
            $namaUsaha = $businessNames[$i % count($businessNames)];
            
            // Tambahkan variasi koordinat yang lebih besar dalam cluster untuk nearby products
            $latVariation = $faker->randomFloat(4, -0.02, 0.02);
            $lngVariation = $faker->randomFloat(4, -0.02, 0.02);

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