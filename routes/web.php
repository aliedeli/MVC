<?php

use App\Controllers\Post;
use SecTheater\Http\Route;
use App\Controllers\HomeController;

Route::get('/',[HomeController::class , "index"],[]);
Route::get('/login',[HomeController::class , 'login'],[]);
Route::get('/items',[HomeController::class , 'items'],[]);
Route::get('/sale',[HomeController::class , 'sale'],[]);
Route::get('/user',[HomeController::class , 'User'],[]);
Route::get('/category',[HomeController::class , 'Category'],[]);
Route::get('/banner',[HomeController::class , 'Banner'],[]);
Route::get('/customer',[HomeController::class , 'Cutomer'],[]);
Route::get('/expenses',[HomeController::class , 'expenses'],[]);
Route::get('/printer',[HomeController::class , 'printe'],[]);
Route::get('/employees',[HomeController::class , 'employees'],[]);
Route::get('/safe',[HomeController::class , 'safe'],[]);
// Route::get('/sale',function($params=['id', 'data']){
//     return view('sale', $params);
// });

Route::post('/App/expenses',[HomeController::class , 'App_expenses'],[]);
Route::post('/App/items',[HomeController::class,'App_Items'],[]);
Route::post('/App/loing',[HomeController::class,'App_loing'],[]);
Route::post('/Add/category',[HomeController::class,'add_catgeory'],[]);
Route::post('/Add/banner',[HomeController::class,'add_banner'],[]);
Route::post('/Add/Sale',[HomeController::class,'add_sale'],[]);
Route::post('/Add/user',[HomeController::class,'add_user'],[]);
Route::post('/Add/Cutomer',[HomeController::class,'add_Cutomer'],[]);
Route::post('/Add/info',[HomeController::class,'info'],[]);
Route::post('/Add/Employees',[HomeController::class,'Add_employees'],[]);
Route::post('/scrnnes',[HomeController::class,'scrnnes'],[]);
Route::post('/Add/Department',[HomeController::class,'Add_Department'],[]);
// Route::post('/test',[Post::class],'index',[]);
Route::post('/salf',[Post::class],'salf',[]);
