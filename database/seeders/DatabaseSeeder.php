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
            CreateProductSeeder::class, // Creates products with is_published = false
            UpdateProductPublishedSeeder::class, // Publishes a random subset of products
            // ProductDummySeeder::class,
        ]);
    }
}