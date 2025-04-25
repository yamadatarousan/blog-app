<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*', 'X-Like-Session-Id'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // クッキー不要
];