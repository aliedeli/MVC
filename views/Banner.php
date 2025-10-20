
    <?php
use App\Models\Session;
    
  
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }


    ?>
    
<div class="Banner-container">
            <div class="title">
Banner MANAGEMENT
        </div>
<?php  include   view_path() .'partials/banner.php'; ?>

<div class="row">
<div class="button">
    <button type="button" class="btn btn-primary" id="btn-open">Add Banner</button>

</div>

        <div class="search">
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
</div>


    <table id="Banner-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>name</th>
                <th>Actions</th>
     
            </tr>
        </thead>
        <tbody id="table-Banner">
            
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
<script src="js/banner.js"></script>
