const fromDate = document.getElementById('addUserForm');
const inputname = document.getElementById('username');
const box_User_Add= document.querySelector('.Add-user-container');
const btn_Add= document.getElementById('Add-User');
const btn_cancel= document.getElementById('cancel');
const search = document.getElementById('search')
const Roles= document.getElementById('role')
btn_cancel.addEventListener('click', () =>{
    box_User_Add.classList.remove('active');
});
const url = '/Add/user';

btn_Add.addEventListener('click', () =>{
    box_User_Add.classList.add('active');
    inputname.focus();
    GetRoles()
});

search.addEventListener('input',(e)=>{
    if(e.target.value != "" )
    {
        searchUsers(e.target.value)
    }

    
     loadUsers()
})

fromDate.addEventListener('submit', (e) =>{
    e.preventDefault();
    let mypriomise =new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onreadystatechange=()=>{

            if(xhr.readyState === 4 && xhr.status === 200){
            
                resolve(JSON.parse(xhr.response) );
            }else{
               
            }

        }
        let Data = new FormData(fromDate);
            Data.append('type', 'insert');
        xhr.send(Data);

    })
    
    mypriomise.then((r) =>{
       
        if(r[0]){
           document.querySelectorAll('input').forEach(input => input.value = '');
              inputname.focus();
           loadUsers()
        }
    })
});

function GetRoles()
{
    mypriomise = new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () =>{
           
            if(xhr.readyState === 4 && xhr.status === 200){
             
                 resolve(JSON.parse(xhr.response));
            }else{
                // reject('error');
            }
        }
        let FormDat= new FormData();
        FormDat.append('type', 'Roles');
        xhr.send(FormDat);
    }).then((data)=>{
        Roles.innerHTML=""
        data.forEach(e=>{
                let r= new Role(e)
                    r.innerHTML()
        })
    })

    



    
    




    
}

class Role
{
    constructor(data)
    {
        this.ID=data.RoleID;
        this.name=data.RoleName

    }
    innerHTML()
    {
        let option=document.createElement('option')
            option.value=this.ID
            option.textContent=this.name

            Roles.appendChild(option)
        }
}




function  searchUsers(e)
{
 mypriomise = new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () =>{
           
            if(xhr.readyState === 4 && xhr.status === 200){
           
                 resolve(JSON.parse(xhr.response));
            }else{
                // reject('error');
            }
        }
        let FormDat= new FormData();
        FormDat.append('type', 'search');
        FormDat.append('type', 'select');
        xhr.send(FormDat);
    }).then((response) =>{
      

        let paginationUser=new paginationViewUser()
        paginationUser.array=response
        paginationUser.body=document.getElementById('user-table-body');
        paginationUser.hasNext=document.getElementById('next')
        paginationUser.hasPrev=document.getElementById('back')
        paginationUser.itemsPage=12
        paginationUser.displayPage()
        paginationUser.button()
    })
}


function  loadUsers(){

     mypriomise = new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () =>{
       
            if(xhr.readyState === 4 && xhr.status === 200){
           
                 resolve(JSON.parse(xhr.response));
            }else{
                // reject('error');
            }
        }
        let FormDat= new FormData();
        FormDat.append('type', 'select');
        xhr.send(FormDat);
    }).then((response) =>{
      

        let paginationUser=new paginationViewUser()
        paginationUser.array=response
        paginationUser.body=document.getElementById('user-table-body');
        paginationUser.hasNext=document.getElementById('next')
        paginationUser.hasPrev=document.getElementById('back')
        paginationUser.itemsPage=12
        paginationUser.displayPage()
        paginationUser.button()
    })
}
loadUsers();


class paginationViewUser
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
        document.getElementById('page-info-user').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=   new User(item,++index)
            n.innerHTML()
       })
     
    }





}


class User{
    constructor(data , index){
    
        this.ID = data.UserID;
        this.Name = data.UserName;
        this.Role= data.RoleName;
        this.TypeID= data.TypeID;
        this.Email = data.Email;
        this.Phone = data.phone;
        this.Password = data.Password;
        this.Address = data.Address;
        this.Status = data.Status;
        this.index = index;
        
    }
    innerHTML(){
        let tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${this.index}</td>
        <td>${this.Name}</td>
        <td>${this.Role}</td>
        <td>${this.Email}</td>
        <td>${this.Phone}</td>
        <td>${this.Address}</td>
        

      
        <td>${this.Status}</td>
       
        </td>
        `;
        let actionTd = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.className = 'btn btn-primary';
        editButton.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerHTML='<i class="fa-solid fa-trash"></i>';
        actionTd.appendChild(editButton);
        actionTd.appendChild(deleteButton);
        tr.appendChild(actionTd);
       
        document.getElementById('user-table-body').appendChild(tr);
        deleteButton.addEventListener('click', () => this.dele(this));
        editButton.addEventListener('click', () => this.edit(this));
        
    }
    dele()
    {
        this.fetchData('del').then((data) =>{
            if(data[0]){
                
                loadUsers();
            }
        })

    }
    edit()
    {
        let divUser=document.createElement('div')
            divUser.className='Edit-user-container'
        let FormUser=document.createElement('form')
        let formGroup=document.createElement('div')
            formGroup.className='form-group'
        let row1=document.createElement('div')
            row1.className='row'
        let input1=document.createElement('div')
            input1.className='input'
        let icon1=document.createElement('div')
            icon1.className='icon';
            icon1.innerHTML='<i class="fa-solid fa-user"></i>';
        let textName1=document.createElement('div')
             textName1.className='text-name';
             textName1.textContent='UserName'
        let value1= document.createElement('div')
            value1.className='input'
        let values1=document.createElement('input')
            values1.type='text'
            values1.name='UserName'
            values1.value=this.Name

        let input2=document.createElement('div')
            input2.className='input'
        let icon2=document.createElement('div')
            icon2.className='icon'
            icon2.innerHTML='<i class="fa-solid fa-lock"></i>'
        let textName2=document.createElement('div')
         textName2.className='text-name'
            textName2.textContent='Password'
        let value2= document.createElement('div')
            value2.className='input'
        let values2=document.createElement('input')
            values2.type='password'
            values2.name='password'
            values2.value=this.Password

        let input3=document.createElement('div')
            input3.className='input'
        let icon3=document.createElement('div')
            icon3.className='icon'
            icon3.innerHTML='<i class="fa-solid fa-envelope"></i>'
        let textName3=document.createElement('div')
             textName3.className='text-name'
            textName3.textContent='EMAIL'
        let value3= document.createElement('div')
            value3.className='input'
        let values3=document.createElement('input')
            values3.type='email'
            values3.name='Email'
            values3.value=this.Email

        let input4=document.createElement('div')
            input4.className='input'
        let icon4=document.createElement('div')
            icon4.className='icon'
            icon4.innerHTML='<i class="fa-solid fa-phone"></i>'
        let textName4=document.createElement('div')
              textName4.className='text-name'
            textName4.textContent='PHONE'
        let value4= document.createElement('div')
            value4.className='input'
        let values4=document.createElement('input')
            values4.type='text'
            values4.name='Phone'
            values4.value=this.Phone

        let input5=document.createElement('div')
            input5.className='input'
        let icon5=document.createElement('div')
            icon5.className='icon'
            icon5.innerHTML='<i class="fa-solid fa-location-dot"></i>'
        let textName5=document.createElement('div')
            textName5.className='text-name'
            textName5.textContent='ADDRESS'
        let value5= document.createElement('div')
            value5.className='input'
        let values5=document.createElement('input')
            values5.type='text'
            values5.name='Address'   
            values5.value= this.Address 


        let input6=document.createElement('div')
            input6.className='input'
        let icon6=document.createElement('div')
            icon6.className='icon'
            icon6.innerHTML='<i class="fa-solid fa-user-shield"></i>'
        let textName6=document.createElement('div')
            textName6 .className='text-name'
            textName6.textContent='ROLES'
        let value6= document.createElement('div')
            value6.className='input'
        let values6=document.createElement('select')
            values6.name='role'



            mypriomise = new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onreadystatechange = () =>{
           
            if(xhr.readyState === 4 && xhr.status === 200){
             
                 resolve(JSON.parse(xhr.response));
            }else{
                // reject('error');
            }
        }
        let FormDat= new FormData();
        FormDat.append('type', 'Roles');
        xhr.send(FormDat);
    }).then((data)=>{
        values6.innerHTML=""
        data.forEach(e=>{
              let option = document.createElement('option')
              if(this.Role === e.RoleName)
              {
                option.setAttribute('selected',true)
              }
                option.value=e.RoleID
                option.textContent=e.RoleName
                values6.appendChild(option)

        })
    })

input1.appendChild(icon1)
input1.appendChild(textName1)
value1.appendChild(values1)
input1.appendChild(value1)

row1.appendChild(input1)




let row2=document.createElement('div')
row2.className='row'
let row3=document.createElement('div')
row3.className='row'
let row4=document.createElement('div')
row4.className='row'
let row5=document.createElement('div')
row5.className='row'
let row6=document.createElement('div')
row6.className='row'
let button=document.createElement('div')
button.className='button'

let btnSav=document.createElement('button')
    btnSav.className='btn btn-primary'
    btnSav.type='submit'
    btnSav.textContent='Save'
let btnCancel=document.createElement('button')
    btnCancel.className='btn btn-primary'
    btnCancel.type='button'
    btnCancel.textContent='Cancel'

    btnCancel.addEventListener('click',()=>divUser.remove())


input2.appendChild(icon2)
input2.appendChild(textName2)
value2.appendChild(values2)
input2.appendChild(value2)


row2.appendChild(input2)

input3.appendChild(icon3)
input3.appendChild(textName3)
value3.appendChild(values3)
input3.appendChild(value3)

row3.appendChild(input3)


input4.appendChild(icon4)
input4.appendChild(textName4)
value4.appendChild(values4)
input4.appendChild(value4)
row4.appendChild(input4)

input5.appendChild(icon5)
input5.appendChild(textName5)
value5.appendChild(values5)
input5.appendChild(value5)
row5.appendChild(input5)


input6.appendChild(icon6)
input6.appendChild(textName6)
input6.appendChild(values6)
value6.appendChild(input6)
row6.appendChild(input6)

button.append(btnSav,btnCancel)

formGroup.appendChild(row1)
formGroup.appendChild(row2)
formGroup.appendChild(row3)
formGroup.appendChild(row4)
formGroup.appendChild(row5)
formGroup.appendChild(row6)
formGroup.appendChild(button)




FormUser.appendChild(formGroup)
divUser.appendChild(FormUser)

 box_User_Add.parentElement.append(divUser)
        

    FormUser.addEventListener('submit',()=>{
         form.preventDefault() 
         this.fetchData('edit').then((data) =>{
            if(data.success){
               
                loadUsers();
            }
        })
       
    })


    }
    fetchData(type ,form){
        
        return new Promise((resolve, reject) =>{
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onreadystatechange=()=>{
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(JSON.parse(xhr.response) );
                }else{
                     
                }
            }
            let Data = new FormData(form || null);
                Data.append('type', type);
                Data.append('UserID', this.ID);
            xhr.send(Data);
        });
    }

    
}
