<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function (): void {
    $this->get('/progress')->assertRedirect('/login');
});

test('authenticated users can view the progress page', function (): void {
    $this->actingAs(User::factory()->create());

    $this->get('/progress')->assertOk();
});
