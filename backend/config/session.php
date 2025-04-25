<?php

return [
    'driver' => env('SESSION_DRIVER', 'database'),
    'connection' => env('SESSION_CONNECTION', 'mysql'),
    'table' => env('SESSION_TABLE', 'sessions'),
    'cookie' => env('SESSION_COOKIE', 'laravel_session'),
    'same_site' => 'none', // クロスオリジン用
    'secure' => false, // ローカルではfalse
    'http_only' => true,
    'lifetime' => 120,
    'domain' => null,
];