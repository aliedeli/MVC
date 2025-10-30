import {primaryID,message,FormSubmit,paginationView}from './min.js'
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
    

    FormSubmit('insert',url,'',fromDate).then((data) =>{

        if(data.success){

           document.querySelectorAll('input').forEach(input => input.value = '');
            message('success-message','create user success  ')
              inputname.focus();
           loadUsers()
        }else{
             message('error-message','create user not success   ')
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
        FormDat.append('action', 'Roles');
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

    
    FormSubmit('search',url,[{search:e}],'').then((response) =>{

      console.log(response)
    let paginationUser= new paginationView()
        paginationUser.nameClass= new User()
        paginationUser.array=response
        paginationUser.body=document.getElementById('user-table-body');
        paginationUser.hasNext=document.getElementById('next')
        paginationUser.hasPrev=document.getElementById('back')
        paginationUser.itemsPage=12
        paginationUser.pageinfo=document.getElementById('page-info-user')
        paginationUser.displayPage()
        paginationUser.button()
    })
}


function  loadUsers(){


    FormSubmit('select',url,'','').then((response) =>{
      

    let paginationUser= new paginationView()
        paginationUser.nameClass= new User()
        paginationUser.array=response
        paginationUser.body=document.getElementById('user-table-body');
        paginationUser.hasNext=document.getElementById('next')
        paginationUser.hasPrev=document.getElementById('back')
        paginationUser.itemsPage=12
        paginationUser.pageinfo=document.getElementById('page-info-user')
        paginationUser.displayPage()
        paginationUser.button()
    })
}





class User{
    constructor(){
    
        this.ID ;
        this.Name;
        this.Role;
        this.TypeID;
        this.Email ;
        this.Phone ;
        this.Password;
        this.Address ;
        this.Status ;
        this.index ;
        
    }
    input(data,index)
    {
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
            values2.name='new-password'
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


            FormSubmit('Roles',url,'','').then((data)=>{
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

       let input7=document.createElement('div')
            input7.className='input'
        let icon7=document.createElement('div')
            icon7.className='icon'
            icon7.innerHTML='<i class="fa-solid fa-user-shield"></i>'
        let textName7=document.createElement('div')
            textName7 .className='text-name'
            textName7.textContent='Status'
        let value7= document.createElement('div')
            value7.className='input'
        let values7=document.createElement('select')
            values7.name='Status'
         let option1 = document.createElement('option')
            option1.value='Active'
            option1.textContent='Active'
            option1.setAttribute('selected',true)
          let option2 = document.createElement('option')
            option2.value='not'
            option2.textContent='not'


input1.appendChild(icon1)
input1.appendChild(textName1)
value1.appendChild(values1)
input1.appendChild(value1)

row1.appendChild(input1)




values7.appendChild( option1)
values7.appendChild( option2)
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
let row7=document.createElement('div')
    row7.className='row'
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

input7.appendChild(icon7)
input7.appendChild(textName7)
input7.appendChild(values7)
value7.appendChild(input7)
row7.appendChild(input7)

button.append(btnSav,btnCancel)

formGroup.appendChild(row1)
formGroup.appendChild(row2)
formGroup.appendChild(row3)
formGroup.appendChild(row4)
formGroup.appendChild(row5)
formGroup.appendChild(row6)
formGroup.appendChild(row7)
formGroup.appendChild(button)




FormUser.appendChild(formGroup)
divUser.appendChild(FormUser)

 box_User_Add.parentElement.append(divUser)
        

    FormUser.addEventListener('submit',(e)=>{
         e.preventDefault() 
        FormSubmit('update',url,[{UserID:this.ID}],FormUser).then(data=>{
            console.log(data)
        })
    })


    }
    Aesix()
    {

    }

    
}

class RoleScreene
{
    constructor()
    {
        this.UserID;
        this.ScrID;
        this.name;
        this.view;
        this.edit;
        this.delete;
        this.index;
    }
    input(data,index)
    {
        this.UserID=data.UserID;
        this.ScrID=data.ScrID;
        this.view=data.views;
        this.edit=data.Edit;
        this.delete=data.dele
        this.index=index;
    }
    innerHTML()
    {
        let tr=document.createElement('tr')
        let ID=document.createElement('td')
        let name=document.createElement('td')
        let view=document.createElement('td')
        let edit=document.createElement('td')
        let dele=document.createElement('td')

        let btnview=document.createElement('button')
            btnview.className='btn btn-primary'
            btnview.type='button'
            btnview.innerHTML='<i class="fa-solid fa-eye"></i>'
        let btnEdit=document.createElement('button')
            btnEdit.className='btn btn-primary'
            btnEdit.type='button'
            btnEdit.innerHTML=' <i class="fa-solid fa-pen-to-square"></i>'
        let btnDele=document.createElement('button')
            btnDele.className='btn btn-danger'
            btnDele.type='button'
            btnDele.innerHTML=' <i class="fa-solid fa-trash"></i>'



    }


}
loadUsers();