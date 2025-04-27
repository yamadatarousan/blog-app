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
        Log::info('CreatePost data:', ['data' => $data]);
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $post = $this->getModel()::create($data);

        if (!empty($tags)) {
            $tagIds = collect($tags)->map(function ($tagName) {
                $trimmed = trim($tagName);
                Log::info('Processing tag:', ['tag' => $trimmed]);
                return \App\Models\Tag::firstOrCreate(['name' => $trimmed])->id;
            })->filter()->toArray();
            $post->tags()->sync($tagIds);
            Log::info('Tags synced:', ['post_id' => $post->id, 'tag_ids' => $tagIds]);
        }

        return $post;
    }
}