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
                <li>
                    <a href="#">
                        <div class="icon">
                            <i class="fa-solid fa-gauge"></i>
                        </div>
                        <div class="text-name">
                            paeg
                        </div>
                    </a>
                    <ul>
                        <li>
                            <a href="?page=dashboard">
                                <div class="icon">
                                    <i class="fa-solid fa-house"></i>
                                </div>
                                <div class="text-name">
                                    Dashboard
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="?page=profile">
                                <div class="icon">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div class="text-name">
                                    Profile
                                </div>
                            </a>
                    </ul>
                </li>
             
                
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
