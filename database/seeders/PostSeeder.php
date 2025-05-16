<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        // Dapatkan user admin
        $admin = User::where('email', 'admin@admin.com')->first();
        
        if (!$admin) {
            $admin = User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password')
            ]);
        }

        // Buat beberapa post
        $posts = [
            [
                'title' => 'Peluang Bisnis UMKM di Era Digital',
                'description' => 'Konten lengkap tentang peluang bisnis UMKM di era digital...',
                'photo' => null,
            ],
            [
                'title' => 'Strategi Pemasaran UMKM di Media Sosial',
                'description' => 'Berbagai strategi pemasaran yang efektif untuk UMKM di platform media sosial...',
                'photo' => null,
            ],
            [
                'title' => 'Tips Mengelola Keuangan untuk Pelaku UMKM',
                'description' => 'Panduan lengkap mengelola keuangan usaha kecil dan menengah...',
                'photo' => null,
            ],
        ];

        foreach ($posts as $postData) {
            // Buat post
            $post = Post::create($postData);

            // Attach beberapa tag ke post
            $tags = Tag::inRandomOrder()->limit(3)->pluck('id')->toArray();
            $post->tags()->attach($tags);
        }
    }
}
