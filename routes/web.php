<?php

use Domains\Bike\Controllers\BikeController;
use Domains\Bike\Controllers\RentalController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group( function () {
    Route::inertia('/', 'dashboard')->name('dashboard');
    Route::resource('/bikes', BikeController::class);
    Route::resource('/rentals', RentalController::class);
});

require __DIR__.'/settings.php';
