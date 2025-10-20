<div class="Add-user-container">
    <div class="tiltle">
        <h1>Add User</h1>   
    </div>
    <form  id="addUserForm">
        <div class="form-group">
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="name">
                    USERNAME
                </div>
                <div class="input">
                    <input type="text" name="UserName" placeholder="Enter username" id='username'>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div class="text-name">
                    PASSWORD
                </div>
                <div class="input">
                    <input type="password" name="new-password" placeholder="Enter password">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div class="text-name">
                    C_PASSWORD
                </div>
                <div class="input">
                    <input type="password" name="C-Password" placeholder="Confirm password">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-user-shield"></i>
                </div>
                <div class="text-name">
                    ROLE
                </div>
                <div class="input">
                    <select name="role" id="role">
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="text-name">
                    EMAIL
                </div>
                <div class="input">
                    <input type="email" name="Email" placeholder="Enter email">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-phone"></i>
                </div>
                <div class="text-name">
                    PHONE
                </div>
                <div class="input">
                    <input type="text" name="Phone" placeholder="Enter phone number">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="input">
                <div class="icon">
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="text-name">
                    ADDRESS
                </div>
                <div class="input">
                    <input type="text" name="Address" placeholder="Enter address">
                </div>
            </div>
        </div>
        <div class="button">
             <button class="btn btn-secondary" type="button" id="cancel">Cancel</button>
            <button class="btn btn-primary" type="submit">Add User</button>
           
        </div>
        </div>
    </form>
</div>
