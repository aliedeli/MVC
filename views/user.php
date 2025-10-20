<?php
use App\Models\Session;
    if(is_null(Session::get('UserID')))
    {
         header('Location: /login');
    }

?>

<?php include   base_path()  . 'views/partials/user.php'; ?>
<div class="User-container">
    
        <div class="title">
            USER MANAGEMENT
        </div>
<div class="row">
       
<div class="button">
    <button type="button" class="btn btn-primary" id="Add-User">Add User</button>

</div>
        <div class="search">
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>

 </div>
    <table id="user-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="user-table-body">
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



<script src="js/user.js"></script>
