import {primaryID,FormSubmit,paginationView}from './min.js'
const newItems=document.querySelector('#newItems');
const box_cat=document.querySelector('.box-category');
const but_add_cat=document.getElementById('add-cat');
const but_cloes_cat=document.getElementById('cat-cloes');
const box_banner=document.querySelector('.box-Banner');
const but_add_banner=document.getElementById('add-banner');
const but_cloes_banner=document.getElementById('banner-cloes');
const get_select_Cat=document.getElementById('select-Cat');
const get_select_banner=document.getElementById('select-banner');
const Categort_Form=document.getElementById('Categort_Form');
const Banner_form=document.getElementById('Banner_form');
const but_items=document.getElementById('but-items')
const box_view_items=document.getElementById('box_items') 
const view_items_cloes=document.getElementById('view-items-cloes')
const input_search_items=document.getElementById('search')

const UrlItems='/App/items'

but_items.addEventListener('click',()=>{

        if(box_banner.classList.contains('active'))
        {
            box_banner.classList.remove('active')
        }
        if(box_cat.classList.contains('active'))
        {
            box_cat.classList.remove('active')

        }
 
          box_view_items.classList.add('active')
getitems('/Add/category',get_select_Cat,'CatID',"NameCat")
getitems('/Add/banner',get_select_banner,'BannerID','BannerName')

})

 document.addEventListener('keydown',(e)=>{
   
    if(e.key == 'F1')
    { e.preventDefault()
          box_view_items.classList.add('active')
          box_view_items.querySelectorAll('input')[0].focus()
       
    }
    
})
document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
      box_banner.classList.remove('active')
    box_cat.classList.remove('active')
      box_view_items.classList.remove('active')
         
    }
    
})


view_items_cloes.addEventListener('click',()=>{
    if(box_cat.classList.contains('active'))
        {
        box_cat.classList.remove('active')

        }
     if(box_banner.classList.contains('active'))
        {
        box_banner.classList.remove('active')

        }

    // box_view_items.classList.add('active')
 
          box_view_items.classList.remove('active')
       

})

but_add_banner.addEventListener('click',()=>{
       if(box_cat.classList.contains('active'))
        {
        box_cat.classList.remove('active')

        }
if(box_view_items.classList.contains('active'))
{
    
box_view_items.classList.remove('active')
}
   box_banner.classList.add('active');

   if(box_view_items.classList.contains('active'))
{
    
box_view_items.classList.remove('active')
}

    but_cloes_banner.addEventListener('click',()=>  box_banner.classList.remove('active'))
})

but_add_cat.addEventListener('click',()=>{
    if(box_banner.classList.contains('active'))
{
 box_banner.classList.remove('active')

}
if(box_view_items.classList.contains('active'))
{
    
box_view_items.classList.remove('active')
}
    box_cat.classList.add('active');
    but_cloes_cat.addEventListener('click',()=>  box_cat.classList.remove('active'))
})



Categort_Form.addEventListener("submit",(e)=>{
    e.preventDefault()

FormSubmit('insert','/Add/category','',Categort_Form).then((data)=>{
     if(data.success){
        box_cat.classList.remove('active')
       
    }       
})


    
})
Banner_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    FormSubmit('insert','/Add/banner','',Banner_form).then((data)=>{
        if(data.success){
            box_banner.classList.remove('active')
        }
    })
   
})



function getitems(url,select,id = null,name = null)
{
   
FormSubmit('select',url,'','').then((data)=>{
        select.innerHTML='';
        data.forEach( item=> {
        
            select.innerHTML+=`<option value="${item[id]}">${item[name]}</option>`

        });
    })
 }

function getitemsView()
{
FormSubmit('select',UrlItems,'','').then((data)=>{
 
         let pagin=new paginationView()
            pagin.nameClass=new items()
            pagin.body=document.getElementById('items-tbody')
            pagin.array=data
            pagin.hasNext=document.getElementById('next-page-items')
            pagin.hasPrev=document.getElementById('prev-page-items')
            pagin.pageinfo=document.getElementById('page-info-items')
            pagin.itemsPage=10
            pagin.displayPage()
            pagin.button()
})

}
input_search_items.addEventListener('input',(e)=>{
    let filter=e.target.value
        if(filter.length < 1)
        {
            getitemsView()
            return;
        }
    FormSubmit('search',UrlItems,[{search:filter}],'').then((data)=>{
            if(data.length < 1  )
            {
                document.getElementById('items-tbody').innerHTML='<tr><td colspan="6" style="text-align:center;">No items found</td></tr>'
                return;
            }
         let pagin=new paginationView()
            pagin.nameClass=new items()
            pagin.body=document.getElementById('items-tbody')
            pagin.array=data
            pagin.hasNext=document.getElementById('next-page-items')
            pagin.hasPrev=document.getElementById('prev-page-items')
            pagin.pageinfo=document.getElementById('page-info-items')
            pagin.itemsPage=10
            pagin.displayPage()
            pagin.button()
    })
})

newItems.addEventListener("submit",(e)=>{
    e.preventDefault()
   FormSubmit('insert',UrlItems,'',newItems).then((data)=>{
             if(data.success)
             {
                  box_view_items.querySelectorAll('input').forEach(e=>e.value='');
                getitemsView()
            }
    
    })
   

})

getitemsView()

class items
{
    constructor()
    {
        this.ID;
        this.name;
        this.rq;
        this.CostPrice;
        this.price;
        this.discount;
        this.count;
        this.catID
        this.BannerID;
    }
    input(data,index)
    {
        this.ID=data.itemID;
        this.name=data.NameItem;
        this.rq=data.rqcode;
        this.CostPrice=data.CostPrice;
        this.price=data.Price;
        this.discount=data.Discount;
        this.count=parseInt(data.qty);
        this.catID=data.CatID;
        this.BannerID=data.BannerID;
        this.index=index;
    }

    innerHTML(){
        let tr=document.createElement('tr');
        let td_0=document.createElement('td');
        let td_2=document.createElement('td');
        let td_3=document.createElement('td');
        let td_4=document.createElement('td');
        let td_5=document.createElement('td');
        let td_6=document.createElement('td');
        let td_7 =document.createElement('td');
        let but_view=document.createElement('button')
        let but_delete=document.createElement('button')

        but_view.type='button'
        but_view.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
        but_delete.type='button'
        but_delete.innerHTML='<i class="fa-solid fa-trash"></i>';


        td_0.textContent=this.name;
        td_2.textContent=this.CostPrice;
        td_3.textContent=this.price
        td_4.textContent=this.discount
        td_5.textContent=this.count
        td_7.textContent=this.index
        td_6.appendChild(but_view)
        td_6.appendChild(but_delete)

        tr.appendChild(td_7)
        tr.appendChild(td_0)
        tr.appendChild(td_2)
        tr.appendChild(td_3)
        tr.appendChild(td_4)
        tr.appendChild(td_5)
        tr.appendChild(td_6)
        



       document.getElementById('items-tbody').appendChild(tr);
        but_view.addEventListener('click',()=>this.Event_view(this))
        but_delete.addEventListener('click',()=>this.delete())
        
    }
    
 getitems(url,select,id = null,name = null , value =null)
{
    
     new Promise((r,j)=>{
        let xhr=new XMLHttpRequest();
            xhr.open('POST',url)
         
            xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                   console.log(xhr)
                  
                    r(JSON.parse(xhr.response))
                }else{
                    // j('Error')
                }

            }
            let data=new FormData()
                data.append('type','select')
            xhr.send(data);
    }).then((data)=>{
        select.innerHTML='';
        data.forEach( item=> {
                if(value == item[id])
                {
                 select.innerHTML+=`<option selected value="${item[id]}">${item[name]}</option>`
                }else{
                     select.innerHTML+=`<option value="${item[id]}">${item[name]}</option>`
                }
           

        });
    })
 }

   Event_view(){
      let box=document.createElement('div')
        box.classList='box-view'


        let row_1= document.createElement('div')
            row_1.className='row';

        let row_2= document.createElement('div')
            row_2.className='row';

        let row_3= document.createElement('div')
            row_3.className='row';
        
         let row_4= document.createElement('div')
            row_4.className='row';

        let row_5= document.createElement('div')
            row_5.className='row';

        let box_Input_name=document.createElement('div')
            box_Input_name.className='input';
        let icon_name=document.createElement('div');
             icon_name.className='icon'
             icon_name.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_name=document.createElement('div')
            box_name.className='name'
            box_name.textContent='Name Item';
        let input_name = document.createElement('div')
            input_name.className='input';
        let box_input_valut_1=document.createElement('div')
            box_input_valut_1.className='input'
        let value_name=document.createElement('input')
            value_name.type='text'
            value_name.name='name'
            value_name.value=this.name

        box_input_valut_1.appendChild(value_name)
        box_Input_name.appendChild(icon_name)
        box_Input_name.appendChild(box_name)
        box_Input_name.appendChild(box_input_valut_1)

       row_1.appendChild( box_Input_name)


        
        let box_Input_rqcode=document.createElement('div')
            box_Input_rqcode.className='input';
        let icon_rqcode=document.createElement('div');
             icon_rqcode.className='icon'
             icon_rqcode.innerHTML='<i class="fa-solid fa-barcode"></i>'
        let box_rqcode=document.createElement('div')
         box_rqcode.className='name'
            box_rqcode.textContent='Barcode';
        let input_rqcode = document.createElement('div')
            input_rqcode.className='input';
        let box_input_valut_2=document.createElement('div')
            box_input_valut_2.className='input'
        let value_rqcode=document.createElement('input')
            value_rqcode.type='text'
            value_rqcode.name='Barcode'
            value_rqcode.value=this.rq

        box_input_valut_2.appendChild(value_rqcode)
        box_Input_rqcode.appendChild(icon_rqcode)
        box_Input_rqcode.appendChild(box_rqcode)
        box_Input_rqcode.appendChild(box_input_valut_2)

       row_1.appendChild( box_Input_rqcode)
        

        let box_Input_CostPrice=document.createElement('div')
            box_Input_CostPrice.className='input';
        let icon_CostPrice=document.createElement('div');
             icon_CostPrice.className='icon'
             icon_CostPrice.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_CostPrice=document.createElement('div')
            box_CostPrice.className='name'
            box_CostPrice.textContent='CostPrice';
        let input_CostPrice = document.createElement('div')
    
            input_CostPrice.className='input';
         let box_input_valut_3=document.createElement('div')
            box_input_valut_3.className='input'
        let value_CostPrice=document.createElement('input')
            value_CostPrice.type='text'
            value_CostPrice.name='CostPrice'
            value_CostPrice.value=this.CostPrice;

        box_input_valut_3.appendChild(value_CostPrice)
        box_Input_CostPrice.appendChild(icon_CostPrice)
        box_Input_CostPrice.appendChild(box_CostPrice)
        box_Input_CostPrice.appendChild(box_input_valut_3)

       row_2.appendChild( box_Input_CostPrice)

       
        let box_Input_price=document.createElement('div')
            box_Input_price.className='input';
        let icon_price=document.createElement('div');
             icon_price.className='icon'
             icon_price.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_price=document.createElement('div')
            box_price.textContent='Price';
        let box_input_valut_4=document.createElement('div')
            box_input_valut_4.className='input'
        let input_price = document.createElement('div')
            input_price.className='input';
        let value_price=document.createElement('input')
            value_price.type='text'
            value_price.name='price'
             value_price.value=this.price

        box_input_valut_4.appendChild(value_price)
        box_Input_price.appendChild( icon_price)
        box_Input_price.appendChild(box_price)
        box_Input_price.appendChild(box_input_valut_4)

       row_2.appendChild( box_Input_price)
  
        let box_Input_discount=document.createElement('div')
            box_Input_discount.className='input';
        let icon_discount=document.createElement('div');
             icon_discount.className='icon'
             icon_discount.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_discount=document.createElement('div')
            box_discount.textContent='Discount';
        let input_discount = document.createElement('div')
            input_discount.className='input';
        let box_input_valut_5=document.createElement('div')
            box_input_valut_5.className='input'
        let value_discount=document.createElement('input')
            value_discount.type='text'
            value_discount.name='Discount'
            value_discount.value=this.discount


       box_input_valut_5.appendChild(value_discount)
        box_Input_discount.appendChild( icon_discount)
        box_Input_discount.appendChild(box_discount)
        box_Input_discount.appendChild(box_input_valut_5)

       row_2.appendChild( box_Input_discount)

        let box_Input_counter=document.createElement('div')
            box_Input_counter.className='input';
        let icon_counter=document.createElement('div');
             icon_counter.className='icon'
             icon_counter.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_counter=document.createElement('div')
            box_counter.textContent='QTY';
        let input_counter = document.createElement('div')
            input_counter.className='input';
             let box_input_valut_6=document.createElement('div')
            box_input_valut_6.className='input'
        let value_counter=document.createElement('input')
            value_counter.type='text'
            value_counter.name='Counter'
            value_counter.value=this.count;
        

    

       box_input_valut_6.appendChild(value_counter)
        box_Input_counter.appendChild( icon_discount)
        box_Input_counter.appendChild(box_counter)
        box_Input_counter.appendChild(box_input_valut_6)
       row_2.appendChild( box_Input_counter)

     let box_Input_category=document.createElement('div')
            box_Input_category.className='input';
        let icon_category=document.createElement('div');
             icon_category.className='icon'
             icon_category.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_category=document.createElement('div')
            box_category.textContent='Category';
        let input_category = document.createElement('div')
            input_category.className='input';
             let box_input_valut_7=document.createElement('div')
            box_input_valut_7.className='select'
        let value_category=document.createElement('select')
            value_category.name='CatID'
            this.getitems('/Add/category', value_category,'CatID',"NameCat",this.catID)

        box_input_valut_7.appendChild(value_category)
        box_Input_category.appendChild(icon_category)
        box_Input_category.appendChild(box_category)
        box_Input_category.appendChild(box_input_valut_7)


        row_3.appendChild(box_Input_category)

     let box_Input_Banner=document.createElement('div')
            box_Input_Banner.className='input';
        let icon_Banner=document.createElement('div');
             icon_Banner.className='icon'
             icon_Banner.innerHTML='<i class="fa-solid fa-signature"></i>'
        let box_Banner=document.createElement('div')
            box_Banner.textContent='Banner';
        let input_Banner = document.createElement('div')
            input_Banner.className='input';
             let box_input_valut_8=document.createElement('div')
            box_input_valut_8.className='select'
        let value_Banner=document.createElement('select')
            value_Banner.name='bannerID'
     this.getitems('/Add/banner', value_Banner,'BannerID','BannerName', this.BannerID)
        box_input_valut_8.appendChild(value_Banner)
        box_Input_Banner.appendChild(icon_Banner)
        box_Input_Banner.appendChild(box_Banner)
        box_Input_Banner.appendChild(box_input_valut_8)

        row_3.appendChild(box_Input_Banner)


        let box_but=document.createElement('div')
            box_but.className='button'
        let button_submit=document.createElement('button')
            button_submit.className='btn btn-outline-secondary'
            button_submit.type='submit';    
            button_submit.textContent='Save'

        let button_cloes=document.createElement('button')
        button_cloes.className='btn btn-outline-secondary'
        button_cloes.type='button';    
        button_cloes.textContent='Cloes'

        box_but.appendChild(button_submit)
        box_but.appendChild(button_cloes)
       button_cloes.addEventListener('click',()=>box.remove())


        

    let form = document.createElement('form');

       form.appendChild(row_1)
       form.appendChild(row_2)
       form.appendChild(row_3)
       form.appendChild(box_but)
       box.appendChild(form)

    box_view_items.parentElement.appendChild(box)


    form.addEventListener('submit',(e)=>{
        e.preventDefault()
           this.post(form,'/App/items','update')
    })
     
      document.addEventListener('keydown',(e)=>{
    if(e.key == 'Escape')
    {
     box.remove()
    }
    
})
    }

    post(from,url,type)
    {
      
          new Promise((r,j)=>{
        let xhr=new XMLHttpRequest();
            xhr.open('POST',url)
         
            xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                   console.log(xhr)
                  
                    r(JSON.parse(xhr.response))
                }else{
                    // j('Error')
                }

            }
            let data=new FormData(from)
                data.append('itemID',this.ID)
                data.append('action',type)
            xhr.send(data);
    }).then((data)=>{

        if(data.success)
        {
         this.message ('success-message','Your changes have been saved successfully!')
          getitemsView()
        }else{
             this.message ('error-message','I did not save your changes')
        }
           

    })
    
    }
    message (name,m)
    {
    let div=document.createElement('div')
        div.className=name;
        div.innerHTML=`
    <button class="close-btn" onclick="this.parentElement.style.display='none';">&times;</button>
             ${m}
    `;

        setTimeout(()=>{div.remove()},1000)
box_banner.parentElement.appendChild(div)

    }
    delete()
    {
        let form =document.createElement('form');
        this.post(form,'/App/items','dele')
    }




}



