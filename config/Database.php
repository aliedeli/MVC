<?php

namespace Database;
 use PDO;

// use function PHPSTORM_META\type;

class Database{
    private $host;
    private $prot;
    private $user;
    private $pwd;
    private $dbName;
    public $db;
    protected $conn;
  private static $instance = null;
    public function __construct()
    {
   
        $this->host=env('DB_HOST','127.0.0.1');
        $this->prot=env('DB_PORT','1433');
        $this->user=env('DB_USER','sa');
        $this->pwd=env('DB_PASSWORD','123');
        $this->dbName=env('DB_NAME','Stor');

 try{

        // $conn= new PDO("mysql:host=$this->host;dbname=$this->dbName",$this->user,$this->pwd);
        $conn = new PDO("sqlsrv:server=$this->host,$this->prot; TrustServerCertificate=true; Database= $this->dbName", $this->user, $this->pwd );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

        $this->conn = $conn;

        }catch(\PDOException $e){
            echo 'connection error ' . $e;

            }

      
    }
    public static function conn() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }

        return self::$instance->conn;
    }




}
