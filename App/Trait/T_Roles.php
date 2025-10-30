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
        $this->query('insert into  UserRoles (UserID,RoleID) values (:UserID, :RoleID)');
        $this->bind(':UserID', $UserID);
        $this->bind(':RoleID', $this->Roles);
        

            if($this->execute())
            {
                return true;
            }
            return false;
  
    
    }
    public function roloUpdate()
    {
        $this->query('UPDATE   UserRoles SET  RoleID=:RoleID WHERE  UserID=:UserID');
        $this->bind(':UserID', $this->UserID);
        $this->bind(':RoleID', $this->Roles);

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