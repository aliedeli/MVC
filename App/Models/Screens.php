<?php
namespace App\Models;
use PDO;
use App\Models\User;
use App\Models\Models;

use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;

class Screens extends Models  
{
    public $serID;
    public $UserID;
    public $action;
    
    public function __construct()
    {
        Session::start();
         $this->UserID=Session::get('UserID');
         $this->action=filter_input(INPUT_POST,'action',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
       $this->require();
    }
    public function RoleScreens()
    {
        $scrnnes=[];
        $this->query('SELECT * FROM Role_Screene  LEFT JOIN Scrnnes  ON Role_Screene.ScrID=Scrnnes.ScrID  WHERE Role_Screene.UserID=:UserID');
        $this->bind(':UserID',$this->UserID);
        $this->execute();

    
        Arr::JsonData($this->fetchAll());
    }
    public function scrnne($id)  {
        $this->query('SELECT * FROM Scrnnes WHERE ScrID=:ScrID');
        $this->bind(':ScrID',$id);
        $this->execute();
        return $this->fetchAll();
    }
    public  function getRole($UserID,$name)
    {
        $this->query('SELECT * FROM Role_Screene  LEFT JOIN Scrnnes  ON Role_Screene.ScrID=Scrnnes.ScrID WHERE  Scrnnes.scrnne=:name AND Role_Screene.UserID=:UserID  ');
        $this->bind(':name',$name);
        $this->bind(':UserID',$UserID);
        $this->execute();
        $view= $this->fetchAll();
       
        if(!empty($view) && $view[0]['views'] > 0)
        {
            return true;
        }

        return false;
    }


    public static function verification($UserID,$name)
    {
       $obj = new self();   // إنشاء كائن من الكلاس نفسه
        return $obj->getRole($UserID, $name);
    }

    public function require()
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {
            if( $this->action == "Role")
            {
                $this->RoleScreens();
            }
        }
    }


}

$scrnnes=new Screens();