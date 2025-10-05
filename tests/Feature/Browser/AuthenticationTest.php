<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Authentication', function () {
    it('allows user registration', function () {
        $page = visit('/register')
            ->on();

        $page->type('[name="first_name"]', 'Test')
            ->type('[name="last_name"]', 'User')
            ->type('[name="email"]', 'test@example.com')
            ->type('[name="password"]', 'password123')
            ->type('[name="password_confirmation"]', 'password123')
            ->click('button[type="submit"]')
            ->assertPathIs('/verify-email')
            ->assertSee('Verify');
    });

    it('allows user login', function () {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
            'email_verified_at' => now(),
        ]);

        $page = visit('/login')
            ->on();

        $page->type('[name="email"]', 'test@example.com')
            ->type('[name="password"]', 'password123')
            ->click('button[type="submit"]')
            ->assertPathIs('/dashboard')
            ->assertSee('Dashboard');
    });

    it('shows validation errors for invalid login', function () {
        $page = visit('/login')
            ->on();

        $page->type('[name="email"]', 'invalid@example.com')
            ->type('[name="password"]', 'wrongpassword')
            ->click('button[type="submit"]')
            ->assertSee('These credentials do not match our records');
    });

    it('allows user logout', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/dashboard')
            ->on();

        $page->click('[data-testid="user-menu"]')
            ->click('button:has-text("Log Out")')
            ->assertPathIs('/')
            ->assertSee('Log in');
    });
});
