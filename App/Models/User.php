<?php
namespace App\Models;

use PDO;
use Dom\Element;
use App\Models\Models;
use App\Trait\T_phone;
use App\Trait\T_Roles;

use Database\Database;
use SecTheater\Suppors\Arr;
use SecTheater\Suppors\Hash;
use MyFramework\Input\INPUT_POST;
class User extends Models
{
    use T_Roles ;
    use T_phone;
    protected $UserID;
    private $UserName;
    private $Email;
    private $Password;
    private $CreatedAt;
    private $Phone;
    private $address;
    private $Type;
    private $ConfirmPassword;
    protected $Roles;
    private $table = 'Users';
    private $search;
    protected  $scrID;
    
    

    public function __construct()
    {
       
        $this->UserName = filter_input(INPUT_POST, 'UserName', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->UserID = filter_input(INPUT_POST, 'UserID', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->Email = filter_input(INPUT_POST, 'Email', FILTER_SANITIZE_EMAIL) ?? null;
        $this->address= filter_input(INPUT_POST, 'Address', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->Phone= filter_input(INPUT_POST, 'Phone', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->Password = filter_input(INPUT_POST, 'new-password', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->ConfirmPassword = filter_input(INPUT_POST, 'C-Password', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->Type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->Roles = filter_input(INPUT_POST, 'role', FILTER_SANITIZE_NUMBER_INT) ?? null;
        $this->search = filter_input(INPUT_POST, 'UserName', FILTER_SANITIZE_SPECIAL_CHARS) ?? null;
        $this->scrID= filter_input(INPUT_POST, 'scrID', FILTER_SANITIZE_NUMBER_INT) ?? null;

        $this->require();
    }

    private function select()
    {
       
         $this->query("SELECT * FROM Users left join UserRoles on Users.UserID=UserRoles.UserID left join  phone on Users.UserID=phone.userID join Roles on Roles.RoleID=UserRoles.RoleID   ");
        $this->execute();
        $rows = $this->fetchAll();

        Arr::JsonData($rows);
    }
    
    public function insert()
    {
        
        $this->query("INSERT INTO $this->table (UserName, Email, Password,Address) VALUES (:UserName, :Email, :Password,:Address )");
        $this->bind(':UserName', $this->UserName);
        $this->bind(':Email', $this->Email);
        $this->bind(':Password', Hash::password_hash($this->Password));
        $this->bind(':Address',$this->address);
       
        if ($this->execute()) {
            $this->UserID=$this->lastID();
            $this->insertPhone();
            Arr::Json(['success' => true ,"Roles"=> $this->getInset($this->UserID) ]);
            
        } else {
           Arr::Json(['success' => false]);
        }
    }

    public function update()
    {
         $this->query("UPDATE $this->table SET UserName = :UserName, Email = :Email, Password = :Password  WHERE UserID = :UserID");
        $this->bind(':UserName', $this->UserName);
        $this->bind(':Email', $this->Email);
        $this->bind(':Password', $this->Password);
        $this->bind(':UserID', $this->UserID);
        $row = $this->execute();
        if ($row) {
           $this->UdatePhone();
           Arr::Json(['success' => true]);
        } else {
          Arr::Json(['success' => false]);
        }
    }

    public function search()

    {   
        $this->search = '%' .  $this->search .'%'  ;

        $this->query("SELECT * FROM Users left join UserRoles on Users.UserID=UserRoles.UserID left join  phone on Users.UserID=phone.userID join Roles on Roles.RoleID=UserRoles.RoleID WHERE UserName LIKE :UserName OR Email LIKE :Email OR UserID = :UserID");
        $this->bind(':UserName', $this->search);
        $this->bind(':Email', $this->search);
        $this->bind(':UserID',$this->search);
        $row = $this->execute();
        if ($row) {
            $rows = $this->fetchAll();
            Arr::JsonData($rows);
        } else {
           $this->select()  ;
        }
    }

    public function del()
    {
        $this->query("DELETE FROM $this->table WHERE UserID = :UserID");
        $this->bind(':UserID', $this->UserID);
        $row = $this->execute();
        if ($row) {
          Arr::Json(['success' => true]);
        } else {
              Arr::Json(['success' => false]);
        }
    }

    public function require()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if ($this->Type === 'select') {
                $this->select();
            } elseif ($this->Type === 'insert') {
                if($this->Passwordverification())
                {
                    $this->insert();
                }else{
                    echo json_encode(['success' => false, 'message' => 'Password and Confirm Password do not match.']);
                }
              
            } elseif ($this->Type === 'update') {
                
                $this->update();
            } elseif ($this->Type === 'search') {
                $this->search();
            } elseif ($this->Type === 'del') {
              
                 $this->del();
            }elseif ($this->Type === 'Roles') {
                $this->getRolesAll();
            }elseif ($this->Type === 'select') {
                $this->select();
               
            }

        }
    }
}


$User = new User();
