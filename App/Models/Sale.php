<?php

namespace App\Models;

use PDO;
use App\Trait\T_Sale;
use App\Models\Models;
use Database\Database;
use App\Models\Session;
use App\Trait\SalesSafe;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;
 Session::start();
class Sale extends Models
{
    use T_Sale;
    use SalesSafe;
    private $saleID;
    private $cusID;
    private $ID_detail;
    private $data;
    private $Type;
    private $search;
    private $searchDate;
    private $UserName;
    private $CutName;
    private $MethodType;
    private $Amount;
    private $AmountToltal;
   
    public function __construct()
    {
        
        $this->saleID = filter_input(INPUT_POST,'OrderID',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->cusID= filter_input(INPUT_POST,'CusID',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->ID_detail= filter_input(INPUT_POST,'CusID',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->data = filter_input(INPUT_POST,'data') ?? null;
        $this->search=filter_input(INPUT_POST,'search',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->CutName=filter_input(INPUT_POST,'CutName',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->searchDate=filter_input(INPUT_POST,'search-date',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->MethodType=filter_input(INPUT_POST,'MethodType',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->Amount=filter_input(INPUT_POST,'Amount',FILTER_SANITIZE_NUMBER_INT);
        $this->AmountToltal=filter_input(INPUT_POST,'AmountToltal',FILTER_SANITIZE_NUMBER_INT);

        $this->UserName=Session::get('UserName');
        $this->Type= $_POST['type'];
        $this->search = '%'. $this->search .'%';
        if($this->data !=null)
        {
            $this->data=json_decode($this->data);
        }
    
        $this->getType();
      
    } 
    private function insert()
    {   
       
        if($this->verification($this->saleID))
        {
           
            $this->insert_details($this->saleID,$this->data);
            
        }else{
            $this->query('INSERT into sale (saleID,cusID,UserName) values (:saleID,:cusID,:UserName)');
            $this->bind(':saleID',$this->saleID);
            $this->bind(':cusID',$this->cusID);
            $this->bind(':UserName',$this->UserName);
            if($this->execute())
            {
            
               
                $this->insert_details($this->saleID,$this->data);
            }else{
                 Arr::Json(['success' => false]);
            }
        }


    }
    private function update()
    {
        $this->query('update  sale set  cusID=:cusID where saleID =:ID ');
        $this->bind(':cusID',$this->cusID);
        $this->bind(':ID',$this->saleID);
        if($this->execute())
        {
             Arr::Json(['success' => true]);
        }else{
         Arr::Json(['success' => false]);
        }

    }
    private function dele()
    {
        $this->query('DELETE  FROM sale   where saleID =:ID ');
        $this->bind(':ID',$this->saleID);
        if($this->execute())
        {
            $this-> Dele_saleID($this->saleID);

             Arr::Json(['success' => true]);

        }else{
         Arr::Json(['success' => false]);
        }

    }

    private function select()
    {
        $this->query('SELECT * FROM sale LEFT  JOIN Customers on  Customers.CusID=sale.cusID  order by sale.dateSale DESC  ' );
        $this->execute();
        Arr::JsonData($this->fetchAll());
    }
    private function search()
    {
        $this->query('SELECT * FROM sale where saleID=:saleID ');
        $this->bind(':saleID',$this->search);
        $this->execute();
        Arr::JsonData($this->fetchAll());
    } 

        private function searchDate()
    {
        $this->query('SELECT * FROM sale   LEFT  JOIN Customers on  Customers.CusID=sale.cusID where sale.dateSale=:saleID ');
        $this->bind(':saleID',$this->searchDate);
        $this->execute();
        Arr::JsonData($this->fetchAll());
    } 
    private function getType()  {
        
        if($_SERVER['REQUEST_METHOD'] === "POST")
        {
            if($this->Type == 'insert')
            {
               
                  $this->insert();


            }elseif($this->Type == 'update')
            {
                 $this->update();
             

            }elseif($this->Type == 'dele')
            {
                $this->dele();

            }elseif($this->Type == 'select')
            {
                $this->select();
            }elseif($this->Type == 'search')
            {
                $this->search();

            }elseif($this->Type == 'update_details')
            {
               
                 $this->update_details($this->saleID,$this->data);
            }elseif($this->Type == 'datails'){
                $this->select_Details($this->saleID);
            }elseif($this->Type == 'Dele_Details')
            {
                $this->Dele_Details($this->data);
            }elseif($this->Type == 'search-date')
            {
                $this->searchDate();
            }elseif($this->Type == 'sale')

            {   
                
                 if($this->T_SaleInsert(null,$this->saleID, $this->cusID,$this->CutName, $this->MethodType,$this->Amount,0,$this->AmountToltal))
                    {
                    
                        Arr::Json(['success' => true]);
                        
                    }else{
                        Arr::Json(['success' => false]);
                    }
                        
            }

        }else{

        }

    }


}
$sale= new Sale();