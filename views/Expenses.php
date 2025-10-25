  <?php

    use App\Models\Session;
    // Session::start();


    if (is_null(Session::get('UserID'))) {
        header("Location: /login");
    }


    ?>

  <div class="content-expenses">
      <div class="app-expnese">
          <form>

              <div class="row">
                  <div class="input">
                      <div class="icon">
    ❓
                      </div>
                      <div class="text-name">
                          ExpenseName
                      </div>
                      <div class="value">
                          <input type="text" name="name">
                      </div>
                  </div>
                  <div class="input">
                      <div class="icon">
    💲
                      </div>
                      <div class="text-name">
                          AmountPaid
                      </div>
                      <div class="value">
                          <input type="text" name="AmountPaid">
                      </div>
                  </div>
              </div>

              <div class="buttton">
                  <button type="button" class="btn btn-primary Cloes" > Cloes</button>
                  <button type="submit" class="btn btn-primary"> Submit</button>
              </div>
          </form>
      </div>
      <div class="title">
          Expenses MANAGEMENT
      </div>
      <div class="row">

          <div class="button">

              <button type="button" class="btn btn-primary" id="Add-Expenses">Add Expenses</button>

          </div>
          <div class="search">
              <input type="text" id="search" placeholder="Search...">
              <button class="btn btn-primary" id="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>

      </div>
      <table id="expense-table">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>ExpenseName</th>
                  <th>AmountPaid</th>
                  <th>Date</th>

                  <th>Actions</th>
              </tr>
          </thead>
          <tbody id="ex-table-body">
              <!-- User rows will be populated here -->
          </tbody>

      </table>
      <div class="button">
          <button class="btn btn-primary " type="button" id='back'>

              back
          </button>
          <span id="page-info">Page 1 of 10</span>
          <button class="btn btn-primary " type="button" id='next'>

              next
          </button>


      </div>

  </div>
  <script type="module" src="js/expenses.js"></script>