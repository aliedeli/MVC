<?php

namespace App\Models;

use App\Models\Models;

class Session
{
    public const SESSION_NAME = 'MY_APP_SESSION';
    public const LIFETIME = 3600; // 1 hour
    public const PATH = '/';
    public const DOMAIN = '';
    public const SECURE = false; // Set to true if using HTTPS
    public const HTTP_ONLY = true;


    public function __construct()
    {

        session_name(self::SESSION_NAME);
        session_set_cookie_params([
            'lifetime' => self::LIFETIME,
            'path' => self::PATH,
            'domain' => self::DOMAIN,
            'secure' => self::SECURE,
            'httponly' => self::HTTP_ONLY,
            'samesite' => 'Lax'
        ]);
        

        if(self::validateToken(self::getToken()))
        {
           
        }
        else
        {
            self::CreateToken();
        }
    }

    public static function start()
    {
      if (session_status() === \PHP_SESSION_NONE) session_start();
     
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
    public static function CreateToken()
    {
        $token = bin2hex(random_bytes(32));
        self::set('csrf_token', $token);
        self::set('csrf_token_time', time());
        return $token;

    }
    public static function getToken()
    {
        return self::get('csrf_token');
    }

    public static function has($key)
    {
        return isset($_SESSION[$key]);
    }
    public static function validateToken($token)
    {
        $storedToken = self::get('csrf_token');
        $tokenTime = self::get('csrf_token_time');
        $lifetime = self::LIFETIME();

        if ($storedToken && hash_equals($storedToken, $token)) {
            if (($tokenTime + $lifetime) >= time()) {
                return true;
            }
        }
        return false;

    }


    public static function LIFETIME()
    {
        return ini_get("session.gc_maxlifetime");

    }
    public static function setLIFETIME($seconds)
    {
        ini_set("session.gc_maxlifetime", $seconds);
    }

  

    public static function flash($key, $value = null)
    {
        if ($value !== null) {
            $_SESSION['flash'][$key] = $value;
        } else {
            if (isset($_SESSION['flash'][$key])) {
                $flash = $_SESSION['flash'][$key];
                unset($_SESSION['flash'][$key]);
                return $flash;
            }
            return null;
        }
    }

    public static function regenerate()
    {
        session_regenerate_id(true);
    }

}
