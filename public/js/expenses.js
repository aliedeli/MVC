import {primaryID,FormSubmit,paginationView}from './min.js';
const btnOpne=document.getElementById('Add-Expenses');
const appBox=document.querySelector('.app-expnese');
const btnCloes=appBox.querySelector('.Cloes')
const formApp=appBox.querySelector('form');
const table=document.getElementById('ex-table-body')
const search=document.getElementById('search')
const Url='/App/expenses';

btnOpne.addEventListener('click',()=> appBox.classList.toggle('active'))
btnCloes.addEventListener('click',()=> appBox.classList.remove('active'))
search.addEventListener('input',e=>{
    if(e.target.value !='')
    {
    FormSubmit('search', Url,e.target.value , '').then(data=>{
           
            let page= new paginationView()
                page.array=data;
                page.body=table;
                page.nameClass=new Expenses();
                page.hasNext=document.getElementById('next');
                page.hasPrev=document.getElementById('back');
                page.itemsPage=8;
                page.pageinfo=document.getElementById('page-info');
                page.displayPage();
                page.button();
        
         }) 
    }else{
         getDateAll()
    }
   
})
formApp.addEventListener('submit',e=>{
    e.preventDefault()
    FormSubmit('insert', Url, '', formApp).then((data) => {
        if(data.success)
        {
            formApp.querySelectorAll('input').forEach(e=>e.value='')
            getDateAll()
        }
        
})

})
   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
       appBox.classList.remove('active')

    }
    
})
getDateAll()
function getDateAll()
{
FormSubmit('select', Url, '', '').then((data) => {
        console.log(data);
    let page= new paginationView()
        page.array=data;
        page.body=table;
        page.nameClass=new Expenses();
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.pageinfo=document.getElementById('page-info');
        page.displayPage();
        page.button();
        
})
}







class Expenses {
    constructor()
    {
        this.ExpID;
        this.ExpenseName;
        this.AmountPaid;
        this.date;
        this.index;
    }
    input(data,index)
    {
        this.ExpID=data.ExpID;
        this.ExpenseName=data.ExpenseName;
        this.AmountPaid=data.AmountPaid;
        this.date=data.CreateDate;
        this.index=index;
    }
    innerHTML()
    {
        let tr=document.createElement('tr')
        let td1=document.createElement('td')
        let td2=document.createElement('td')
        let td3=document.createElement('td')
        let td4=document.createElement('td')
        let td5=document.createElement('td')
        let btnEdit=document.createElement('button')
            btnEdit.type='button'
            btnEdit.classList='btn btn-primary '
            btnEdit.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
         let btnDele=document.createElement('button')
            btnDele.type='button'
            btnDele.classList='btn btn-primary '
            btnDele.innerHTML='<i class="fa-solid fa-trash"></i>';

        td1.textContent=this.index;
        td2.textContent=this.ExpenseName;
        td3.textContent=this.AmountPaid;
        td4.textContent=this.date;

        td5.appendChild(btnEdit)
        td5.appendChild(btnDele)
    

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)

        table.appendChild(tr)

    btnEdit.addEventListener('click',()=>this.updale(this))
    btnDele.addEventListener('click',()=>this.DEL(this))
    }
    updale()
    {
        let box=document.createElement('div')
            box.className='up-expnese';
        let form=document.createElement('form')
        form.innerHTML=`
        
              <div class="row">
                  <div class="input">
                      <div class="icon">
    ❓
                      </div>
                      <div class="text-name">
                          ExpenseName
                      </div>
                      <div class="value">
                          <input type="text" name="name" value='${this.ExpenseName}' >
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
                          <input type="text" name="AmountPaid"value=${this.AmountPaid} >
                      </div>
                  </div>
              </div>

              <div class="buttton">
                  <button type="button" class="btn btn-primary CloesEdit" > Cloes</button>
                  <button type="submit" class="btn btn-primary"> Submit</button>
              </div>
        `
    box.appendChild(form)
        form.querySelector('.CloesEdit').addEventListener('click',()=> box.remove())
        appBox.parentElement.appendChild(box)
        form.addEventListener('submit',(e)=>{
            e.preventDefault()
             FormSubmit('update', Url,[{ExpID:this.ExpID}], form).then(data=>{
                if(data.success)
                {
                    getDateAll()

                }
                
        })

        })
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
      box.remove()

    }
    
})
       
    }
    
    DEL()
    {
         FormSubmit('del', Url,[{ExpID:this.ExpID}], '').then(data=>{
                if(data.success)
                {
                    getDateAll()

                }
                
        })

    }
}