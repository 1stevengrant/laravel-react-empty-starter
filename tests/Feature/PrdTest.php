<?php

use App\Models\User;
use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function (): void {
    $this->get('/prd')->assertRedirect('/login');
});

test('authenticated users can view the prd page', function (): void {
    $this->actingAs(User::factory()->create());

    $this->get('/prd')->assertOk();
});

test('malformed prd json renders an empty summary instead of crashing', function (): void {
    $path = base_path('plans/prd.json');
    $original = File::get($path);
    File::put($path, '{ this is not valid json');

    try {
        $this->actingAs(User::factory()->create());

        $this->get('/prd')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('prd-status')
                ->where('summary.total', 0)
                ->where('summary.passing', 0)
                ->where('summary.failing', 0)
            );
    } finally {
        File::put($path, $original);
    }
});
