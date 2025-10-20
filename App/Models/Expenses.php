<?php
namespace App\Models;
use Dom\Element;
use App\Models\Models;
use App\Trait\SalesSafe;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;

class Expenses extends Models
{

    private $action;
    private $ID;
    private $name; 
    private $sale;
    private $search;
    use SalesSafe;

    public function __construct()
    {
        $this->action=filter_input(INPUT_POST,'action',FILTER_SANITIZE_SPECIAL_CHARS)  ?? null       ;
        $this->ID=filter_input(INPUT_POST,'ExpID',FILTER_SANITIZE_NUMBER_INT) ??null ;
        $this->name=filter_input(INPUT_POST,'name',FILTER_SANITIZE_SPECIAL_CHARS)  ?? null     ;
        $this->sale=filter_input(INPUT_POST,'AmountPaid',FILTER_SANITIZE_NUMBER_INT)    ?? null   ;
        $this->search=filter_input(INPUT_POST,'search',FILTER_SANITIZE_SPECIAL_CHARS)    ?? null ;
    }
    private function insert()
    {
        $this->query('insert into Expenses ( ExpenseName, AmountPaid) values (:ExpenseName,:AmountPaid)');
        $this->bind(':ExpenseName',$this->name);
        $this->bind(':AmountPaid',$this->sale);

        if($this->execute())
        {
            $this->T_SaleInsert( $this->lastID(),null,null,null, $this->name,0,$this->sale,$this->sale);
            Arr::Json(['success'=> true]);
        }else{
            Arr::Json(['success'=> false]);
        }

    }
    public function select()
    {
        $this->query(' SELECT * FROM  Expenses ORDER BY ExpID ASC ');
        $this->execute();

        Arr::JsonData($this->fetchAll());

        
    }
    public function update()
    {

        $this->query('UPDATE  Expenses SET  ExpenseName=:ExpenseName, AmountPaid=:AmountPaid  WHERE ExpID=:ExpID');
        $this->bind(':ExpID',$this->ID);
        $this->bind(':ExpenseName',$this->name);
        $this->bind(':AmountPaid',$this->sale);

        if($this->execute())
        {
               
            Arr::Json(['success'=> true]);
        }else{
            Arr::Json(['success'=> false]);
        }
    }

    public function search()
    {
         $this->search= '%'.$this->search.'%';
     
        $this->query(' SELECT * FROM  Expenses WHERE ExpenseName LIKE :search ');
        $this->bind(":search",$this->search);
        $this->execute();

        Arr::JsonData($this->fetchAll());
    }
   public function del()
    {
        $this->query('DELETE FROM  Expenses    WHERE ExpID=:ExpID');
        $this->bind(':ExpID',$this->ID);

        if($this->execute())
        {
            Arr::Json(['success'=> true ]);
        }else{
            Arr::Json(['success'=> false]);
        }
    }
      public function require()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($this->action === 'select') {
                $this->select();

            } elseif ($this->action === 'insert') {
              
                    $this->insert();
      
              
             } elseif ($this->action === 'update') {
                
                 $this->update();
             } elseif ($this->action === 'search') {
               $this->search();
            } elseif ($this->action === 'del') {
              
                  $this->del();
        }

        }
    }


}
$Expenses= new Expenses();
$Expenses->require();