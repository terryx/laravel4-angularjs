<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function () {
    return View::make('index');
});

Route::get('/login', function () {
    return View::make('index');
});

Route::get('/video', function () {
    return View::make('index');
});

Route::get('/video/s/{query}', function ($url) {
    return View::make('index');
});

Route::get('/video/id/{id}', function ($url) {
    return View::make('index');
});


//Route::get('/{url}', function ($url) {
//print_r($url); exit;
//    $links = array('login', 'video', 'video/{id}');
//
//    foreach ($links as $link) {
//        if ($link === $url) {
//            return View::make('index');
//            break;
//        }
//    }
//
////    return View::make('error.404');
//});

Route::controller("auth", "AuthController");
Route::controller("video", "VideoController");
Route::controller("admin", "AdminController");