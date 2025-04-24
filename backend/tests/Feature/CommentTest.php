<?php
namespace Tests\Feature;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_comment()
    {
        $post = Post::create(['title' => 'Test Post', 'content' => 'Content']);

        $response = $this->postJson('/api/comments', [
            'post_id' => $post->id,
            'content' => 'This is a comment.',
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['content' => 'This is a comment.']);
    }

    public function test_cannot_create_comment_with_invalid_post_id()
    {
        $response = $this->postJson('/api/comments', [
            'post_id' => 999,
            'content' => 'Invalid comment.',
        ]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['post_id']);
    }

    public function test_can_get_comments_for_post()
    {
        $post = Post::create(['title' => 'Test Post', 'content' => 'Content']);
        Comment::create(['post_id' => $post->id, 'content' => 'Comment 1']);
        Comment::create(['post_id' => $post->id, 'content' => 'Comment 2']);

        $response = $this->getJson("/api/posts/{$post->id}/comments");

        $response->assertStatus(200)
                 ->assertJsonCount(2);
    }

    public function test_get_comments_for_nonexistent_post()
    {
        $response = $this->getJson('/api/posts/999/comments');

        $response->assertStatus(200)
                 ->assertJson([]);
    }
}