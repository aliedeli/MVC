let navleft = document.querySelector('.nav-left')
let btnNavbar =document.getElementById('bar')
let maincontainer=document.querySelector('.main-container')
let footer=document.createElement('div');
if( localStorage.getItem('nav'))
{
     navleft.classList.add('active')
}
window.onload=()=>
{
    navleft.styles=`
    animation: width 5s ease-in-out;
    `
}

btnNavbar.addEventListener('click',_=>{
   
   
     
    if(navleft.classList.contains('active'))
    {
         localStorage.removeItem('nav')
    }else{
         localStorage.setItem('nav','active')
    }

    navleft.classList.toggle('active')
})
FormSubmit('getnavsereene', '/scrnnes', '', '').then((data) => {
  navleft.querySelector('ul').innerHTML='';
  
   data.forEach(e=>{

   
      let html=`
         <li>
         <a href="${e.href}">
                      <div class="icon">
                    ${e.icon}
                </div>
                    <div class="text-name">
                        ${e.name}
                    </div>
                 
                 </a>
                </li>`
             
                    navleft.querySelector('ul').innerHTML+=html;

                
             
                
   })
        
})

footer.className='footer';
footer.textContent=' Program design: Ali Adel Hashem V 0.0.1'
maincontainer.appendChild(footer)
export function primaryID()
{
    let id= new Date().getTime()
      let newid=id.toString().slice(8)
    return newid
}
export function FormSubmit(action,url,data,form){
    
   return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
            xhr.open('POST',url,true);
      
        xhr.onreadystatechange=()=>{
           
            if(xhr.readyState===4 && xhr.status===200){
             
                resolve(JSON.parse(xhr.response));
            }else{
                
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
export class paginationView
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
        this.pageinfo;
     
        
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
        this.pageinfo.textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n= this.nameClass
                n.input(item,++index)
            n.innerHTML()
       })
     
    }





}
export function   message (classname,m)
    {
    let div=document.createElement('div')
        div.className=classname;
        div.innerHTML=`
    <button class="close-btn" onclick="this.parentElement.style.display='none';">&times;</button>
             ${m}
    `;

        setTimeout(()=>{div.remove()},1000)
    footer.parentElement.appendChild(div)

    }
