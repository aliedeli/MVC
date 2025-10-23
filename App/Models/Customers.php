<?php
namespace App\Models;
use PDO;
use App\Models\Models;
use Database\Database;
use \App\Trait\T_Match;
use \App\Trait\T_phone;
use SecTheater\Suppors\Arr;

class Customers extends Models
{
    use T_Match;
    use T_phone;
    private $table = 'customers';
    private $CusID;
    private $name;
    private $address;
    private $email;
    private $phone;
    private $action;

    public function __construct()
    {
        $this->CusID = filter_input(INPUT_POST, 'CusID', FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL) ?? null;
        $this->phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->require();
        
    }
    private function insert()
    {
       $this->query("INSERT INTO $this->table (name, address,Email ) VALUES (:name, :address,:email)");
        $this->bind(':name', $this->name);
        $this->bind(':address', $this->address);
        $this->bind(':email', $this->Memail($this->email)? $this->email : null);
       
       if($this->execute()){
            $this->CusID=$this->lastID();
        Arr::Json(['success'=>true]);
            if($this->Mphone($this->phone))
            {
            
               if( $this->insertPhone()){
                Arr::Json(['success'=>true ,'phone'=>true] );
                }else{
                    Arr::Json(['success'=>true,'phone'=>false]);
                }

            }
       
       }else{
        Arr::Json(['success'=>false]);
       }
    }
    private function update()
    {
        $this->query("UPDATE $this->table SET name = :name, address = :address WHERE CusID = :CusID");
        $this->bind(':CusID', $this->CusID);
        $this->bind(':name', $this->name);
        $this->bind(':address', $this->address);
        
       if($this->execute()){
       if($this->Mphone($this->phone))
            {
            
               if( $this->UdatePhone()){
                Arr::Json(['success'=>true ,'phone'=>true] );
                }else{
                    Arr::Json(['success'=>true,'phone'=>false]);
                }

            }
       }else{
        Arr::Json(['success'=>false]);
       }
    }
    private function select()
    {
        $this->query("SELECT  customers.CusID as customersID ,* FROM $this->table left join phone on customers.CusID=phone.cusID left join (SELECT cusID, COUNT(*) AS QtyOrder FROM sale GROUP BY CusID) AS order_counts ON customers.CusID = order_counts.CusID  ");
        $this->execute();
        $rows = $this->fetchAll();
        Arr::JsonData($rows);
    }
    public function search()
    {
       
        $this->name= '%'. $this->name .'%';
        $this->query("SELECT customers.CusID as customersID ,* FROM $this->table left join (SELECT cusID, COUNT(*) AS QtyOrder FROM sale GROUP BY CusID) AS order_counts ON customers.CusID = order_counts.CusID  WHERE customers.name LIKE :name OR customers.CusID LIKE :CusID");
        $this->bind(':name', $this->name);
        $this->bind(':CusID', $this->CusID);
        $this->execute();
        $row = $this->fetchAll();
        Arr::JsonData($row);
    }
    public function delete()
    {
       
        $this->query("DELETE FROM $this->table WHERE CusID = :CusID");
        $this->bind(':CusID', $this->CusID);
        
       if($this->execute()){
        Arr::Json(['success'=>true]);
       }else{
        Arr::Json(['success'=>false]);
       }
    }
    public function require()
    {

       
 
        if($_SERVER['REQUEST_METHOD'] === 'POST' ) {
            if($this->action == 'insert') {
               
                $this->insert();
            } elseif($this->action == 'update') {
                $this->update();
            } elseif($this->action == 'select') {
                $this->select();
            } elseif($this->action == 'search') {
               
                 $this->search();
            } elseif($this->action == 'delete') {
               
                $this->delete();
            } else {
                Arr::JsonData(['error' => 'Invalid action or request method']);
                print_r($_POST);
            }
           
        }

      
    }


}
$Cutomer=new Customers();
