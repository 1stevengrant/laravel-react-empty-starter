<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

describe('Home Page', function () {
    it('shows the welcome page', function () {
        $page = visit('/')
            ->on();

        $page->assertSee('Log in')
            ->assertSee('Register');
    });

    it('navigates to login page', function () {
        $page = visit('/')
            ->on();

        $page->click('a:has-text("Log in")')
            ->assertPathIs('/login');
    });

    it('navigates to register page', function () {
        $page = visit('/')
            ->on();

        $page->click('a:has-text("Register")')
            ->assertPathIs('/register');
    });
});
