<?php
use App\Models\Session;
 
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }

 ?>


    <div class="content-Employees">
        <div class="row">
     <div class="button">
    <button type="button" class="btn btn-primary " id="Add-Department"> Departments</button>
    <button type="button" class="btn btn-primary " id="Add-Employees"> Employees</button>
    <!-- <button type="button" class="btn btn-primary " id="Add-sale">NEW Employees</button> -->
   </div>
          <div class="search">
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
            
       
        </div>
        
        </div>
      
      <?php
       include   base_path() .'views/partials/Departments.php';
    include   base_path() .'views/partials/Employees.php';
      
      ?>
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                       Name
                    <th>
                        Departments
                    </th>
                    <th>
                        Salary
                    </th>
                  
                    <th>
                        Actions
                    </th>
               
                </tr>
            </thead>
            <tbody id='tbody-Employees'>

            </tbody>
          
        </table>
        
     <div class="button">
             <button class="btn btn-primary " type="button" id='back'>

            back
        </button>
         <span id="page-info">Page 1 of 10</span>
        <button class="btn btn-primary " type="button" id='next'>

            next
        </button>
         
        </div>
    </div>


<script src="js/employees.js"></script>