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
        return response()->json($post);
    }
}
