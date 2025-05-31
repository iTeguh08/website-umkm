<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class ClearNearbyProductsCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:clear-nearby-products {productId?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear cached nearby products data for all or specific product';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $productId = $this->argument('productId');

        if ($productId) {
            // Clear cache for specific product
            $deleted = 0;
            $cacheKeys = Cache::get('nearby_products_keys', []);
            
            foreach ($cacheKeys as $key) {
                if (str_contains($key, "nearby_products_{$productId}_")) {
                    Cache::forget($key);
                    $deleted++;
                }
            }
            
            $this->info("Cleared {$deleted} cache entries for product ID: {$productId}");
        } else {
            // Clear all nearby products cache
            $cacheKeys = Cache::get('nearby_products_keys', []);
            $deleted = 0;
            
            foreach ($cacheKeys as $key) {
                if (str_starts_with($key, 'nearby_products_')) {
                    Cache::forget($key);
                    $deleted++;
                }
            }
            
            // Clear the keys list
            Cache::forget('nearby_products_keys');
            
            $this->info("Cleared all {$deleted} nearby products cache entries");
        }

        return Command::SUCCESS;
    }
} 