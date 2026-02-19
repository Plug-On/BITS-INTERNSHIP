<?php

use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\ManageUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\TodoController;

Route::post('/register', [UsersController::class, 'register']);
Route::post('/login', [UsersController::class, 'login']);
Route::get('/dashboard', [UsersController::class, 'dashboard']);
Route::post('/logout', [UsersController::class, 'logout']);


//For user management in dashboard (create , show , edit & delete)
Route::resource("users", ManageUserController::class);


Route::resource("companies",CompaniesController::class);

Route::resource('todo', TodoController::class);


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
