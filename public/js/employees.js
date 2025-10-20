const formEmployees=document.getElementById('form-Employees');
const formDepartment=document.getElementById('form-Department');
const boxAddEmployees=document.querySelector('.Employees');
const boxAddDepartment=document.querySelector('.Departments');
const btnOpneEmployees=document.getElementById('Add-Employees');
const btnCloesEmployees=boxAddEmployees.querySelector('.Cloes');
const btnOpneDepartment=document.getElementById('Add-Department');
const btnCloesDepartment=boxAddDepartment.querySelector('.Cloes');
const Department=document.getElementById('Department');
const Tbody=document.getElementById('tbody-Employees');
const search=document.getElementById('search')

const UrlEmployees='/Add/Employees'
const UrlDepartments='/Add/Department'


btnOpneDepartment.addEventListener('click',()=>boxAddDepartment.classList.add('active'))
btnOpneEmployees.addEventListener('click',()=>boxAddEmployees.classList.add('active'))
btnCloesEmployees.addEventListener('click',()=>boxAddEmployees.classList.remove('active'))
btnCloesDepartment.addEventListener('click',()=>boxAddDepartment.classList.remove('active'))

formEmployees.addEventListener('submit',(e)=>{
    e.preventDefault(); 
FormSubmit('insert', UrlEmployees, '', formEmployees).then((data) => {
        if(data.success)
        {
        formEmployees.querySelectorAll('input').forEach(e=>e.value="");
        getItmes()
        }
})
})

   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
        boxAddEmployees.classList.remove('active')
        boxAddDepartment.classList.remove('active')

    }
    
})
formDepartment.addEventListener('submit',(e)=>{
e.preventDefault(); 
FormSubmit('insert', UrlDepartments, '', formEmployees).then((data) => {
    if(data.success)
    {
        boxAddEmployees.querySelectorAll('input').forEach(e=>e.value='');
        
        
    }
})
})

search.addEventListener('input',e=>{
    if(e.target.value)
    {
        FormSubmit('search', UrlEmployees, [{search:e.target.value}], '').then((data) => {
        let pagin=new paginationView()
            pagin.nameClass='Employees'
            pagin.body=Tbody
            pagin.array=data
            pagin.hasNext=document.getElementById('next')
            pagin.hasPrev=document.getElementById('back')
            pagin.itemsPage=8
            pagin.displayPage()
            pagin.button()
})
    }else{
        getItmes()
    }
})

function FormSubmit(action,url,data,form){
    
   return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
            xhr.open('POST',url,true);
 
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

        }else if(action == 'search'){
            dataSend.append('search',data);
        }

         
            dataSend.append('action',action);
        xhr.send(dataSend);

   
    })
  
}

FormSubmit('select', UrlDepartments, '', '').then((data) => {
    data.forEach(e=>{
        let option=document.createElement('option')
            option.value=e.DepartmentID;
            option.textContent=e.DepartmentName;
        Department.appendChild(option);
    })
})
getItmes()
function getItmes(){
FormSubmit('select', UrlEmployees, '', '').then((data) => {
   
        let pagin=new paginationView()
            pagin.nameClass='Employees'
            pagin.body=Tbody
            pagin.array=data
            pagin.hasNext=document.getElementById('next')
            pagin.hasPrev=document.getElementById('back')
            pagin.itemsPage=8
            pagin.displayPage()
            pagin.button()
    
})

}


class paginationView
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
        document.getElementById('page-info').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=   new Employees(item,++index)
            n.innerHTML()
       })
     
    }





}

class Employees
{
  constructor(data,index )
  {
        this.EmployeeID=data.EmployeeID
        this.FirstName=data.FirstName
        this.LastName=data.LastName
        this.DateOfBirth=data.DateOfBirth
        this.Gender=data.Gender
        this.HireDate=data.HireDate
        this.DepartmentID=data.DepartmentID
        this.Location=data.Location
        this.DepartmentName=data.DepartmentName
        this.JobTitleID=data.JobTitleID
        this.Salary=data.Salary
        this.Email=data.Email
        this.Phone=data.Phone
        this.Addres=data.Address
        this.index=index
      

  }  

  innerHTML()
  {
    let tr=document.createElement('tr')
        tr.innerHTML=`
        <td> ${this.index}</td>
        <td> ${this.FirstName + this.LastName}</td>
        <td> ${this.DepartmentName}</td>
         <td> ${this.Salary}</td>
        `
    let td=document.createElement('td')
    let btnEdit=document.createElement('button')
            btnEdit.type='button'
            btnEdit.classList='btn btn-primary '
            btnEdit.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
    let btnDele=document.createElement('button')
            btnDele.type='button'
            btnDele.classList='btn btn-primary '
            btnDele.innerHTML='<i class="fa-solid fa-trash"></i>';

    td.appendChild(btnEdit)
    td.appendChild(btnDele)
    tr.appendChild(td)
    Tbody.appendChild(tr)
    btnEdit.addEventListener('click',_=>this.update(this))
    btnDele.addEventListener('click',_=>this.delete(this))

  }
  update()
  {
   let divUpdate=document.createElement('div');
        divUpdate.className='Employees-up'
    let formUpdate=document.createElement('form')
        formUpdate.innerHTML=`
           <div class="form-group">
            <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        FirstName
                    </div>
                    <div class="value">
                        <input type="text" name="FirstName" value='${this.FirstName}'>
                    </div>
                </div>
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        LastName
                    </div>
                    <div class="value">
                        <input type="text" name="LastName" value='${this.LastName}'>
                    </div>
                </div>
            </div>
                 <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                    <div class="text-name">
                        HireDate
                    </div>
                    <div class="value">
                        <input type="date" name="HireDate" value='${this.HireDate}'>
                    </div>
                </div>
            <div class="input">
                                <div class="icon">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div class="text-name">
                                    DateOfBirth
                                </div>
                                <div class="value">
                                    <input type="date" name="DateOfBirth"value='${this.DateOfBirth}'>
                                </div>
                            </div>


            </div>
                        <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        Email
                    </div>
                    <div class="value">
                        <input type="text" name="Email"value='${this.Email}'>
                    </div>
                </div>
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        Phone
                    </div>
                    <div class="value">
                        <input type="text" name="Phone" value='${this.Phone}'>
                    </div>
                </div>
            </div>
             <div class="row">
                
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-money-from-bracket"></i>
                    </div>
                    <div class="text-name">
                        Salary
                    </div>
                    <div class="value">
                        <input type="text" name="Salary" value='${this.Salary}'>
                    </div>
                </div>
               
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        Gender
                    </div>
                    <div class="value">
                        <select name="Gender" >
                          ${this.Gender == 'M' ? '<option value="M" select>Male</option>' + '<option value="F" >Female</option>': '<option value="F" select >Female</option>'  +'<option value="M" select>Male</option>'}
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        Address
                    </div>
                    <div class="value">
                        <input type="text" name="Address"  value='${this.Addres}'>
                    </div>
                </div>
                  <div class="input">
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="text-name">
                        Department
                    </div>
                    <div class="value" id='up-Department' >
                        <select name="DepartmentID" id="Department-up">
                            
                       
                        </select>
                    </div>
                </div>
            </div>
           
            </div>
        
        <div class="button">
            <button class="btn btn-primary btn-Coles" type="button">Cloes</button>
            <button class="btn btn-primary" type="submit">submit</button>
        </div>
        `

divUpdate.appendChild(formUpdate);
        formEmployees.parentElement.parentElement.appendChild(divUpdate)
        let btnColes=formUpdate.querySelector('.btn-Coles')
            btnColes.addEventListener('click',()=>divUpdate.remove())

    FormSubmit('select', UrlDepartments, '', '').then((data) => {
    data.forEach(e=>{
        
        let option=document.createElement('option')

            if(e.DepartmentID == this.DepartmentID)
            {
            option.value=e.DepartmentID;
            option.textContent=e.DepartmentName;
            option.setAttribute('select',true)
            }else
            {
            option.value=e.DepartmentID;
            option.textContent=e.DepartmentName;
            
            }


        document.getElementById('Department-up').appendChild(option);

    })
})
   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
        divUpdate.remove()

    }
    
})
formUpdate.addEventListener('submit',e=>{
    e.preventDefault()
      FormSubmit('update', UrlEmployees, [{EmployeeID:this.EmployeeID}],formUpdate).then((data) => {
            if(data.success)
            {

                getItmes();
                divUpdate.remove()
            }
        })
})
  
  }
  delete()
  {
    
    FormSubmit('del', UrlEmployees, [{EmployeeID:this.EmployeeID}], '').then((data) => {
                if(data.success)
                {
                    getItmes()
                }
        })
  }
}
