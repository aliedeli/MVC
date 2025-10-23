const btn_AddCategory = document.getElementById('btn_AddCategory');
const box_Category = document.querySelector('.box-category');
const btn_Close = document.getElementById('cat-cloes');
const from_Category = document.getElementById('Categort_Form');
const tbody = document.getElementById('cat-table-body');
const url='/Add/category';
btn_AddCategory.addEventListener('click', () => {
    box_Category.classList.add('active');
     from_Category.querySelector('input').focus()
});
btn_Close.addEventListener('click', () => {
    box_Category.classList.remove('active');
   
});
from_Category.addEventListener('submit', (e) => {
    e.preventDefault();
    let myPromise= new Promise((r,j)=>{
        let xhr= new XMLHttpRequest()
            xhr.open('POST',url,true)
            console.log(xhr)
            xhr.onreadystatechange=()=>{
                if(xhr.status == 200 && xhr.readyState == 4)
                {
                    r(JSON.parse(xhr.response))
                }else{
                   
                }
            }
            let data = new FormData(from_Category)
                data.append('type','insert')
            xhr.send(data)
    })
    
   myPromise .then(data=>{
        if(data.success)
        {
         getCategories()
        }
        
    })

});
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
         box_Category.classList.remove('active');
    }
    
})

function getCategories() {
   let myPromise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
       
        if (xhr.status === 200 && xhr.readyState == 4   ) {
            resolve(JSON.parse(xhr.response));
        } else {
           
        }

    }
    let data= new FormData();
    data.append('type','select');
    xhr.send(data);

   }).then(data=>{
    let page= new paginationView()
        page.array=data
        page.body=tbody;
        page.hasNext=document.getElementById('next')
        page.hasPrev=document.getElementById('back')
        page.itemsPage=8
        page.nameClass=new Category()
        page.displayPage()
        page.button()

   
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
        document.getElementById('page-info-user').textContent=`Page ${this.currentPage}  of ${this.totalPage}`
         this.body.innerHTML = '';
       this.array.slice(this.start,this.end).forEach((item,index )=>{
       
            let n=  this.nameClass
            n.input(item,++index)
            n.innerHTML()
       })
     
    }





}


getCategories();
class Category {
    constructor() {
        this.id ;
        this.name ;
        this.index ;
       
    }
    input(data,index)
    {
        this.id = data.CatID;
        this.name = data.NameCat;
        this.index = index;
    }
    innerHTML(){
        let tr = document.createElement('tr');
        let td_1 = document.createElement('td');
        td_1.innerText = this.index ;
        let td_2 = document.createElement('td');
        td_2.innerText = this.name ;
        let td_3 = document.createElement('td');
        let btn_delete = document.createElement('button');
        btn_delete.classList.add('btn','btn-danger');
        btn_delete.innerHTML='<i class="fa-solid fa-trash"></i>';
        let btn_edit = document.createElement('button');
        btn_edit.classList.add('btn','btn-primary');
        btn_edit.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
       



         td_3.appendChild(btn_edit);
        td_3.appendChild(btn_delete);

        tr.appendChild(td_1);
        tr.appendChild(td_2);
        tr.appendChild(td_3);
      

        tbody.appendChild(tr);
        btn_delete.addEventListener('click',()=>{
            this.dele()
        });
        btn_edit.addEventListener('click',()=>{
            this.edit()
        });


    }
    edit(){
        let div_EditCategory = document.createElement('div');
        div_EditCategory.classList.add('box-category');
        div_EditCategory.classList.add('active');
        let from=document.createElement('form')
        from.id='Edit_Category_Form'
        from.innerHTML=`
        <h3>Edit Category</h3>
        <input type="hidden" name="CatID" value="${this.id}">
        <input type="text" name="NameCat" class='NameCat' value="${this.name}" placeholder="Category Name" required>
        <div class="btns">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-danger edit-cat-close"  >Close</button>
        </div>
        `
        div_EditCategory.appendChild(from)
       
        let btn_Close = from.querySelector('.edit-cat-close');
       let NameCat= from.querySelector('.NameCat');

        btn_Close.addEventListener('click', () => {
            div_EditCategory.classList.remove('active');
            div_EditCategory.remove()
        }

        );
                    NameCat.addEventListener('input',(e)=>{
               
                this.name= e.target.value
             
            })
        from.addEventListener('submit', (e) => {
            e.preventDefault();
          



            this.sendDeleteRequest('update',url).then(data=>{
                if(data.success)
                {
                 getCategories()
                 div_EditCategory.classList.remove('active');
                 div_EditCategory.remove()
                }
            })
        });
        
        box_Category.parentElement.appendChild(div_EditCategory);
 document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
         div_EditCategory.remove()
    }
    
})
    }
    dele(){
        this.sendDeleteRequest('del',url).then(data=>{
            if(data.success)
            {
             getCategories()
            }
        })

    }
    sendDeleteRequest(type,url){
       return new Promise((r,j)=>{
            let xhr= new XMLHttpRequest()
                xhr.open('POST',url,true)
                console.log(xhr)
                xhr.onreadystatechange=()=>{
                    if(xhr.status == 200 && xhr.readyState == 4)
                    {
                        r(JSON.parse(xhr.response))
                    }else{
                    }
                }
                let data = new FormData()
                    data.append('catID',this.id)
                    data.append('Categort',this.name)
                    data.append('type',type)
                    
                xhr.send(data)
        })
    }

}