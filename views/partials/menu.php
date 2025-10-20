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
