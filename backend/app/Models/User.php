<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
class User extends Authenticatable implements FilamentUser {
    use HasApiTokens;
    protected $fillable = ['name', 'email', 'password'];
    public function canAccessPanel(Panel $panel): bool {
        return true; // 本番では権限チェック
    }
}