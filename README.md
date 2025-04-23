# blog-app
## フロントエンド
- React
- NextJS
- TypeScript
- Vitest
- tailwindcss

## バックエンド
- Laravel(認証にsanctum使用)
- Filament
- PHPUnit

## データベース
- MySQL

## 環境構築手順
### プロジェクトディレクトリ作成
```
mkdir blog && cd blog
mkdir backend frontend
```
### Docker設定
```
プロジェクトルートに移動
touch docker-compose.yml
docker-compose.ymlを編集
```
### Nginx設定
```
プロジェクトルートにnginx.confを作成
```

### Laravel（バックエンド）セットアップ
```
cd backend
composer create-project laravel/laravel .
composer require filament/filament:^3.3 laravel/sanctum
php artisan filament:install --panels
php artisan make:filament-user
name: admin@example.com
email: admin@example.com
password: password
# プロンプトでユーザー作成（例：admin@example.com, password: secret）
php artisan install:api
```

### .envを編集
```
# backend/.env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=root
DB_PASSWORD=secret
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```
### Sanctum設定を調整
```
# backend/config/sanctum.php
return [
    'stateful' => [
        'localhost',
        '127.0.0.1',
        'localhost:3000',
    ],
];
```
### MySQLモデルとマイグレーション
#### backendに戻り、ブログ用のPostモデルを作成。
```
cd ../backend
php artisan make:model Post -m
```
### マイグレーションを編集
```
# backend/database/migrations/xxxx_create_posts_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->unsignedBigInteger('user_id');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('posts');
    }
};
```

### モデルを編集
```
# backend/app/Models/Post.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Post extends Model {
    protected $fillable = ['title', 'slug', 'content', 'user_id', 'is_published'];
    public function user() {
        return $this->belongsTo(User::class);
    }
}
```

### Filamentリソース作成
#### Postリソースを生成
```
php artisan make:filament-resource Post --simple
```

#### リソースを編集
```
# backend/app/Filament/Resources/PostResource.php
namespace App\Filament\Resources;
use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Illuminate\Support\Str;
class PostResource extends Resource {
    protected static ?string $model = Post::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    public static function form(Forms\Form $form): Forms\Form {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->afterStateUpdated(function ($state, callable $set) {
                    $set('slug', Str::slug($state));
                }),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(Post::class, 'slug'),
            Forms\Components\RichEditor::make('content')
                ->required(),
            Forms\Components\Toggle::make('is_published'),
        ]);
    }
    public static function table(Tables\Table $table): Tables\Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('title'),
            Tables\Columns\BooleanColumn::make('is_published'),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }
    public static function getPages(): array {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
```

### SanctumとFilamentの統合
#### Userモデルを更新
```
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
```

#### Filamentパネルを設定
```
# backend/app/Providers/Filament/AdminPanelProvider.php
namespace App\Providers\Filament;
use Filament\Panel;
use Filament\PanelProvider;
class AdminPanelProvider extends PanelProvider {
    public function panel(Panel $panel): Panel {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->authMiddleware(['auth:sanctum'])
            ->viteTheme('resources/css/filament/admin/theme.css');
    }
}
```

#### Tailwindテーマを作成
```
mkdir -p resources/css/filament/admin
touch resources/css/filament/admin/theme.css
```

```
/* backend/resources/css/filament/admin/theme.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
.filament-brand { @apply bg-gray-950 text-gray-100; }
```
### Vite設定を更新
```
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/css/filament/admin/theme.css',
            ],
            refresh: true,
        }),
    ],
});
```

### 
```
docker-compose up -d
```

```
cd blog
docker-compose exec laravel bash
apt-get update
apt-get install -y default-mysql-client
```

### マイグレーションとテスト準備
```
php artisan migrate
# PHPUnit用にテストDB（オプション）
cp .env .env.testing
# .env.testingでDBを分離（例：blog_tes
```