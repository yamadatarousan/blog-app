<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Post::all(),
        ]);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);
        return response()->json($post);
    }
}
