<?php
use App\Models\Session;
    // Session::start();
   
  
    if (is_null(Session::get('UserID')) ) {
        header("Location: /login");
         
    }


    ?>
    <img src="" alt="">
    <div class="container">
        <div class="info">
            <div class="box-item">
                    <div class="l" >User</div>
                    <div class="c"data-table="User">500</div>
                    <div class="r">All</div> 
            </div>
           <div class="box-item">
                    <div class="l" >Order</div>
                    <div class="c"data-table="Sale">500</div>
                    <div class="r">All</div> 
            </div>
            <div class="box-item">
                    <div class="l" >Item</div>
                    <div class="c" data-table="item">500</div>
                    <div class="r">All</div> 
            </div>
             <div class="box-item">
                    <div class="l" >Customers</div>
                    <div class="c" data-table="cust">500</div>
                    <div class="r">All</div> 
            </div>
             <div class="box-item">
                    <div class="l" >Tolat Sale </div>
                    <div class="c" data-table="tolat">500</div>
                    <div class="r">All</div> 
            </div>
            
        </div>
        <div class="info">
              <div class="box-item">
                    <div class="l" > Expenses </div>
                    <div class="c" data-table="expenses">500</div>
                    <div class="r">All</div> 
            </div>
                      <!-- <div class="box-item">
                    <div class="l" > Expenses </div>
                    <div class="c" data-table="sale">500</div>
                    <div class="r">Day</div> 
            </div> -->
        </div>
    <div class="dashboard">
      <div  class="canvas" style="width: 100%; height: 100%;">
         <canvas id="myChart"></canvas>
      </div>
      <div class="board">
        
      </div>

    </div>


 
</div>

 </div>
 <script src="js/info.js"></script>
 <script  src="https://cdn.jsdelivr.net/npm/chart.js"></script>



 <script>
  let arrInfo=[]
  let infos= document.querySelectorAll('[data-table]');
      window.onload=()=>{
   const ctx = document.getElementById('myChart');
        infos.forEach(e=>{
          arrInfo.push(e.textContent)
        })
      
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Users', 'Order', 'Items', 'Customers', 'Tolat Sale', 'Expenses'],
      datasets: [{
        label: '# of Votes',
        data: arrInfo,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

      }


</script>
