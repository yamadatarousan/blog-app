<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::select('id', 'name')->orderBy('name')->get();
        return response()->json($tags);
    }
}