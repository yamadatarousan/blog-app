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
        Log::info('EditPost data:', $data); // デバッグログ
        $tags = $data['tags'] ?? [];
        unset($data['tags']);

        $record->update($data);

        $tagIds = collect($tags)->map(function ($tagName) {
            return \App\Models\Tag::firstOrCreate(['name' => trim($tagName)])->id;
        })->toArray();
        $record->tags()->sync($tagIds);

        return $record;
    }
}