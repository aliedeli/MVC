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
           
            let page= new paginationViewExpenses()
                page.array=data;
                page.body=table;
                page.hasNext=document.getElementById('next');
                page.hasPrev=document.getElementById('back');
                page.itemsPage=8;
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
  
        let page= new paginationViewExpenses()
        page.array=data;
        page.body=table;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();
        
})
}


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

class paginationViewExpenses
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
        this.itemsPage=8
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
     
        document.getElementById('page-info-expense').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=   new Expenses(item,++index)
            n.innerHTML()
       })
     
    }





}


class Expenses {
    constructor(data , index)
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