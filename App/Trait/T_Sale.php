<?php
namespace App\Trait;
use Database\Database;
use SecTheater\Suppors\Arr;

trait T_Sale  
{
    

    
    public function verification($id)
    {
        $this->query('SELECT * FROM sale where saleID=:ID');
        $this->bind(':ID',$id);
        $this->execute();
        $rows= $this->fetchAll();

        if( $rows)
        {
            return true;
        }else{
            return false;
        }

    }
    public function insert_details($id,$data)
    {
       
       
        $this->query('insert into  sale_details (itemID, ItemName,qty, price, discount, saleID ) values  ( :itemID,:name,:qty,:price,:discount,:saleID )');
        $this->bind(':itemID',$data->ID);
        $this->bind(':name',$data->name);
        $this->bind(':qty',$data->qty);
        $this->bind(':price',$data->price);
        $this->bind(':discount',$data->discount);
        $this->bind(':saleID',$id);
        
        if($this->execute())
        {
               Arr::Json(['success' => true]);

        }else{
              Arr::Json(['success' => false]);
        }
         
        

        
    }
      public function update_details($id,$data)
    {
        $this->query('UPDATE sale_details SET  qty=:qty, price=:price, discount=:discount where sale_detail_ID=:itemID and saleID=:saleID');
        $this->bind(':itemID',$data->ID);
        $this->bind(':qty',$data->qty);
        $this->bind(':price',$data->price);
        $this->bind(':discount',$data->discount);
        $this->bind(':saleID',$id);
        
        if($this->execute())
        {
                Arr::Json(['success' => true]);

        }else{
              Arr::Json(['success' => false]);
        }
        
    }
    public function select_Details($id)
    {
        $this->query('SELECT * FROM sale_details where saleID=:ID');
        $this->bind(':ID',$id);
        $this->execute();
        $rows= $this->fetchAll();
         Arr::JsonData($rows);


    } 
        public function Dele_Details($id)
    {
        $this->query('delete from sale_details where sale_detail_ID =:ID');
        $this->bind(':ID',$id->ID);
        if($this->execute())
        {
                Arr::Json(['success' => true]);

        }else{
             Arr::Json(['success' => false]);
        }
    } 
        public function Dele_saleID($id)
    {
        $this->query('delete from sale_details where saleID =:ID');
        $this->bind(':ID',$id);
        $this->execute();
       
    } 
}