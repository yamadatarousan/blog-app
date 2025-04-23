<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_posts_returns_success()
    {
        Post::factory()->create([
            'title' => 'Test Post',
            'content' => 'This is a test.',
            'image' => 'https://picsum.photos/800/400',
            'category' => 'Tech',
        ]);

        $response = $this->getJson('/api/posts');

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'title' => 'Test Post',
                        'category' => 'Tech',
                    ],
                ],
            ]);
    }

    public function test_get_single_post_returns_success()
    {
        $post = Post::factory()->create([
            'title' => 'Test Post',
            'content' => 'This is a test.',
            'image' => 'https://picsum.photos/800/400',
            'category' => 'Tech',
        ]);

        $response = $this->getJson("/api/posts/{$post->id}");

        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => $post->id,
                'title' => 'Test Post',
                'category' => 'Tech',
            ]);
    }

    public function test_get_single_post_not_found()
    {
        $response = $this->getJson('/api/posts/999');

        $response->assertStatus(404);
    }
}