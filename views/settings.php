<?php

use App\Models\Session;
?>
<div class="box-settings" >
    <h2>Settings</h2>
    <form method="post" id="Form">
       <div class="row">
        <div class="input">
            <div class="icon">
                <input type="text"  id="UsewrID" value="<?php echo  Session::get('UserID')?>" hidden />
            </div>
            <div class="text-name">userName</div>
            <div class="value">
                <input type="text" name="UserName" value="" id="username" value="" />
            </div>
        </div>
         </div>
        <div class="row">
        <div class="input">
            <div class="icon"></div>
            <div class="text-name">
                Email
            </div>
              <div class="value">
            
                <input type="email" name="Email" value="" id="email"/>
            </div>
        </div>
      
       </div>
       <div class="row">
          <div class="input">
            <div class="icon"></div>
            <div class="text-name">
                Password
            </div>
              <div class="value">
                <input type="password" name="new-password" id="pass" maxlength="20">
            </div>
         </div>
         </div>
            
        <div class="row">
         <div class="input">
            <div class="icon"></div>
            <div class="text-name">
                C-Password
            </div>
              <div class="value">
                <input type="password" name="C-Password" id="cpass" maxlength="20">
            </div>
        
       </div>

       </div>
         <div class="row">
          <div class="input">
                <div class="icon"></div>
                <div class="text-name">
                 Language
                </div>
                  <div class="value">
                 <select name="language">
                      <option value="en">English</option>
                      <option value="ar">العربي </option>
                      
                 </select>
                </div>
            </div>
            </div>
            <div class="button">

                <button class="btn btn-primary" type="submit">Save Changes</button>

            </div>
    </form>
</div>
<script type="module" src="/js/settings.js"></script>