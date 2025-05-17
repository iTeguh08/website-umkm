<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('sticky')->default(false);
            $table->boolean('published')->default(false);
            $table->boolean('featured')->default(false);
        });
    }

    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['sticky', 'published', 'featured']);
        });
    }
};