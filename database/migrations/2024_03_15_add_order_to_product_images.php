<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::table('product_images', function (Blueprint $table) {
            $table->integer('order')->default(0);
        });

        // Set initial order based on ID for existing images
        DB::statement('UPDATE product_images SET `order` = id');
    }

    public function down()
    {
        Schema::table('product_images', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}; 