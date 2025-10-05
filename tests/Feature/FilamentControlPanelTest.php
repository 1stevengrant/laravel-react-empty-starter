<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to filament login page when accessing control panel', function () {
    $response = $this->get('/control');

    $response->assertRedirect('/control/login');
});

test('filament login page can be rendered', function () {
    $response = $this->get('/control/login');

    $response->assertStatus(200);
});

test('non-admin users are denied access to the filament control panel', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $response = $this->actingAs($user)->get('/control');

    $response->assertStatus(403); // Forbidden
});

test('admin users can access the filament control panel', function () {
    $user = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($user)->get('/control');

    $response->assertStatus(200);
});

test('admin users can access the filament dashboard', function () {
    $user = User::factory()->create(['is_admin' => true]);

    $response = $this->actingAs($user)->get('/control');

    $response->assertStatus(200);
    $response->assertSee('Dashboard'); // Should contain dashboard content
});

test('admin users can logout from filament control panel', function () {
    $user = User::factory()->create(['is_admin' => true]);

    // First login and access the control panel
    $this->actingAs($user)->get('/control')->assertStatus(200);

    // Then logout
    $response = $this->actingAs($user)->post('/control/logout');

    $this->assertGuest();
    $response->assertRedirect('/control/login');
});

test('filament control panel requires admin privileges', function () {
    // Test that the control panel route has auth middleware by checking redirect
    $this->get('/control')
        ->assertRedirect('/control/login');

    // Verify that non-admin users are denied access
    $regularUser = User::factory()->create(['is_admin' => false]);
    $this->actingAs($regularUser)
        ->get('/control')
        ->assertStatus(403);

    // Verify that admin users can access it
    $adminUser = User::factory()->create(['is_admin' => true]);
    $this->actingAs($adminUser)
        ->get('/control')
        ->assertStatus(200);
});
