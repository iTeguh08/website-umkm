<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            TagSeeder::class,
            PostSeeder::class, // Menambahkan PostSeeder
            ProductSeeder::class, // Seeder untuk UMKM dengan koordinat Indonesia
            // ProductDummySeeder::class,
        ]);
    }
}