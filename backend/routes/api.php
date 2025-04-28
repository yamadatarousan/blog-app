<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;

Route::get('/tags', [TagController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/posts/{id}/like', [LikeController::class, 'like']); // Like追加
Route::delete('/posts/{id}/like', [LikeController::class, 'unlike']); // Unlike処理
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/posts/{id}/comments', [CommentController::class, 'index']);