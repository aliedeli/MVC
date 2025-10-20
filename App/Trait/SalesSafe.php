<?php
namespace App\Trait;

trait SalesSafe 
{
   private  $TransactionID; 
   private  $TransactionDate; 
   private  $InvoiceNo; 
   private  $CustomerName; 
   private  $OperationType; 
   private  $InAmount; 
   private  $OutAmount; 
   private  $Balance;


   public function T_SaleInsert($ExpID,$saleID,$cusID,$CustomerName,$OperationType,$InAmount,$OutAmount,$Balance)
   {
      $this->query('insert into SalesSafe (ExpID,saleID,cusID,CustomerName,OperationType,InAmount,OutAmount,Balance) 
      values
      (:ExpID, :InvoiceNo, :cusID, :CustomerName, :OperationType, :InAmount, :OutAmount, :Balance)');
      $this->bind(':InvoiceNo',$saleID);
      $this->bind(':ExpID',$ExpID);
      $this->bind(':cusID',$cusID);
      $this->bind(':CustomerName',$CustomerName);
      $this->bind(':OperationType',$OperationType);
      $this->bind(':InAmount',$InAmount);
      $this->bind(':OutAmount',$OutAmount);
      $this->bind(':Balance',$Balance);
      if( $this->execute())
      {
         return true;
      }
      return false ;
     
     
    
   }

   public function T_SaleUpdate($InvoiceNo,$OperationType,$InAmount,$OutAmount,$Balance)
   {
      $this->query('UPDATE SalesSafe SET OperationType=:OperationType,InAmount=:InAmount,OutAmount=:OutAmount,Balance=:Balance WHERE InvoiceNo=:InvoiceNo');
      $this->bind(':OperationType',$OperationType);
      $this->bind(':InAmount',$InAmount);
      $this->bind(':OutAmount',$OutAmount);
      $this->bind(':Balance',$Balance);
      $this->bind(':InvoiceNo',$InvoiceNo);

   if( $this->execute())
      {
         return true;
      }
      return false ;
     

   }
   public function T_Saledelete($InvoiceNo)
   {
       $this->query('DELETE FROM SalesSafe  WHERE InvoiceNo=:InvoiceNo');
       $this->bind(':InvoiceNo',$InvoiceNo);
      if( $this->execute())
      {
         return true;
      }
      return false ;
   }

}