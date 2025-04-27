<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Log;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    protected function handleRecordUpdate(\Illuminate\Database\Eloquent\Model $record, array $data): \Illuminate\Database\Eloquent\Model
    {
        Log::info('EditPost data:', ['data' => $data]);
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $record->update($data);

        $tagIds = collect($tags)->map(function ($tagName) {
            $trimmed = trim($tagName);
            Log::info('Processing tag:', ['tag' => $trimmed]);
            return \App\Models\Tag::firstOrCreate(['name' => $trimmed])->id;
        })->filter()->toArray();
        $record->tags()->sync($tagIds);
        Log::info('Tags synced:', ['post_id' => $record->id, 'tag_ids' => $tagIds]);

        return $record;
    }
}