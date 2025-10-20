<?php
namespace App\Trait;
trait T_Match 
{
    public function Mphone($phone)
    {
        $pattern = "/^01[0-2,5]{1}[0-9]{10}$/";
        if (preg_match($pattern, $phone)) {
            return true;
        } else {
            return false;
        }
    }
    public function Memail($email)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return true;
        } else {
            return false;
        }
    
    }
    public function Mname($name)
    {
        $pattern = "/^[a-zA-Z\s]+$/";
        if (preg_match($pattern, $name)) {
            return true;
        } else {
            return false;
        }
    }

    public function Maddress($address)
    {
        $pattern = "/^[a-zA-Z0-9\s,.-]+$/";
        if (preg_match($pattern, $address)) {
            return true;
        } else {
            return false;
        }
    }




}

