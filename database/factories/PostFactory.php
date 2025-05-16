<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        $title = $this->faker->sentence();
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => $this->faker->paragraphs(5, true),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'user_id' => User::factory(),
            'image_path' => 'posts/' . uniqid() . '.jpg',
            'excerpt' => $this->faker->sentence(10),
            'status' => $this->faker->randomElement(['draft', 'published']),
        ];
    }
}
