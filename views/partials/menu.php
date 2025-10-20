<?php

use App\Models\Session;

?>

    <div class="nav-left">
        
        <div class="userInfo">
            <div class="userImg">
                <img src="<?=env('App_SRC_LOGO')?>" alt="">
            </div>
            <div class="userNmae">
                <samp> Hello : </samp>
                <samp> <?= Session::get('UserName') ?> </samp>
                <p>Role : <?= Session::get('Role') ?> </p>
            </div>
        </div>
        <div class="ul">
            <ul>
                 <!-- <li><a href="\">
                      <div class="icon">
                    <i class="fa-solid fa-gauge"></i>
                </div>
                    <div class="text-name">
                        Dashboard
                    </div>
                 
                 </a>
                </li>
                <li><a href="\banner">
                          <div class="icon">
                   <i class="fa-solid fa-flag-pennant"></i>
                </div>
                    <div class="text-name">
                        Banner
                    </div>
                </a></li>
                <li><a href="\category">
                                      <div class="icon">
                   <i class="fa-solid fa-layer-group"></i>
                </div>
                    <div class="text-name">
                        Category
                    </div>
                
                </a></li>
                <li><a href="\items">
                    <div class="icon">
                  <i class="fa-light fa-table"></i>
                </div>
                    <div class="text-name">
                        items
                    </div>
                
                </a></li>
                <li><a href="/sale">
             <div class="icon">
                <i class="fa-solid fa-hands-holding-dollar"></i>
                </div>
                    <div class="text-name">
                        Sale
                    </div>
                
                </a></li>
                <li><a href="/expenses">
                    <div class="icon">
                    <i class="fa-solid fa-dollar-sign"></i>
                </div>
                    <div class="text-name">
                        Expenses
                    </div>
            </a></li>
                <li><a href="\user">
                        <div class="icon">
                 <i class="fa-duotone fa-solid fa-users"></i>
                </div>
                    <div class="text-name">
                        Users
                    </div>
                
                
                </a></li>
                <li><a href="\customer">
                           <div class="icon">
                 <i class="fa-duotone fa-solid fa-users"></i>
                </div>
                    <div class="text-name">
                        Customer
                    </div>
                
                </a></li>

        <li><a href="\employees">
                           <div class="icon">
                 <i class="fa-duotone fa-solid fa-users"></i>
                </div>
                    <div class="text-name">
                        Employees
                    </div>
                
                </a></li> -->

                
            </ul>
        </div>
        <div class="out">
            <a href="?out">
    
                           <div class="icon">
                <i class="fa-solid fa-right-from-bracket"></i>
                </div>
                    <div class="text-name">
                        LogOut
                    </div>
                </a>
        </div>
    </div>
