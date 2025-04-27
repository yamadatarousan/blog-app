<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Support\Facades\Log;

class TagController extends Controller
{
    public function index()
    {
        try {
            Log::info('TagController::index called');
            $tags = Tag::pluck('name');
            Log::info('TagController::index response', ['tags' => $tags]);
            return response()->json($tags);
        } catch (\Exception $e) {
            Log::error('Error in TagController::index', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}