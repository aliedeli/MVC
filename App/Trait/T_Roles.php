<?php
namespace App\Trait;
use  SecTheater\Suppors\Arr;

trait T_Roles
{
    public function getUserType($id)
    {
        $this->query('SELECT * FROM  Roles jOIN UserRoles   ON Roles.RoleID=UserRoles.RoleID  where UserID= :UserID');
        $this->bind(':UserID', $id);
        $this->execute();
        $rows = $this->fetchAll();
        
        return $rows[0]['RoleName'] ?? null;
        
    }
    public function getInset($UserID)
    {
        $this->query('insert into  UserRoles (UserID,RoleID,sceID) values (:UserID, :RoleID,:scrID)');
        $this->bind(':UserID', $UserID);
        $this->bind(':RoleID', $this->Roles);
         $this->bind(':RoleID', $this->scrID);

            if($this->execute())
            {
                return true;
            }
            return false;
  
    }
    public function getRolesAll()
    {   
         $this->query('SELECT * FROM  Roles ');
        $this->execute();
        $rows = $this->fetchAll();
        
        Arr::JsonData( $rows);
    }
    public function Passwordverification()
    {
      if(isset($_POST['Password']) && isset($_POST['ConfirmPassword']))
      {
          if($_POST['Password'] === $_POST['ConfirmPassword'])
          {
              return true;
          }else{
              return false;
          }
    }
    return false;
    }

}