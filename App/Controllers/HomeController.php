<?php
namespace App\Controllers;

use App\Models\Banner;
use SecTheater\view\View;

class HomeController
{
    public function index()
    {
        return view('home');
    }
    public function login()
    {
        return view('login');
    }
    public function items()
    {
        return view('items');
    }
    public function safe()
    {
        return view('Safe');
    }
    public function sale( $params=[])
    {
        return view('sale', $params);
    }
    public function User()
     {
         return view('user');
     }
    public function Category()
    {
         return view('Category');
    }
    public function Banner()
    {
         
         return view('Banner');
    }
    public function Cutomer()
    {
         
         return view('customer');
    }
        public function printe()
    {
        view('printers');
    }
    public function expenses()
    {
        view('Expenses');
    }
    public function employees()
    {
        view('Employees');
    }

    public function App_Items()
    {
       
        post("items");
    }
        public function add_catgeory()
    {
       
        post("Category");
    }
            public function add_banner()
    {
       
        post("Banner");
    }
    public function add_sale()
    {
        post('Sale');
    }
    public function add_user()
    {
        post('User');
    }
    public function App_loing()
    {
        post('Login');
    }
    public function add_Cutomer()
    {
        post('Customers');
    }
    public function info()
    {
        post('info');
    }
    public function App_expenses()
    {
        post('Expenses');
    }
    public function Add_employees()
    {
        post('Employees');
    }
    
      public function Add_Department()
    {
        post('Department');
    }
    public function scrnnes()
   {
        return post('Screens');
   }
    
}

