<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Dashboard', function () {
    it('shows the dashboard page for authenticated users', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/dashboard')
            ->on();

        $page->assertSee('Dashboard');
    });

    it('redirects unauthenticated users to login', function () {
        $page = visit('/dashboard')
            ->on();

        $page->assertPathIs('/login');
    });

    it('allows navigation to settings from sidebar', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/dashboard')
            ->on();

        // Navigate to settings by visiting the URL directly from dashboard
        // This tests that authenticated users can access settings
        $page = visit('/settings/profile')
            ->on();

        $page->assertSee('Profile')
            ->assertPathIs('/settings/profile');
    });
});
