<?php
namespace App\Models;
use App\Models\Models;
use App\Models\Session;
use App\Trait\SalesSafe;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;
class safe extends Models
{
    use SalesSafe;

    private $TransactionID;
    private $TransactionDate;
    private $ExpID;
    private $saleID;
    private $cusID;
    private $CustomerName;
    private $OperationType; 
    private $InAmount;
    private $OutAmount;
    private $Balance;
    private $table;
    public function __construct()
    {
        $this->table='SalesSafe';
        
    }
    private function select()
    {
       $this->query(`SELECT * FROM {$this->table}  `);
       $this->execute();
       Arr::JsonData($this->fetchAll());
    }

}