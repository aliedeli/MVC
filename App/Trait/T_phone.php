<?php
namespace App\Trait;

trait T_phone 
{
    public function insertPhone()
    {
    
        $this->query("INSERT INTO phone (CusID, phone ,userID) VALUES (:CusID, :phone,:userID)");
        $this->bind(':CusID', $this->CusID ?? null);
        $this->bind(':phone', $this->Phone );
        $this->bind(':userID',$this->UserID ?? null);
       if($this->execute()){
        return true;
       }else{
        return false;
       }

    }
    public function UdatePhone()
    {
        $this->query('update phone set CusID=:CusID , phone=:phone, userID=:userID where CusID=:CusID OR userID=:userID  ');
        $this->bind(':userID',$this->UserID ?? NULL);
        $this->bind(':CusID',$this->CusID ?? null);
        $this->bind(':CusID',$this->phone);
        if($this->execute()){
        return true;
             }else{
        return false;
       }


    }
    
}