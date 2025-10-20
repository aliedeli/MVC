const boxBanner = document.querySelector('.box-Banner');
const btnClose = document.getElementById('banner-cloes');
const btnOpen = document.getElementById('btn-open');
const FormBanner = document.getElementById('Banner_form');
const tableBanner = document.getElementById('table-Banner');
const search = document.getElementById('search');

const Url='/Add/banner';
btnOpen.addEventListener('click', () => {
  boxBanner.classList.add('active');
    FormBanner.querySelector('input').focus()
});
btnClose.addEventListener('click', () => {
  boxBanner.classList.remove('active');
});
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
         boxBanner.classList.remove('active');
    }
    
})
FormBanner.addEventListener('submit', (e) => {
  e.preventDefault();
   FormSubmit('insert',Url,'',FormBanner).then(data=>{
     if(data.success){
        boxBanner.classList.remove('active');
       FormSubmit('select',Url,'').then((data)=>{
   

        let page= new paginationViewUser()
        page.array=data;
        page.body=tableBanner;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();


});
     }
   })
});
search.addEventListener('input',(e)=>{
    if(e.target.value ===''){
        FormSubmit('select',Url).then((data)=>{
   

        let page= new paginationViewUser()
        page.array=data;
        page.body=tableBanner;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();


});

    }else{
        FormSubmit('search', Url, [{ BannerName: e.target.value }]).then((data)=>{
            let page= new paginationViewUser()
            page.array=data;
            page.body=tableBanner;
            page.hasNext=document.getElementById('next');
            page.hasPrev=document.getElementById('back');
            page.itemsPage=8;
            page.displayPage();
            page.button();
        });
}
});


function FormSubmit(type,url,data,form){
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

        }

        
            dataSend.append('type',type);
        xhr.send(dataSend);

   
    })
  
}


FormSubmit('select',Url,'').then((data)=>{
   

        let page= new paginationViewUser()
        page.array=data;
        page.body=tableBanner;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();


});
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
        
        document.getElementById('page-info-user').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=   new Banner(item,++index)
            n.innerHTML()
       })
     
    }





}



class Banner{
    constructor(data,index){
        this.ID=data.BannerID;
        this.name=data.BannerName;
        this.index=index;
    }
    innerHTML(){
        let tr=document.createElement('tr');
        let td1=document.createElement('td');
        let td2=document.createElement('td');
        let td3=document.createElement('td');
        let btnEdit=document.createElement('button');
        let btnDelete=document.createElement('button');
        btnEdit.className='btn btn-outline-primary';
        btnEdit.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
        btnDelete.className='btn btn-outline-danger';
        btnDelete.innerHTML='<i class="fa-solid fa-trash"></i>';
        td3.appendChild(btnEdit);
        td3.appendChild(btnDelete);
        tr.appendChild(td1);

        td1.innerText=this.index;
        td2.innerText=this.name;
        tr.appendChild(td2);
        tr.appendChild(td3);
       
        tableBanner.appendChild(tr);

        btnDelete.addEventListener('click',()=>{
            this.delete();
        });
        btnEdit.addEventListener('click',()=>{
            this.edit();
        });
    }
    edit(){
       let div=document.createElement('div');
       div.className='box-Banner active';
       let form=document.createElement('form');
         form.id='Banner_form';
         form.innerHTML=`
            <h3>Edit Banner</h3>
            <div class="input-box">
                <span class="details">Banner Name</span>
                <input type="text" name="BannerName" value="${this.name}" required>
            </div>
            <div class="button">
            <input type="button" class="btn btn-primary"  id="banner-1-cloes" value="Close">
                <input type="submit" class="btn btn-primary"  value="Update">
                
            </div>  
         `;
         div.appendChild(form);
        boxBanner.parentElement.appendChild(div);
         const btnClose = document.getElementById('banner-1-cloes');
    
            btnClose.addEventListener('click', () => {
             
                div.remove();
            });
         form.addEventListener('submit',(e)=>{
            e.preventDefault();
            FormSubmit('update',Url,[{BannerID:this.ID}],form).then(data=>{
                if(data.success){
                    div.remove();
                    FormSubmit('select',Url,'').then((data)=>{

        let page= new paginationViewUser()
        page.array=data;
        page.body=tableBanner;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();
});
                }
            })
         }
            );
            


   document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
          div.remove();
    }
    
})

    }
    delete(){
        this.SendRequest('del',Url,[{BannerID:this.ID}]).then(data=>{
            if(data.success){
                FormSubmit('select',Url,'').then((data)=>{
   

        let page= new paginationViewUser()
        page.array=data;
        page.body=tableBanner;
        page.hasNext=document.getElementById('next');
        page.hasPrev=document.getElementById('back');
        page.itemsPage=8;
        page.displayPage();
        page.button();


});
            }
        })
    }
    SendRequest(type,url,data ,form){ {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onreadystatechange = () => {
                console.log(xhr.responseText);
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
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

        });

    }
}
}