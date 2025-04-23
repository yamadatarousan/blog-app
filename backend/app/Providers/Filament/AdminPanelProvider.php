<?php
namespace App\Providers\Filament;

use Filament\Panel;
use Filament\PanelProvider;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->authMiddleware(['auth']) // 'auth:sanctum' → 'auth'
            ->viteTheme('resources/css/filament/admin/theme.css');
    }
}