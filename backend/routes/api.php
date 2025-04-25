<?php
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Session\Middleware\StartSession;

Route::middleware([HandleCors::class])->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::post('/posts/{id}/like', [PostController::class, 'like']);
});
Route::get('/posts/{id}/comments', [CommentController::class, 'index']);
Route::post('/comments', [CommentController::class, 'store']);