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
        $this->query('UPDATE phone set  phone=:phone where CusID=:CusID OR  userID=:userID  ');
        $this->bind(':userID',$this->UserID ?? NULL);
        $this->bind(':CusID',$this->CusID ?? null);
        $this->bind(':phone',$this->Phone);
        if($this->execute()){
        return true;
             }else{
        return false;
       }


    }
    
}