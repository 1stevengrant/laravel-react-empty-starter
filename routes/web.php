<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrdController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\DashboardController;

Route::get('/', HomeController::class)->name('home');
Route::get('/prd', PrdController::class)->name('prd');
Route::get('/progress', ProgressController::class)->name('progress');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
