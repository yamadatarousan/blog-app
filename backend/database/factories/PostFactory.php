<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'image' => 'https://picsum.photos/800/400',
            'category' => $this->faker->randomElement(['Tech', 'Lifestyle', 'News']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
