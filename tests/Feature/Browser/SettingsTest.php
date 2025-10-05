<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Settings', function () {
    it('allows users to update their profile', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/settings/profile')
            ->on();

        $page->type('[name="first_name"]', 'Updated First Name')
            ->type('[name="last_name"]', 'Updated Last Name')
            ->type('[name="email"]', 'updated@example.com')
            ->click('button[type="submit"]')
            ->assertSee('Profile updated successfully');
    });

    it('allows users to change their password', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/settings/password')
            ->on();

        $page->type('[name="current_password"]', 'password')
            ->type('[name="new_password"]', 'newpassword123')
            ->type('[name="new_password_confirmation"]', 'newpassword123')
            ->click('button[type="submit"]')
            ->assertSee('Password updated successfully');
    });

    it('allows users to change appearance settings', function () {
        $user = User::factory()->create();

        $this->actingAs($user);

        $page = visit('/settings/appearance')
            ->on();

        // Verify the theme toggle component is present
        $page->assertPresent('[data-testid="theme-toggle"]');

        // Click on the Dark theme button
        $page->click('[data-testid="theme-toggle"] button:has-text("Dark")');

        // Verify we're still on the appearance page
        $page->assertPathIs('/settings/appearance');
    });
});
