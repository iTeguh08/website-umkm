<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->enum('bidang_usaha', ['kuliner', 'fashion', 'jasa', 'pertanian', 'kreatif'])->nullable();
            $table->enum('jenis_usaha', ['mikro', 'kecil', 'menengah'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('xxxxxx');
        });
    }
};
