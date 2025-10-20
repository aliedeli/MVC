<?php
namespace App\Controllers;
use SecTheater\Http\Route;
use SecTheater\view\ViewPost;
use App\Controllers\HomeController;

class Post 
{
   public function index()
   {
        return post('Sale');
   } 
   public function safe()
   {
        return post('Safe');
   } 

}



