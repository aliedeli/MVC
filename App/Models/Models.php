<?php

namespace App\Models;

use PDO;
use Database\Database;
use Dotenv\Parser\Parser;

class Models  extends Database
{



    public function __construct()
    {
        parent::__construct();
    }

    public function query($sql)
    {
        $this->db = self::conn()->prepare($sql);
    }
    public function bind($param, $vlaue, $type = null)
    {
        switch (!empty($vlaue)) {
            case is_int($vlaue):
                $type = PDO::PARAM_INT;
                break;
            case is_bool($vlaue):
                $type = PDO::PARAM_BOOL;
                break;
            case is_string($vlaue):
                $type = PDO::PARAM_STR;
        }

        $this->db->bindParam($param, $vlaue, $type);
    }
    public  function lastID()
    {
        return self::conn()->lastInsertId();
    }

    public function fetchAll()
    {
        return $this->db->fetchAll(PDO::FETCH_ASSOC);
    }
    public function execute()
    {
        return $this->db->execute();
    }

        public function __destruct()
    {
       $this->db=null;
    }

}
