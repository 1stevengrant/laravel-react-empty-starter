<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PrdStatusController;

Route::get('/', HomeController::class)->name('home');
Route::get('/prd-status', PrdStatusController::class)->name('prd-status');
Route::get('/progress', ProgressController::class)->name('progress');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
