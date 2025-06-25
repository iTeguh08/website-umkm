<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductPublishedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // First, reset all products to be unpublished to ensure a clean slate
        Product::query()->update(['is_published' => false]);

        $products = Product::all();

        if ($products->isEmpty()) {
            $this->command->info('No products found to update.');
            return;
        }

        // Calculate how many products to publish (e.g., 80%)
        $numberOfProductsToPublish = (int) ($products->count() * 0.8);

        // Get a random sample of products to publish
        $productsToPublish = $products->random($numberOfProductsToPublish);

        // Update the sampled products to be published
        foreach ($productsToPublish as $product) {
            $product->is_published = true;
            $product->save();
        }

        $this->command->info("{$numberOfProductsToPublish} products have been published.");
    }
} 