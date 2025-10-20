<?php
namespace App\Models;

use PDO;
use App\Models\Models;
use Database\Database;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;

class Category extends Models
{
    private $CatID;
    private $CatName;
    private $Type;
    public $conn;
    public $db;


    public function __construct()
    {
        $this->conn= (new Database());
        $this->CatName=filter_input(INPUT_POST, 'Categort', FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
        $this->CatID=filter_input(INPUT_POST,'catID',FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
        $this->Type=filter_input(INPUT_POST,'type',FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
    

        $this->require();

    }
    private function select()
    {
      
         $this->query('SELECT * FROM Category ');
        $this->execute();
       
       
       Arr::JsonData( $this->fetchAll());
    }
    public function insert()
    {
  
        $this->query('insert into Category ( NameCat)values( :NameCat)');
         $this->bind(':NameCat',$this->CatName,PDO::PARAM_STR);
       
        
        if($this->execute())
        {
            Arr::Json(['success'=> true]);
        }else {
             Arr::Json(['success'=> false]);
        }
    }
        public function update()
    {
     

       $this->query('  update   Category set NameCat = :NameCat where CatID =:CatID ');
         $this->bind(':NameCat',$this->CatName);
          $this->bind(':CatID',$this->CatID);
       
        
        if($this->execute())
        {
            Arr::Json(['success'=> true]);
        }else {
             Arr::Json(['success'=> false]);
        }
    }
  public function search()
    {
        $this->query(' SELECT * FROM Category WHERE NameCat  LIKE  %:NameCat%  OR CatID=:CatID ');
        $this->bind(':NameCat',$this->CatName);
        $this->bind(':CatID',$this->CatID);
        $this->execute();
        Arr::JsonData( $this->fetchAll());
        
        

    }
    public function del()
    {
        $this->query(' delete from Category where  CatID = :CatID');
         $this->bind(':CatID',$this->CatID,PDO::PARAM_INT);
        
        if($this->execute())
        {
            Arr::Json(['success'=> true]);
        }else {
             Arr::Json(['success'=> false]);
        }

    }
    public function require()
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {
            if($this->Type === 'select')
            {
                $this->select();
            }elseif($this->Type == "insert" ){
                $this->insert();

            }elseif($this->Type == 'update')
            {
                $this->update();
            }elseif($this->Type == 'del'){
                $this->del();
            }

        }
    }

}

$cat = new Category();

