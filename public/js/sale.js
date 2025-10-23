import {primaryID,FormSubmit,paginationView}from './min.js'
const listitem=document.querySelector('.list-items')
const nameItem=document.getElementById('nameItem')
const auto_ID=document.getElementById('auto-id')
const qty= document.getElementById('qty')
const cost_price= document.getElementById('cost-price')
const price= document.getElementById('price')
const discount= document.getElementById('discount')
const btn_Save=document.getElementById('btn-Save')
const order_table=document.getElementById('order-table')
const box_sale=document.querySelector('.box-sale')
const btn_cloes=box_sale.querySelector('.cloes')
const btn_add=document.getElementById('Add-sale')
const tbodySale=document.getElementById('tbody-sale')
const nextBtn = document.getElementById('next')
const backBtn = document.getElementById('back')
const cus_name=document.getElementById('cus-name')
const ul_Cutomer=document.getElementById('list-Cutomer')
const searchDate=document.getElementById('search-date')
const search=document.getElementById('search')
const PayMethod=document.getElementById('Pay-Method')
const Amount=document.getElementById('Amount')
const send=document.getElementById('send')
const UrlSale='/Add/Sale'
const UrlItems='/App/items'
const UrlCutomer='/Add/Cutomer'


searchDate.addEventListener('change',(e)=>{
    
        if(e.target.value != '' )
        {
        FormSubmit('search-date','/Add/Sale',[{searchDate:e.target.value}],'').then(data=>{
            if(data.length == 0)
            {
                tbodySale.innerHTML='<tr><td colspan="5" style="text-align:center;">No data found</td></tr>'
                return;
            }
         let test= new paginationView()
            test.array=data
            test.hasNext=nextBtn
            test.hasPrev=backBtn
            test.body=tbodySale
            test.nameClass=new Sale()
            test.button()
            test.displayPage()

        })
  
        }else{
             getSaleAll()
        }
 

})

search.addEventListener('input',e=>{
  if(e.target.value != '' )
        {

    FormSubmit('search','/Add/Sale',[{search:e.target.value}],'').then(data=>{
        if(data.length == 0)
        {
            tbodySale.innerHTML='<tr><td colspan="5" style="text-align:center;">No data found</td></tr>'
            return;

        }
        let test= new paginationView()
            test.array=data
            test.hasNext=nextBtn
            test.hasPrev=backBtn
            test.body=tbodySale
             test.nameClass=new Sale()
            test.button()
            test.displayPage()

        

    })
  }
        
        else{
             getSaleAll()
     }
 

})

btn_add.addEventListener('click',()=>{
    box_sale.classList.add('active')
     auto_ID.value= ++order.OrderID;
     PaymentMethod.OrderID=auto_ID.value
     order.items=[]
     cus_name.focus();
    getSale()

})
btn_cloes.addEventListener('click',()=>{
    box_sale.classList.remove('active')
})

cus_name.addEventListener('input',(e)=>{
     order.CutName=e.target.value
    
   
    getCutomer(e.target.value)
})

cus_name.addEventListener('click',()=>{
    
    
    CutomerAll()
})
 document.addEventListener('keydown',(e)=>{
  
    if(e.key == 'F1')
    {
         e.preventDefault()
    box_sale.classList.add('active')
     auto_ID.value= ++order.OrderID;
     PaymentMethod.OrderID=auto_ID.value
     order.items=[]
     cus_name.focus();
    getSale()
    }
    
})

 document.addEventListener('keydown',(e)=>{

    if(e.key == 'Escape')
    {
   box_sale.classList.remove('active')
    }
    
})


let order={
    OrderID:primaryID(),
    CusID:0,
    CutName:'',
    toltal:0,
    items:[]
}


let PaymentMethod={
    OrderID:order.OrderID,
    MethodType:PayMethod.value,
    Amount: PayMethod.value == 'cash' ?  order.toltal : Amount.value,
    AmountToltal:order.toltal,
}



send.addEventListener('click',e=>{
  
   formSendData('sale', UrlSale,[PaymentMethod,order],'').then(data=>{
        if(data.success)
        {
            getSaleAll()
        }else{
           
        }
   })

})
Amount.value=order.toltal
Amount.addEventListener('input',e=>{ 
    PaymentMethod.Amount =parseInt( e.target.value)
})

PayMethod.addEventListener('change',e=>{
        if(e.target.value == 'cash')
        {
            Amount.value=order.toltal;
            PaymentMethod.Amount=order.toltal ;
        }
        else{
             Amount.value=0;
        }
       
    PaymentMethod.MethodType=e.target.value;
    })

// function formSendData(action, url,arr,form)
// {
//     return new Promise((r)=>{

//         let xhr=new XMLHttpRequest()
//         xhr.open('POST',url,true)
        
//         xhr.onreadystatechange=()=>{
//               if(xhr.status == 200 && xhr.readyState == 4 ) 
//                     {
//                         console.log(xhr)
//                         r( JSON.parse(xhr.response))
//                     }else{
                       
//                     }
//         }
      
//          let dataSend = new FormData(form || undefined);
//          if(Array.isArray(arr)){
           
//             arr.forEach((item)=>{
//                 for(let key in item){
                    
//                     dataSend.append(key,item[key]);
//                 }
//             })

//         }else if(action == 'search'){
//             dataSend.append('search',arr);
//         }

         
//             dataSend.append('type',action);
//         xhr.send(dataSend);     

//     })

// }


function getCutomer(e)
{
    FormSubmit('search',UrlCutomer,[{name:e}],'').then(data=>{
       
        ul_Cutomer.classList.add('active')
        ul_Cutomer.innerHTML=''
        data.forEach(item=>{
            let cus= new Cutomer(item)
                cus.innerHTML()
        }
    )
    })
    
  
}

function CutomerAll()
{

    FormSubmit('select',UrlCutomer,'','').then(data=>{
        ul_Cutomer.classList.add('active')
        ul_Cutomer.innerHTML=''
        data.forEach(item=>{
            let cus= new Cutomer(item)
                cus.innerHTML()
        }
    )
    })



}

class Cutomer
{
    constructor(data)
    {
        this.ID=data.customersID
        this.name=data.name
        this.address=data.address
        this.phone=data.phone
      
        
    }
    innerHTML()
    {
        let li=document.createElement('li')
            li.textContent=this.name
            ul_Cutomer.appendChild(li)
        li.addEventListener('click',()=>{
            cus_name.value=this.name
            order.CusID=this.ID
            order.CutName=this.name
            ul_Cutomer.classList.remove('active')
      
        })

    }
}


window.onload=()=>{
   auto_ID.value=order.OrderID;
}

class Items   {
    constructor(data)
    {
        this.ID=data.itemID
        this.name=data.NameItem
        this.rqcode=data.rqcode
        this.price=data.Price
        this.discount=data.Discount
        this.qty=data.qty
        this.costPrice=data.CostPrice
        this.toltal=0
        this.send=true;
        this.AllToltal=data.toltal
        this.discount=((this.price * this.discount ) / 100)
        this.price= (this.price -  this.discount).toFixed(2)
       
    }
    innerHTML()
    {
       
           
        let li=document.createElement('li')
            li.textContent=this.name
          

        li.addEventListener('click',()=> {
            qty.focus() 
            this.event(this)
        })
          listitem.appendChild(li)
    }
    event()
    {
         let but=document.createElement('button')
          but.classList='btn btn-primary'
            but.textContent='Save'
            but.setAttribute('data-va','1')
            but.type='submit';
      listitem.classList.remove('active')
      nameItem.value=this.name;
      qty.value=this.qty;

      cost_price.value=this.costPrice
     price.value=(this.price -  this.discount).toFixed(2)
     discount.value= this.discount
     this.toltal = (this.qty * this.price ).toFixed(2)
     document.getElementById('toltal').textContent=this.toltal
    discount.addEventListener('change',(e)=>{
        
        this.discount= e.target.value

       price.value = this.price
       this.toltal = this.qty * this.price 
         document.getElementById('toltal').textContent=this.toltal
    })


              
    price.addEventListener('change',(e)=>{
        this.price=e.target.value
        if(this.costPrice < e.target.value)
        {
          e.target.style.color='red';
        }else{

           e.target.style.color='black';
        }
         
        this.toltal = (this.qty * this.price).toFixed(2)
         document.getElementById('toltal').textContent=this.toltal
    })
        
qty.addEventListener('input',(e)=>{
      this.qty=e.target.value
        this.toltal = (e.target.value * this.price).toFixed(2)
       document.getElementById('toltal').textContent=this.toltal
    })

        
        btn_Save.append(but) 
        but.addEventListener('click',(e)=>{
            this.SaveEvent()
            e.target.remove()
        })

        document.addEventListener('keypress',(e)=>{
            console.log(e)
           if(e.key == 'Enter')
           {
              this.SaveEvent();
           }
          
        })
   
    }
    SaveEvent()
    {
        nameItem.value='';
         order.items.push(this)
       
      let myPromise= new Promise((r,j)=>{
        let xhr= new XMLHttpRequest()
          xhr.open('POST','/Add/Sale',true)
            console.log(xhr)
           xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                    
                  
                    r(JSON.parse(xhr.response))
                }else{
                   
                }

            }
            if(this.send){
                let data= new FormData()
                data.append('OrderID',order.OrderID)
                data.append('CusID',order.CusID)
                data.append('CutName',order.CutName)
                data.append('data',JSON.stringify(this))
                data.append('type','insert')
                xhr.send(data);

               
            }

         
                
      }).then(data=>{
        if(data.success){
            this.send=false
       
            getSale()
             getSaleAll()

        }else{
            this.send=true
        }
      })



  

    }
}



nameItem.addEventListener('input',(e)=>{
listitem.classList.add('active')
    getitemsView(e.target.value)
})

nameItem.addEventListener('click',(e)=>{
listitem.classList.add('active')
    getitemsView(e.target.value)
})


function getitemsView(value)
{

    
    FormSubmit('search',UrlItems,[{search:value}],'').then(data=>{
        
          listitem.innerHTML='';
      if(document.querySelector('[data-va]'))
      {
        document.querySelector('[data-va]').remove()
      }
       
        data.forEach( item => {
        
        let event= new Items(item)
         event.innerHTML()
             

        });
})

}







function getSale(){
    let arr={
        OrderID:order.OrderID
    }
        FormSubmit('datails',UrlSale,[arr],'').then(data=>{
 order.toltal=0;
        for(let i=0 ; i < data.length ; i++)
        {
            order.toltal+=parseFloat( data[i].toltal)   
        }
       
        
         document.getElementById('total-value').textContent= " : " + order.toltal ;
            PaymentMethod.AmountToltal=order.toltal;
            Amount.value=order.toltal
            PaymentMethod.Amount=order.toltal;
          let test= new paginationView()
            test.array=data
            test.hasNext=document.getElementById('next-btn')
            test.hasPrev=document.getElementById('back-btn')
            test.pageinfo=document.getElementById('page-info-sale')
            test.body=order_table
            test.nameClass=new SaleTable()
            test.itemsPage=4    
            test.button()
            test.displayPage()
})



}
function getSaleAll(){


    FormSubmit('select',UrlSale,'','').then(data=>{
            let test= new paginationView()
            test.array=data
            test.hasNext=nextBtn
            test.hasPrev=backBtn
            test.body=tbodySale
            test.pageinfo=document.getElementById('page-info-sale')
            test.nameClass=new Sale()

            test.button()
            test.displayPage()
})



}




getSaleAll()







class Sale  {
    constructor()
    {
       this.ID;
       this.CutName;
       this.CusID;
       this.address;
       this.phone;
       this.toltal;
       this.Date;
       this.index;
        
     

    }
    input(data,index)
    {
        this.ID=data.saleID
       this.CutName=data.name
       this.CusID=data.CusID
       this.address=data.address
       this.phone=data.phone
       this.toltal=data.toltal;
       this.Date=data.dateSale;
       this.index=index

    }

    innerHTML()
    {

        let tr=document.createElement('tr')
        let td_1=document.createElement('td')
        let td_2=document.createElement('td')
        let td_3=document.createElement('td')
        let td_4=document.createElement('td')
        let td_5=document.createElement('td')

        td_1.textContent=this.index
        td_2.textContent=this.Date
        td_3.textContent=this.CutName
        td_4.textContent=this.toltal


       




        let viewBtn=document.createElement('button')
            viewBtn.type='button'
            viewBtn.innerHTML='<i class="fa-solid fa-eye"></i> / <i class="fa-solid fa-pen-to-square"></i>';
            viewBtn.className='btn btn-primary'
        let btnPrinte=document.createElement('button')
            btnPrinte.type='button'
            btnPrinte.innerHTML='<i class="fa-solid fa-print"></i> A4'
            btnPrinte.className='btn btn-primary'
            viewBtn.addEventListener('click',()=>{
                order.OrderID=this.ID
                PaymentMethod.OrderID=this.ID
                order.CusID=this.CusID;
                order.CutName=this.CutName
                cus_name.value=this.CutName
                

                auto_ID.value=this.ID;
                getSale()
                box_sale.classList.add('active')
                
     
            })
        let deleteBtn=document.createElement('button')
            deleteBtn.type='button'
            deleteBtn.innerHTML='<i class="fa-solid fa-trash"></i>';
            deleteBtn.className='btn btn-danger'
            deleteBtn.addEventListener('click',()=>{
                this.dele()
            })
            btnPrinte.addEventListener('click',_=>{
                window.open('/printer?id='+ this.ID  );
            })

        td_5.appendChild(btnPrinte)
        td_5.appendChild(viewBtn)
         td_5.appendChild(deleteBtn)





        tr.appendChild(td_1)
        tr.appendChild(td_2)
        tr.appendChild(td_3)
        tr.appendChild(td_4)
        tr.appendChild(td_5)

        tbodySale.appendChild(tr)
    }
    dele()
    {
            let myPromise= new Promise((r,j)=>{
        let xhr= new XMLHttpRequest()
          xhr.open('POST','/Add/Sale',true)

           xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                  
                    r(JSON.parse(xhr.response))
                }else{
                   
                }

            }
            
                let data= new FormData()
                data.append('OrderID',this.ID)    
                data.append('type','dele')
                xhr.send(data);
            

         
                
      }).then(data=>{
        if(data.success)
        {
           getSaleAll()
        }

      })
    }
}


class SaleTable
{
    constructor(data,index)
    {
       this.ID;
       this.name;
       this.itemID;
       this.qty;
       this.price;
       this.costPrice;
       this.discount;
       this.rqcode;
        this.toltal; 
        this.index;

        
    }
    input(data,index)
    {
         this.ID=data.sale_detail_ID
        this.name=data.ItemName 
        this.itemID=data.itemID
        this.qty=data.qty
        this.price=data.price
       this.costPrice=data.costPrice
       this.discount=data.discount
       this.rqcode=data.rqcode
        this.toltal=data.toltal  
        this.index=index
    }
    innerHTML()
    {
       
        let tr=document.createElement('tr')
        let td_1=document.createElement('td')
        let td_2=document.createElement('td')
        let td_3=document.createElement('td')
        let td_4=document.createElement('td')
        let td_5=document.createElement('td')
        
        let bnt_update=document.createElement('button')
            bnt_update.type='button'
            bnt_update.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
        let btn_dele=document.createElement('button')
            btn_dele.type='button'
            btn_dele.innerHTML='<i class="fa-solid fa-trash"></i>';
        let input=document.createElement('input')
            input.type='number'
            input.value=this.qty
        
        td_1.textContent=this.name
        td_2.textContent=this.price
        
        td_4.textContent=    this.toltal
        td_3.appendChild(input)
        td_5.appendChild(bnt_update)
        td_5.appendChild(btn_dele)
        tr.appendChild(td_1)
        tr.appendChild(td_2)
        tr.appendChild(td_3)
        tr.appendChild(td_4)
        tr.appendChild(td_5)
       
        
        input.addEventListener('input',(e)=>{
            this.qty=e.target.value
             td_4.textContent= (e.target.value * (  this.price - ( (this.discount * this.price) / 100 )   ) ).toFixed(2)        })
        order_table.appendChild(tr)
         bnt_update.addEventListener('click',()=>{
            this.update(this)
         })
            btn_dele.addEventListener('click',()=>{
            this.dele(this)
         })
    }
    dele()
    {
          let myPromise= new Promise((r,j)=>{
        let xhr= new XMLHttpRequest()
          xhr.open('POST','/Add/Sale',true)

           xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                  
                    r(JSON.parse(xhr.response))
                }else{
                   
                }

            }
            
                let data= new FormData()
                data.append('OrderID',order.OrderID)    
                data.append('data',JSON.stringify(this))
                data.append('type','Dele_Details')
                xhr.send(data);
            

         
                
      }).then(data=>{
        if(data.success)
        {
            getSale()
        }

      })
    }
    update()
    {
       let myPromise= new Promise((r,j)=>{
        let xhr= new XMLHttpRequest()
          xhr.open('POST','/Add/Sale',true)

           xhr.onreadystatechange=()=>
            {
                if(xhr.status == 200 && xhr.readyState == 4 )
                {
                  
                    r(JSON.parse(xhr.response))
                }else{
                   
                }

            }
            
                let data= new FormData()
                data.append('OrderID',order.OrderID)    
                data.append('data',JSON.stringify(this))
                data.append('type','update_details')
                xhr.send(data);
            

         
                
      }).then(data=>{
        if(data.success)
        {
            getSale()
        }

      })
    }
   

}