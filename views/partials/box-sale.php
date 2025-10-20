
      <div class="box-sale">

            
        <div class="box-content">
            <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                        ID
                    </div>
                    <div class="value">
                        <input type="text" name="ID" id="auto-id"  >
                    </div>
                </div>
                <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                       date
                    </div>
                    <div class="value">
                        <input type="datetime-local" name="date"   >
                    </div>
                </div>
            </div>
            <div class="row">
                 <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                        CusName
                    </div>
                    <div class="value">
                        <input type="text" name="Cus-name" id="cus-name"  >
                        
                            <ul  id="list-Cutomer">
                                <li>a</li>

                            </ul>
                      
                    </div>
                </div>

                   <div class="input" >
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                    itemName
                    </div>
                    <div class="value">
                        <input type="text" name="item-name"  id='nameItem' >
                      
                            <ul class="list-items">
                                <li>a</li>
                            </ul>
                </div>
                </div>

            </div>
            <div class="row">
                
                           
                 <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                        qty
                    </div>
                    <div class="value">
                     <input type="number" name="qty" id="qty">
                    </div>
                </div>



                 <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                        cost-price
                    </div>
                    <div class="value">
                        <input type="number" name="cost-price" id="cost-price" disabled  >
                    </div>
                </div>
                

            </div>
             <div class="row">
                
                 <div class="input">
                    <div class="icon">
                        <i class="fa-light fa-id-card"></i>
                    </div>
                    <div class="name">
                        price
                    </div>
                    <div class="value">
                        <input type="number" name="price" id="price" >
                    </div>
                </div>

                    <div class="input">
                        <div class="icon">
                             <i class="fa-light fa-id-card"></i>
                        </div>
                        <div class="name">
                             discount
                        </div>
                                        <div class="value">
                               <input type="number" name="discount"   id="discount"  >
                        </div>
                    </div>
                <div class="input">
                        <div class="icon">
                             <i class="fa-light fa-id-card"></i>
                        </div>
                        <div class="name">
                             toltal:
                        </div>
                    <div class="value">
                             <samp id="toltal"></samp>
                        </div>
                    </div>
            </div>
            <div class="button" id='btn-Save'>
               
                <button class="btn btn-primary cloes" type="button"> cloes</button>
                
            </div>
        </div>


    <div class="content-table">

        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        QTY
                    </th>
                    <th>
                        Total
                    </th>
                    <th>
                        Actions
                    </th>

                </tr>
            </thead>
            <tbody id="order-table">

            </tbody>
                </table>
                
    </div>
    

    <div class="pagination">
        <button id="back-btn" class="btn btn-primary">Back</button>
        <span id="page-info">Page 1 of 10</span>
        <button id="next-btn" class="btn btn-primary">Next</button>

    </div>
    <div class="min">
    <div class="row">
        <div class="input">
            <div class="icon">
                
            </div>
            <div class="text-name">
              PaymentMethod
            </div>
            <div class="value">
                <select name="" id="Pay-Method">
                    <option value="cash">كاش</option>
                    <option value="Premium">قسط</option>
                </select>
            </div>
        </div>
          <div class="input">
            <div class="icon">
                
            </div>
            <div class="text-name">
              Amount
            </div>
            <div class="value">
                <input type="text" value="" id="Amount">
            </div>
        </div>
        <div class="button">
            <button class="btn btn-primary" id="send">
                send
            </button>
        </div>
    </div>
    <div class="total">
        <div class="name">
            Total
        </div>
        <div class="value" id="total-value">
            0.00
        </div>
    </div>
   </div>
   </div>
