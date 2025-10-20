<?php
use App\Models\Session;
//  Session::start();

    if(is_null(Session::get('UserID')))
    {

    }else{
         header('Location: /');
    }
    
?>
            <div class="login-container">
            <form  class="login-form " id="loginForm">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button class="btn btn-outline-primary" type="submit" class="login-btn">Login</button>
            </form>

         
        </div>
           <div class="message">

            </div>
        <script src="js/loing.js"></script>