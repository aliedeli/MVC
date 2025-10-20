<?php

namespace App\Models;
use App\Models\Models;
use SecTheater\Suppors\Arr;

class info extends Models
{
    public  $table;

    public function __construct()
    {
        $this->table=filter_input(INPUT_POST,'table',FILTER_SANITIZE_STRING) ?? null;

    }
    public function countAll()
    {
        
       
        $this->query("SELECT count(*) as count from $this->table ");
        $this->execute();
        $count=$this->fetchAll();
         Arr::Json([ 'count'=>  $count[0]['count']]) ;
    }
    public function talot($table,$key)
    {
        $t=0;
         $this->query("SELECT * from  $table ");
        $this->execute();
        $count=$this->fetchAll();
            foreach( $count as $value)
            {
                $t+=$value[$key];
            }
        
         Arr::Json([ 'count'=>  $t]) ;
    }

    public function method()
    {
        if($_SERVER['REQUEST_METHOD']  == 'POST')
        {   
        if($this->table === 'tolat')
        {
            $this->talot('sale','toltal');

        }elseif($this->table == 'Expenses')
        {
               $this->talot('Expenses','AmountPaid');

        }
        else{
            $this->countAll();
        }
      
        }

    }

}
$i=new info();
$i->method();
