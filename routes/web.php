<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('countries', [CountryController::class, 'index'])
    ->middleware('auth')
    ->name('countries');

Route::get('countries/{code}', [CountryController::class, 'show'])
    ->middleware('auth')
    ->name('countries.show');

// require __DIR__.'/settings.php';
