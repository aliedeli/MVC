import {
    FormSubmit
} from './min.js'
const  card=document.getElementById('card')
const  btn_card=document.getElementById('btn-card')
const btn_close=document.getElementById('Close')
const Url='';
btn_card.addEventListener('click',_=>  card.classList.add('active'))
btn_close.addEventListener('click',_=>  card.classList.remove('active'))
document.addEventListener('keydown',e=>{
   if(e.key == "Escape" )
   {
    card.classList.remove('active')
   }
   if(e.key == "F1")
   {
    e.preventDefault()
    card.classList.add('active')
   }

})

// FormSubmit('select', Url, '', '').then((data) => {
  
    
        
// })


// function FormSubmit(action,url,data,form){
    
//    return new Promise((resolve,reject)=>{
//     let xhr = new XMLHttpRequest();
//             xhr.open('POST',url,true);
      
//         xhr.onreadystatechange=()=>{
//             if(xhr.readyState===4 && xhr.status===200){
             
//                 resolve(JSON.parse(xhr.response));
//             }else{
                
//             }

//         }
        


//          let dataSend = new FormData(form || undefined);
//          if(Array.isArray(data)){
           
//             data.forEach((item)=>{
//                 for(let key in item){
                    
//                     dataSend.append(key,item[key]);
//                 }
//             })

//         }else if(action == 'search'){
//             dataSend.append('search',data);
//         }

         
//             dataSend.append('action',action);
//         xhr.send(dataSend);

   
//     })
  
// }
class Safe
{
    constructor(data,index)
    {
        this.TransactionID=data.TransactionID 
        this.TransactionDate=data.TransactionDate 
        this.ExpID=data.ExpID 
        this.saleID=data.saleID 
        this.cusID=data.cusID 
        this.CustomerName=data.CustomerName 
        this.OperationType=data.OperationType 
        this.InAmount=data.InAmount 
        this.OutAmount=data.OutAmount 
        this.Balance=data.Balance
    }
}