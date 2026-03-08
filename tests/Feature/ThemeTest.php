<?php

use Illuminate\Support\Facades\Config;

test('data-theme attribute renders from config', function () {
    Config::set('app.theme', 'brutalist');

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee('data-theme="brutalist"', false);
});

test('default theme is applied when no theme is configured', function () {
    Config::set('app.theme', 'default');

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee('data-theme="default"', false);
});

test('each valid theme name renders correctly', function (string $theme) {
    Config::set('app.theme', $theme);

    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertSee("data-theme=\"{$theme}\"", false);
})->with(['default', 'brutalist', 'glass', 'ink', 'terminal', 'retro']);

test('theme config value is accessible', function () {
    Config::set('app.theme', 'terminal');

    expect(config('app.theme'))->toBe('terminal');
});

test('brutalist theme loads space grotesk font', function () {
    Config::set('app.theme', 'brutalist');

    $response = $this->get('/');

    $response->assertSee('family=space-grotesk', false);
});

test('default theme does not load extra fonts', function () {
    Config::set('app.theme', 'default');

    $response = $this->get('/');

    $response->assertDontSee('family=space-grotesk', false);
    $response->assertDontSee('family=playfair-display', false);
    $response->assertDontSee('family=jetbrains-mono', false);
    $response->assertDontSee('family=press-start-2p', false);
});
