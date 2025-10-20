<?php

namespace SecTheater\Suppors;
use PDO;
use App\Models\Models;
use Database\Database;
use App\Trait\T_User_Type;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;

class Hash 
{


    public static  function password_hash($password)
    {
        return password_hash($password, PASSWORD_BCRYPT);
    }

    public static function password_verify($password, $hash)
    {
        return password_verify($password, $hash);
    }

    public static function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public static function sanitize($data) {
        return htmlspecialchars(strip_tags($data));
    }
    
}