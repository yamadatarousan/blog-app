<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 6);
        $search = $request->query('search');
        $category = $request->query('category');

        $query = Post::query();
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
        }
        if ($category) {
            $query->where('category', $category);
        }

        $posts = $query->paginate($perPage, ['*'], 'page', $page);
        return response()->json([
            'data' => $posts->items(),
            'last_page' => $posts->lastPage(),
        ]);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'category' => $post->category,
            'created_at' => $post->created_at,
            'likes' => $post->likes()->count(),
        ]);
    }

    public function like(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $sessionId = $request->session()->getId();
        \Log::debug('Session ID: ' . ($sessionId ?: 'None')); // デバッグ
        if (!$sessionId) {
            return response()->json(['error' => 'Session ID not found'], 400);
        }
        $like = $post->likes()->where('session_id', $sessionId)->first();
        if ($like) {
            $like->delete();
            $liked = false;
        } else {
            $post->likes()->create(['session_id' => $sessionId]);
            $liked = true;
        }
        return response()->json([
            'likes' => $post->likes()->count(),
            'liked' => $liked,
        ]);
    }
}
