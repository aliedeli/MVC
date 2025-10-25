import {primaryID,FormSubmit,paginationView}from './min.js'
const btn_add = document.getElementById('btn_AddCustomer');
const box_add = document.querySelector('.add-cutomer');
const btn_close = box_add.querySelector('.Close');
const FormCustomer = document.getElementById('customer-form');
const tableCustomer = document.getElementById('cat-table-body');
const search = document.getElementById('search');
const nameC=document.getElementById('name')

const Url = '/Add/Cutomer';
btn_add.addEventListener('click', () => {
    box_add.classList.toggle('active');
});

btn_close.addEventListener('click', () => {
    box_add.classList.remove('active');
});

FormCustomer.addEventListener('submit', (e) => {
    e.preventDefault();
    FormSubmit('insert', Url, '', FormCustomer).then((data) => {
        if(data.success)
        {
            FormCustomer.querySelectorAll('input').forEach(e=>e.value='');
             getitmes()
        }
        
    })
})
   document.addEventListener('keydown',(e)=>{
    if(e.key == 'F1')
    {
        e.preventDefault()
        box_add.classList.add('active');
        nameC.focus();
         
    }
    
})
   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
         box_add.classList.remove('active');
         
    }
    
})
search.addEventListener('input',(e)=>{
    let filter=e.target.value
    FormSubmit('search', Url, [{name:filter}], '').then((data) => {
    let page= new paginationView()
        page.array=data;
        page.body=tableCustomer;
        page.nameClass = new Customer();
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.pageinfo=document.getElementById('pageinfo');
        page.displayPage();
        page.button();
    
    })
})
 getitmes()

function getitmes()
{
FormSubmit('select', Url, '', '').then((data) => {
        let page= new paginationView()
        page.array=data;
        page.body=tableCustomer;
        page.nameClass = new Customer();
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.pageinfo=document.getElementById('pageinfo');
        page.displayPage();
        page.button();
})
}






class Customer{
    constructor(){
        this.id ;
        this.name ;
        this.address ;
        this.phone ;
        this.email ;
        this.QtyOrder ;
        this.type  ;
        this.index;
       
    }
    input(data,index)
    {
        this.id = data.customersID 
        this.name = data.name
        this.address = data.address 
        this.phone = data.phone 
        this.email = data.Email
        this.QtyOrder = data.QtyOrder || 0  ;
        this.type = data.type 
        this.index=index
    }
    innerHTML(){
        let tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${this.index}</td>
        <td>${this.name}</td>
        <td>${this.address}</td>
        <td>${this.QtyOrder}</td>    
       `;
        let btnEdit = document.createElement('button');
        btnEdit.className = 'btn-edit';
        btnEdit.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';

        let btnDelete = document.createElement('button');
        btnDelete.className = 'btn-delete';
        btnDelete.innerHTML='<i class="fa-solid fa-trash"></i>';
        let td = document.createElement('td')
        
        td.appendChild(btnEdit);
        td.appendChild(btnDelete);
        tr.appendChild(td);
        tableCustomer.appendChild(tr);
      
        btnDelete.addEventListener('click',()=>{
            this.delete();
        });
        btnEdit.addEventListener('click',()=>{
            this.edit();
        }); 

    }
    delete(){
        if(confirm('Are you sure to delete this customer?')){
            let data = [{ CusID: this.id }];
            FormSubmit('delete', Url, data, '').then((response) => {
                    if(response.success)
                    {
                        getitmes()
                    }
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }
    edit(){
        let div=document.createElement('div');
            div.className='add-cutomer active '
        let form=document.createElement('form')
            form.innerHTML=`
             <div class="form-group">
            <h2>Add Customer</h2>
            <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        <label for="">Customer Name</label>
                    </div>
                    <div class="value">
                        <input type="text" name="name"   value="${this.name}">
                    </div>
                </div>
           
        </div>
        <div class="row">
                 <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <div class="text-name">
                        <label for="">Phone Number</label>
                    </div>
                    <div class="value">
                        <input type="text" name="phone"  value="${this.phone}" >
                    </div>

            </div>
        </div>
                <div class="row">
                 <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-at"></i>
                    </div>
                    <div class="text-name">
                        <label for="">E-mail</label>
                    </div>
                    <div class="value">
                        <input type="email" name="email"  value="${this.email}">
                    </div>

            </div>
        </div>
                <div class="row">
                 <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div class="text-name">
                        <label for="">Address</label>
                    </div>
                    <div class="value">
                        <input type="text" name="address" value="${this.address}" >
                    </div>

            </div>
        </div>
        
            <div class="button">
                <button type="button" class='btn btn-primar Close'> Close</button>
                <button type="submit" class="btn btn-primar">Add Customer</button>
            </div>
        
        </div>
            `
        div.appendChild(form)
        let cloes=form.querySelector('.Close')
        box_add.parentElement.appendChild(div)
        cloes.addEventListener('click',()=>div.remove())
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
         FormSubmit('update', Url, [{ CusID: this.id }], form).then((response) => {
                    if(response.success)
                    {
                        getitmes()
                    }else{

                    }

            }).catch((error) => {
                console.error('Error:', error);
            });
    })
    
   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
        div.remove()
    }
    
})
    }
}