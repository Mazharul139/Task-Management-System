<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
//Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});

Route::post('/register', [AuthController::class, 'register']); // No middleware
Route::post('/login', [AuthController::class, 'login']);       // No middleware
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum'); // Middleware applied

