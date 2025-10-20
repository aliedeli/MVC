const btn_add = document.getElementById('btn_AddCustomer');
const box_add = document.querySelector('.add-cutomer');
const btn_close = box_add.querySelector('.Close');
const FormCustomer = document.getElementById('customer-form');
const tableCustomer = document.getElementById('cat-table-body');
const search = document.getElementById('searchCustomer');
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
 getitmes()

function getitmes()
{
FormSubmit('select', Url, '', '').then((data) => {
        let page= new paginationViewCutomer()
        page.array=data;
        page.body=tableCustomer;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();
})
}

function FormSubmit(type,url,data,form){
   return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
            xhr.open('POST',url,true);
            console.log(xhr.responseText);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && xhr.status===200){
             
                resolve(JSON.parse(xhr.response));
            }else{
                // reject('Error');
            }

        }
        


            let dataSend = new FormData(form || undefined);
         if(Array.isArray(data)){
            data.forEach((item)=>{
                for(let key in item){
                    dataSend.append(key,item[key]);
                }
            })

        }

        
            dataSend.append('type',type);
        xhr.send(dataSend);

   
    })
  
}

class paginationViewCutomer  
{
    constructor()
    {
        this.start=0
        this.end=0
        this.currentPage=1
        this.totalPage=0
        this.hasNext=null
        this.hasPrev=null
        this.array=[]
        this.itemsPage=10
        this.nameClass='';
        this.body=null;
     
        
    }
    displayPage()
    {
         this.totalPage=  Math.ceil(this.array.length / this.itemsPage)
        this.nameClass= this.nameClass || 'Sale'
        this.start=(this.currentPage -1) * this.itemsPage
        this.end=this.start + this.itemsPage
        this.view()
    }
    button()
    {
                this.hasNext.addEventListener('click',()=>{
            if(this.hasNext && this.currentPage < this.totalPage)
            {
                this.currentPage++  
                this.start=(this.currentPage -1) * this.itemsPage
                this.end=this.start + this.itemsPage
                this.view()
            }
          
            console.log(this.currentPage,this.totalPage)


            })
               this.hasPrev.addEventListener('click',()=>{
              
            if(this.hasPrev && this.currentPage > 1)
            {
                this.currentPage--  
                this.start=(this.currentPage -1) * this.itemsPage
                this.end=this.start + this.itemsPage
                this.view()
            }})

    }
    view()
    {
        console.log(this.array);
        document.getElementById('page-info-user').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=   new Customer(item,++index)
            n.innerHTML()
       })
     
    }





}



class Customer{
    constructor(data,index){
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