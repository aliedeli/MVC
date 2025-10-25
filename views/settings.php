<div class="box-settings">
    <h2>Settings</h2>
    <form method="post" action="save_settings.php">
       <div class="row">
        <div class="input">
            <div class="icon">

            </div>
            <div class="text-name">userName</div>
            <div class="value">
                <input type="text" name="userName" value="" />
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
                <input type="email" name="email">
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
                <input type="password" name="password">
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
                <input type="password" name="password">
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