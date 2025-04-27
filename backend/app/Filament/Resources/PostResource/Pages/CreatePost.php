<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Log;

class CreatePost extends CreateRecord
{
    protected static string $resource = PostResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        Log::info('CreatePost data:', $data); // デバッグログ
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $post = $this->getModel()::create($data);

        if (!empty($tags)) {
            $tagIds = collect($tags)->map(function ($tagName) {
                return \App\Models\Tag::firstOrCreate(['name' => trim($tagName)])->id;
            })->toArray();
            $post->tags()->sync($tagIds);
        }

        return $post;
    }
}