let navleft = document.querySelector('.nav-left')
let btnNavbar =document.getElementById('bar')
let maincontainer=document.querySelector('.main-container')
let footer=document.createElement('div');


btnNavbar.addEventListener('click',_=>{navleft.classList.toggle('active')})
footer.className='footer';
footer.textContent=' Program design: Ali Adel Hashem V 0.0.1'
maincontainer.appendChild(footer)


FormSubmit('Role', '/scrnnes', '', '').then((data) => {
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
                if(e.views > 0 && e.name != 'Printer')
                {
                    navleft.querySelector('ul').innerHTML+=html;

                }
             
                
   })
        
})


function FormSubmit(action,url,data,form){
    
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