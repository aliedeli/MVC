<?php
use App\Models\Session;
 
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }

 ?>


    <div class="content-sale">
        <div class="row">
     <div class="button">
    <button type="button" class="btn btn-primary " id="Add-sale">NEW Order</button>
   </div>
          <div class="search">
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
                <div class="input">
                <input type="date" name="date" id="search-date">
            </div>
       
        </div>
        
        </div>
      
     <?php include   base_path() .'views/partials/box-sale.php'; ?>
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Date
                    <th>
                        CusName
                    </th>
                    <th>
                        talot
                    </th>
                    <th>
                        Actions
                    </th>
               
                </tr>
            </thead>
            <tbody id='tbody-sale'>

            </tbody>
          
        </table>
        
          <div class="button">
             <button class="btn btn-primary " type="button" id='back'>

            back
        </button>
         <span id="page-info-sale">Page 1 of 10</span>
        <button class="btn btn-primary " type="button" id='next'>

            next
        </button>
         
        </div>
    </div>

   <script src="js/sale.js"></script> 
