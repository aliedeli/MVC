<?php
namespace App\Models;
use App\Models\Models;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;

class Department extends Models
{
    private $DepartmentID;
    private $DepartmentName;
    private $Location;
     private $action;

    public function __construct()
    {
          $this->action=filter_input(INPUT_POST,'action',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
          $this->DepartmentName=filter_input(INPUT_POST,'DepartmentName',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
          $this->Location=filter_input(INPUT_POST,'Location',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
          $this->DepartmentID=filter_input(INPUT_POST,'DepartmentID',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->require();
    }
    private function insert()
    {
        $this->query('INSERT INTO Departments (DepartmentName,Location) VALUES (:DepartmentName,:Location)');
        $this->bind(':DepartmentName',$this->DepartmentName);
        $this->bind(':Location',$this->Location);

        if($this->execute())
        {
           Arr::Json(['success' => true]);
        }else{
             Arr::Json(['success' => false]);
        }
    }
    private function update()
    {
        $this->query('UPDATE Departments SET  DepartmentName=:DepartmentName,Location=:Location WHERE DepartmentID=:DepartmentID');
        $this->bind(':DepartmentName',$this->DepartmentName);
        $this->bind(':Location',$this->Location);
        $this->bind(':DepartmentID',$this->DepartmentID);

        if($this->execute())
        {
           Arr::Json(['success' => true]);
        }else{
             Arr::Json(['success' => false]);
        }
    }
    private function select()
    {
        $this->query('SELECT * FROM Departments  ');
        $this->execute();

        Arr::JsonData($this->fetchAll());
    }
    private function dalete ()
    {
        $this->query('DELETE  FROM Departments WHERE  DepartmentID = :DepartmentID');
        $this->bind(':DepartmentID',$this->DepartmentID);
       
        if( $this->execute())
        {
           Arr::Json(['success' => true]);
        }else{
             Arr::Json(['success' => false]);
        }

     
    }

       public function require()
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {
           if($this->action === 'insert')
           {
                $this->insert();
           }elseif($this->action === 'update')
           {
                     $this->update();
           }elseif($this->action === 'select')
           {
                    $this->select();
           }elseif($this->action === "delete")
           {
            $this->dalete();
           }

        }
    }
}

$Departments= new Department();