<?php
use App\Models\Session;
 
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }

 ?>
        <div class="button"><button class="btn btn-primary " id="but-items" type="button"> new Items <samp><i class="fa-solid fa-plus"></i></samp></button>
        <button class="btn btn-primary " id="add-cat" type="button"> Add Category <samp><i class="fa-solid fa-plus"></i></samp></button>
         <button class="btn btn-primary " id="add-banner" type="button"> Add Banner <samp><i class="fa-solid fa-plus"></i></samp></button>
    </div>


    <div class="content-items" >
         <div class="search">
            <input type="text" id="search" placeholder="Search...">
            <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>

    <?php  include   base_path() .'views/partials/category.php'; ?>
    <?php  include   base_path() .'views/partials/banner.php'; ?>
     <?php   include   base_path() .'views/partials/items.php'; ?>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        name
                    </th>
                    <th>
                        cost_Price
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Discount
                    </th>
                    <th>
                        counter
                    </th>
                    <th>
                        Actions
                    </th>
                 

                </tr>

            </thead>
            <tbody id="items-tbody">
                <tr>
                    <td>
                        Price
                    </td>
                    <td>
                        500
                    </td>
                    <td>
                        600
                    </td>
                    <td>
                        1%
                    </td>
                    <td>
                        500
                    </td>
                    <td>
                        <button type="button">
                            View/Edit
                        </button>
                    </td>
                    <td>
                        <button type="button">
                            Delete
                        </button>
                    </td>
                </tr>
                 <tr>
                    <td>
                        Price3
                    </td>
                    <td>
                        500
                    </td>
                    <td>
                        600
                    </td>
                    <td>
                        1%
                    </td>
                    <td>
                        500
                    </td>
                </tr>
                 <tr>
                    <td>
                        Price4
                    </td>
                    <td>
                        500
                    </td>
                    <td>
                        600
                    </td>
                    <td>
                        1%
                    </td>
                    <td>
                        500
                    </td>
                </tr>
                 <tr>
                    <td>
                        Price
                    </td>
                    <td>
                        500
                    </td>
                    <td>
                        600
                    </td>
                    <td>
                        1%
                    </td>
                    <td>
                        500
                    </td>
                </tr>
            </tbody>

        </table>
        <div class="button">
                <button class="btn btn-primary " type="button" id='prev-page-items'>

            back
        </button>
         <span id="page-info-items">Page 1 of 10</span>
        <button class="btn btn-primary " type="button" id='next-page-items'>
            next
        </button>

       
        </div>
    </div>


    <script type="module" src="js/items.js"></script>
