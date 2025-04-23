<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'user_id', 'is_published'];
    public function user() {
        return $this->belongsTo(User::class);
    }
}
