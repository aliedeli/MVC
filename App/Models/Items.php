<?php
namespace App\Models;
use PDO;
use App\Models\Models;
use Database\Database;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;
class Items extends Models
{
    private  $Type;
    
 
    public $name;
    public $barcode;
    public $cost_price;
    public $price;
    public $discount;
    public $counter;
    public $catID;
    public $bannerID;
    public $itemID;
    public $value;
    
    public function __construct()
    {
        
        $this->Type=$_POST['type'] ?? null;
      
        $this->name = filter_input(INPUT_POST,'name',FILTER_SANITIZE_SPECIAL_CHARS) ?? null  ;
        $this->barcode= filter_input(INPUT_POST,'Barcode',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->cost_price=filter_input(INPUT_POST,'CostPrice',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->price=filter_input(INPUT_POST,'price',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->discount=filter_input(INPUT_POST,'Discount',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->counter=(int) filter_input(INPUT_POST,'Counter',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->catID=filter_input(INPUT_POST,'CatID',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->bannerID=filter_input(INPUT_POST,'bannerID',FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->itemID = filter_input(INPUT_POST, 'itemID', FILTER_SANITIZE_NUMBER_INT) ?? null ;
        $this->value= filter_input(INPUT_POST,'search',FILTER_SANITIZE_SPECIAL_CHARS) ?? null;


        $this->getType();

        
        

          
       


    }
     public function insert()
    {
        $this->query("INSERT INTO Items   (NameItem,rqcode,CostPrice,Price,Discount,qty,CatID,BannerID) VALUES  (:name,:rq,:costPrice,:price,:Discount,:qty,:CatID,:BannerID) ");
        $this->bind(':name',$this->name);
        $this->bind(':rq',$this->barcode);
        $this->bind(':costPrice',$this->cost_price);
        $this->bind(':price', $this->price);
        $this->bind(':Discount', $this->discount);
        $this->bind(':qty',  $this->counter);
        $this->bind(':CatID', $this->catID);
        $this->bind(':BannerID', $this->bannerID);


        if( $this->execute())
        {
           Arr::Json(['success'=> true]);
            
        }else{
           Arr::Json(['success'=> false]);
        }

    


    }
    public function  select()  {

      
         $this->query("SELECT * FROM Items  ");
        $this->execute();
        $rows= $this->fetchAll();

        
        Arr::JsonData($rows);

        
    }
    private function update()
    {
      

        $this->query("UPDATE Items SET NameItem = :name, rqcode = :rq, CostPrice = :costPrice, Price = :price, Discount = :Discount, qty = :qty, CatID = :CatID, BannerID = :BannerID WHERE itemID = :itemID");
        $this->bind(':name', $this->name);
        $this->bind(':rq', $this->barcode);
        $this->bind(':costPrice', $this->cost_price);
        $this->bind(':price', $this->price);
        $this->bind(':Discount', $this->discount);
        $this->bind(':qty',(int) $this->counter);
        $this->bind(':CatID', $this->catID);
        $this->bind(':BannerID', $this->bannerID);
        $this->bind(':itemID', $this->itemID);
      

        if ($this->execute()) {
           Arr::Json(['success' => true]);
        } else {
           Arr::Json(['success' => false]);
        }
    }

    private function dele()
    {

         $this->query('DELETE   FROM   Items where itemID =:itemID');
         $this->bind(':itemID', $this->itemID);
          
        if($this->execute()) {
           Arr::Json(['success' => true]);
        } else {
           Arr::Json(['success' => false]);
        }
      
    }
    private function search()
    {
        $value = '%'.  $this->value  .'%';
      
        $this->query("SELECT * FROM Items  where  NameItem like :name or rqcode like :name2  ");
        $this->bind(':name',$value);
        $this->bind(':name2',$value);
        $this->execute();
       

        Arr::JsonData($this->fetchAll());

    }

    public function getType()  {
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
            }

        }else{

        }

    }
}


$item= new Items();