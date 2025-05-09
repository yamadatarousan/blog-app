<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('PostController::index called', [
                'request' => $request->all(),
                'headers' => $request->headers->all(),
            ]);
            $perPage = $request->input('per_page', 6);
            $search = $request->input('search', '');
            $category = $request->input('category', '');
            $tag = $request->input('tag', '');

            $query = Post::with('tags')
                ->when($search, fn($q) => $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%"))
                ->when($category, fn($q) => $q->where('category', $category))
                ->when($tag, fn($q) => $q->whereHas('tags', fn($q2) => $q2->where('name', $tag)));

            $posts = $query->paginate($perPage)->withQueryString();

            $response = [
                'data' => collect($posts->items())->map(fn($post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'category' => $post->category,
                    'created_at' => $post->created_at,
                    'image' => $post->image,
                    'tags' => $post->tags ? $post->tags->pluck('name')->toArray() : [],
                ])->toArray(),
                'last_page' => $posts->lastPage(),
                'current_page' => $posts->currentPage(),
                'total' => $posts->total(),
            ];

            Log::info('PostController::index response', ['response' => $response]);
            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in PostController::index', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all(),
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show($id)
    {
        try {
            Log::info('PostController::show called', ['id' => $id]);
            $post = Post::with('tags')->find($id);
            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }
            $sessionId = request()->header('X-Like-Session-Id');
            $response = [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'category' => $post->category,
                'created_at' => $post->created_at,
                'image' => $post->image,
                'likes' => $post->likes, // postsテーブルのlikesカラムを使用
                'liked' => $sessionId ? $post->likes()->where('session_id', $sessionId)->exists() : false,
                'tags' => $post->tags ? $post->tags->pluck('name')->toArray() : [],
            ];
            Log::info('PostController::show response', ['response' => $response]);
            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error in PostController::show', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}