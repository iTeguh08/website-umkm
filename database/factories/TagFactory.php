<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

class TagFactory extends Factory
{
    protected $model = Tag::class;

    public function definition()
    {
        $tags = [
            'Breaking News', 'Business Insights', 'Market Trends', 
            'Startup Stories', 'Tech Innovations', 'Entrepreneurship',
            'Economy Updates', 'Investment Tips', 'Financial News',
            'Industry Analysis', 'Company Profiles', 'Product Launches',
            'Leadership', 'Marketing Strategies', 'E-commerce',
            'Consumer Behavior', 'Digital Transformation', 'Sustainability',
            'Global Markets', 'Regulatory Changes'
        ];

        return [
            'title' => $this->faker->unique()->randomElement($tags),
            'description' => null,
        ];
    }
}