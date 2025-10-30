<?php
namespace App\Models;
use App\Models\Models;
use \App\Trait\T_Roles;
use App\Models\Session;
use SecTheater\Suppors\Arr;
use SecTheater\Suppors\Hash;
use MyFramework\Input\INPUT_POST;



class Login extends Models
{
    use T_Roles ;

    private $table = "Users";
    private $Username;
    private $Password;
    private $Role;
    private $Status;

    public function __construct()
    {
        $this->Username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING) ?? null ;
        $this->Password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING) ?? null ;
          Session::start();
          Session::CreateToken(); // 1 hour
          
     }
    public function Login_in()
    {
        $this->query("SELECT * FROM $this->table WHERE UserName = :username");
        $this->bind(':username', $this->Username);     
       $this->execute();
       $row=$this->fetchAll();
         if( $row)
         {
              foreach($row as $data)
              {
                if(Hash::password_verify($this->Password,$data['Password']))
                {
                 
                     if($data['Status'] == "Active")
                     {
                          
                          Session::set('UserID', $data['UserID']);
                          Session::set('UserName', $data['UserName']);
                          Session::set('Role', $this->getUserType($data['UserID']));
                         Session::set('status', $data['Status']);
                          Arr::Json([
                               'status' => true,
                               'message' => 'Login successful.',
                               'redirect' => '/'
                          ]);
                     }
                     else
                     {
                         Arr::Json(['status' => false,'message' => 'Your account is not active. Please contact the administrator.']);
                          
                     }
                }
                else
                {
                     Arr::Json(['status' => false,'message' => 'Incorrect password OR Username.']);
                }
              }
         }
         else
         {
             
              Arr::Json(['status' => false,'message' => 'Incorrect password OR Username.']);
         }
    }
}

$loi = new Login();
 $loi->Login_in();

