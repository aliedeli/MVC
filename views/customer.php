<?php
use App\Models\Session;
 
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }

 ?>

<div class="Customer-container">
 <?php  include   view_path() .'partials/cutomer.php'; ?>
        <div class="title">
            Customer MANAGEMENT
        </div>
        <div class="row">
       <div class="button">
             <button type="button" class="btn btn-primary" id="btn_AddCustomer">Add Customer</button>
        </div>
     <div class="search">
        
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>

    </div>
 

    <table id="Customer-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>name</th>
                <th>address</th>
                <th>Qty Order</th>
                <th>Actions</th>
     
            </tr>
        </thead>
        <tbody id="cat-table-body">
            <!-- User rows will be populated here -->
        </tbody>
    
    </table>
    <div class="button">
        <button class="btn btn-primary " type="button" id='back'>

            back
        </button>
         <span id="page-info-user">Page 1 of 10</span>
        <button class="btn btn-primary " type="button" id='next'>

            next
        </button>


</div>
</div>



<script src="/js/customer.js"></script>
