<?php
namespace App\Models;
use App\Models\Models;
use App\Trait\T_Match;
use SecTheater\Suppors\Arr;
use MyFramework\Input\INPUT_POST;
class Employees extends Models
{
    use T_Match;
    private $action;
    private $EmployeeID;
    private $FirstName ;
    private $LastName; 
    private $DateOfBirth; 
    private $Gender; 
    private $HireDate;
    private $DepartmentID; 
    private $JobTitleID;
    private $Salary; 
    private $Email; 
    private $Phone; 
    private $Addres;
    private $vaule;

    public function __construct()
    {
        $this->action=filter_input(INPUT_POST,'action',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->EmployeeID=filter_input(INPUT_POST,'EmployeeID',FILTER_SANITIZE_NUMBER_INT);
        $this->FirstName=filter_input(INPUT_POST,'FirstName',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->LastName=filter_input(INPUT_POST,'LastName',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->DateOfBirth=filter_input(INPUT_POST,'DateOfBirth',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->Gender=filter_input(INPUT_POST,'Gender',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->HireDate=filter_input(INPUT_POST,'HireDate',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->DepartmentID=filter_input(INPUT_POST,'DepartmentID',FILTER_SANITIZE_NUMBER_INT);
        $this->JobTitleID=filter_input(INPUT_POST,'JobTitleID',FILTER_SANITIZE_NUMBER_INT);
        $this->Salary=filter_input(INPUT_POST,'Salary',FILTER_SANITIZE_NUMBER_INT);
        $this->Email=filter_input(INPUT_POST,'Email',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->Phone=filter_input(INPUT_POST,'Phone',FILTER_SANITIZE_NUMBER_INT);
        $this->Addres=filter_input(INPUT_POST,'Address',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->vaule=filter_input(INPUT_POST,'search',FILTER_SANITIZE_SPECIAL_CHARS);

        $this->require();
        
    }
    private function insert()
    {
        $this->query('INSERT INTO Employees (FirstName,LastName,DateOfBirth,Gender,HireDate,DepartmentID,Salary,Email, Phone, Address) VALUES (:FirstName,:LastName,:DateOfBirth,:Gender,:HireDate,:DepartmentID,:Salary,:Email,:Phone,:Address)');
        $this->bind(':FirstName',$this->FirstName);
        $this->bind(':LastName',$this->LastName);
        $this->bind(':DateOfBirth',$this->DateOfBirth);
        $this->bind(':Gender',$this->Gender);
        $this->bind(':HireDate',$this->HireDate);
        $this->bind(':DepartmentID',$this->DepartmentID);
        // $this->bind(':JobTitleID',$this->JobTitleID);
        $this->bind(':Salary',$this->Salary);
        $this->bind(':Email',$this->Email);
        $this->bind(':Phone',$this->Mphone($this->Phone));
        $this->bind(':Address',$this->Addres);

        if($this->execute())
        {
            Arr::Json(['success' => true]);
        }
        else
        {
             Arr::Json(['success' => false]);
        }
    } 
    private function update()
    {
        $this->query('UPDATE  Employees SET  FirstName=:FirstName,LastName=:LastName,DateOfBirth=:DateOfBirth,Gender=:Gender,HireDate= :HireDate,DepartmentID=:DepartmentID,Salary=:Salary,Email=:Email, Phone=:Phone, Address=:Address  WHERE EmployeeID=:EmployeeID');
        $this->bind(':EmployeeID',$this->EmployeeID);
        $this->bind(':FirstName',$this->FirstName);
        $this->bind(':LastName',$this->LastName);
        $this->bind(':DateOfBirth',$this->DateOfBirth);
        $this->bind(':Gender',$this->Gender);
        $this->bind(':HireDate',$this->HireDate);
        $this->bind(':DepartmentID',$this->DepartmentID);
       // $this->bind(':JobTitleID',$this->JobTitleID);
        $this->bind(':Salary',$this->Salary);
        $this->bind(':Email',$this->Email);
        $this->bind(':Phone',$this->Mphone($this->Phone));
        $this->bind(':Address',$this->Addres);

        if($this->execute())
        {
            Arr::Json(['success' => true]);
        }
        else
        {
             Arr::Json(['success' => false]);
        }
    }
    private function select()
    {
        $this->query('SELECT * FROM Employees  LEFT  join Departments on Employees.DepartmentID=Departments.DepartmentID ');
        $this->execute();
        Arr::JsonData($this->fetchAll());
    }
    private function search()
    {
        $this->vaule = '%' . $this->vaule . '%' ;
        
        $this->query('SELECT * FROM Employees  LEFT  join Departments on Employees.DepartmentID=Departments.DepartmentID where Employees.FirstName like :FirstName or Employees.LastName like :LastName   ');
        $this->bind(':FirstName',$this->vaule);
         $this->bind(':LastName',$this->vaule);
        $this->execute();
        // print_r($this->fetchAll());
        
         Arr::JsonData($this->fetchAll());
    }
    private function delete()
    {
        $this->query('DELETE FROM Employees  WHERE EmployeeID=:EmployeeID ');
        $this->bind(':EmployeeID',$this->EmployeeID);
         if($this->execute())
        {
            Arr::Json(['success' => true]);
        }
        else
        {
             Arr::Json(['success' => false]);
        }
    }


    private function require()
    {
        if($_SERVER['REQUEST_METHOD'] === 'POST')
        {
           if($this->action === 'insert')
           {
                $this->insert();
           }elseif($this->action === 'update')
           {
                     $this->update();
           }elseif($this->action =='select')
           {
                $this->select();
           }elseif($this->action == 'search')
           {
            
            $this->search();
           }elseif($this->action == 'del')
           {
            $this->delete();
           }
        }
    }
}
$Employees= new Employees();