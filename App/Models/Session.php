<?php

namespace App\Models;

use App\Models\Models;

class Session
{

    public static function start()
    {
      if (session_status() === PHP_SESSION_NONE) session_start();
    }
    public static  function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }
    public static function get($key)
    {
        return $_SESSION[$key] ?? null;
    }
    public static function destroy()
    {
        session_destroy();
    }
    public static function unset($key)
    {
        unset($_SESSION[$key]);
    }
    public static function getAll()
    {
        return $_SESSION;
    }
}
