<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    public function like(Request $request, $id): JsonResponse
    {
        Log::info('LikeController::like called', [
            'id' => $id,
            'session_id' => $request->header('X-Like-Session-Id'),
        ]);

        $sessionId = $request->header('X-Like-Session-Id');
        if (!$sessionId) {
            return response()->json(['message' => 'Session ID required'], 400);
        }

        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $existingLike = Like::where('post_id', $id)->where('session_id', $sessionId)->first();
        if ($existingLike) {
            return response()->json(['message' => 'Post already liked'], 400);
        }

        try {
            DB::beginTransaction();

            Like::create([
                'post_id' => $id,
                'session_id' => $sessionId,
            ]);

            $post->increment('likes');

            DB::commit();

            $response = [
                'likes' => $post->likes,
                'liked' => true,
            ];
            Log::info('LikeController::like response', ['response' => $response]);
            return response()->json($response);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in LikeController::like', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Failed to like post'], 500);
        }
    }

    public function unlike(Request $request, $id): JsonResponse
    {
        Log::info('LikeController::unlike called', [
            'id' => $id,
            'session_id' => $request->header('X-Like-Session-Id'),
        ]);

        $sessionId = $request->header('X-Like-Session-Id');
        if (!$sessionId) {
            return response()->json(['message' => 'Session ID required'], 400);
        }

        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $existingLike = Like::where('post_id', $id)->where('session_id', $sessionId)->first();
        if (!$existingLike) {
            return response()->json(['message' => 'Post not liked'], 400);
        }

        try {
            DB::beginTransaction();

            $existingLike->delete();
            $post->decrement('likes');

            DB::commit();

            $response = [
                'likes' => $post->likes,
                'liked' => false,
            ];
            Log::info('LikeController::unlike response', ['response' => $response]);
            return response()->json($response);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in LikeController::unlike', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Failed to unlike post'], 500);
        }
    }
}