<?php

namespace App\Models;

use PDo;
use App\Models\Models;
use Database\Database;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;


class Banner extends Models
{
    private $BannerID;
    private $BannerName;
    private $Type;
    public $conn;
    public $db;


    public function __construct()
    {
        $this->conn= (new Database());
        $this->BannerName=filter_input(INPUT_POST,'BannerName',FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
         $this->BannerID=filter_input(INPUT_POST,'BannerID',FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
        $this->Type=filter_input(INPUT_POST,'type',FILTER_SANITIZE_SPECIAL_CHARS) ?? null ;
        
        $this->require();

    }
    private function select()
    {
    
        $this->query('SELECT * FROM Banner ');
        $this->execute();
        $rows=$this->fetchAll();
       
      Arr::JsonData($rows);
    }
    public function insert()
    {
        $this->query('insert into Banner ( BannerName)values( :BannerName)');
        $this->bind(':BannerName',$this->BannerName);
        if( $this->execute())
        {
            Arr::Json(['success'=> true]);
        }else {
             Arr::Json(['success'=> false]);
        }
    }
        public function update()
    {
        $this->query('  update   Banner set BannerName = :BannerName where BannerID =:BannerID ');
        $this->bind(':BannerName',$this->BannerName);
         $this->bind(':BannerID',$this->BannerID);
       
      
        if( $this->execute())
        {
            Arr::Json(['success'=> true]);
        }else {
             Arr::Json(['success'=> false]);
        }
    }
     public function search()
    {
        $this->BannerName="%".$this->BannerName."%";

        $this->query(' SELECT * FROM Banner WHERE BannerName  LIKE  :BannerName OR BannerID=:BannerID ');
        $this->bind(':BannerName',$this->BannerName);
         $this->bind(':BannerID',$this->BannerID);
        $this->execute();
        Arr::JsonData( $this->fetchAll());

    }
    public function del()
    {
        $this->query(' delete from Banner where  BannerID = :BannerID');
        $this->bind(':BannerID',$this->BannerID,PDO::PARAM_INT);
        
        if( $this->execute())
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
            }elseif($this->Type == 'search'){
                 $this->search();
               
            }

        }
    }

}
$Banner=new Banner();