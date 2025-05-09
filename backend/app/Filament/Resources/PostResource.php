<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use App\Models\Tag;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Posts';
    protected static ?string $modelLabel = 'Post';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('content')
                    ->required()
                    ->rows(5),
                Forms\Components\TextInput::make('image')
                    ->url()
                    ->nullable()
                    ->label('Image URL'),
                Forms\Components\Select::make('category')
                    ->options([
                        'General' => 'General',
                        'Tech' => 'Tech',
                        'Lifestyle' => 'Lifestyle',
                    ])
                    ->required()
                    ->default('General')
                    ->searchable(),
                Forms\Components\TagsInput::make('tags')
                    ->label('Tags')
                    ->separator(',')
                    ->dehydrated(true)
                    ->suggestions(Tag::pluck('name')->toArray() ?? [])
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('tags', array_map('trim', $state));
                    })
                    ->afterStateHydrated(function (Forms\Components\TagsInput $component, ?Post $record) {
                        $tags = $record ? ($record->tags ?? collect([])) : collect([]);
                        $component->state($tags->pluck('name')->toArray());
                    }),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('tags.name')
                    ->badge(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tags')
                    ->options(function () {
                        $options = Tag::pluck('name', 'id')->toArray();
                        Log::info('Tag filter options:', ['options' => $options]);
                        return $options ?: [];
                    })
                    ->default(null) // 初期値として"All"（未選択）を設定
                    ->placeholder('All') // ドロップダウンに"All"表示
                    ->query(function (Builder $query, array $data) {
                        if (isset($data['value']) && $data['value'] !== null && $data['value'] !== '') {
                            Log::info('Tag filter applied:', [
                                'value' => $data['value'],
                                'posts_before' => $query->pluck('id')->toArray(),
                            ]);
                            $query->whereHas('tags', function (Builder $subQuery) use ($data) {
                                $subQuery->where('tags.id', $data['value']);
                            });
                            Log::info('Posts after filter:', [
                                'posts_after' => $query->pluck('id')->toArray(),
                            ]);
                        } else {
                            Log::info('Tag filter skipped (All selected or no value)');
                        }
                    })
                    ->label('Filter by Tag'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}