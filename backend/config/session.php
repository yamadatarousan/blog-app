<?php

return [
    'driver' => env('SESSION_DRIVER', 'database'),
    'connection' => env('SESSION_CONNECTION', 'mysql'),
    'table' => env('SESSION_TABLE', 'sessions'),
    'cookie' => env('SESSION_COOKIE', 'laravel_session'),
    'same_site' => env('SESSION_SAME_SITE', 'lax'),
    'secure' => env('SESSION_SECURE_COOKIE', false),
];