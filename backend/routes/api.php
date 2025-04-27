<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CommentController;

Route::get('/tags', [TagController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{id}', [PostController::class, 'show']);
Route::post('/posts/{id}/like', [PostController::class, 'like']); // auth:sanctumなし
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/posts/{id}/comments', [CommentController::class, 'index']);