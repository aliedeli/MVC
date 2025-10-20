<?php
use Dotenv\Parser\Value;
use SecTheater\view\View;
use SecTheater\Application;
use SecTheater\view\ViewPost;

if(!function_exists('app'))
{
    function app()
    {
    static  $instance = null;

        if($instance == null){
            
         $instance =   new Application ;
        }
        return $instance;
    }
}

if(!function_exists('env'))
{
    function env($key, $defaut = null)
    {
        return $_ENV[$key] ?? Value($defaut);
    }
}



if(!function_exists('Value'))
{
    function Value($value)
    {
        return ($value instanceof Closure ) ? $value() : $value;
    }
}
if(!function_exists('base_path'))
{
    function base_path()
     {
        return dirname(__DIR__) . '/../' ;
    }
}
if(!function_exists('view_path'))
{
    function view_path()
     {
        return base_path() . 'views/' ;
    }
}
if(!function_exists('Post_path'))
{
    function Post_path()
     {
        return base_path() . 'App/Models/' ;
    }
}
if(!function_exists('view'))
{
    function view($view,$params=[])
    {
        View::make($view, $params);
    }
}
if(!function_exists('post'))
{
    function post($view,$params=[])
    {
        ViewPost::make($view, $params);
    }
}