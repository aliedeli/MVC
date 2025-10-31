
let info= document.querySelectorAll('[data-table]');
let board=document.querySelector('.board')

let UserTable={
    User:'Users',
    Sale:"sale",
    item:"items",
    tolat:"tolat",
    cust:"Customers",
    expenses:'Expenses'
}


let  index=20
info.forEach(e => {

    if (e.getAttribute('data-table') != undefined ) {

         getTolal(e,e.getAttribute('data-table'));
    }
});
function getTolal(e,value)
{

    let xhr= new XMLHttpRequest()
        xhr.open('POST',"/Add/info",true)

        xhr.onreadystatechange=()=>{
          
            if(xhr.status === 200 && xhr.readyState === 4)
        {

               let data = JSON.parse(xhr.response)

                e.textContent= value == 'tolat' ||  value == 'Expenses' ? data.count.toFixed(2) :  data.count ;
               index=  index +  50
                notification (UserTable[value], e.textContent ,index)
        }
        }
        let dataForm= new FormData()
              dataForm.append('table',UserTable[value])


        xhr.send(dataForm)


}
 setInterval(()=>{
      index=20
    info.forEach((e,i) => {
        setTimeout(()=>{
                if (e.getAttribute('data-table') != undefined ) {

                 getTolal(e,e.getAttribute('data-table'));
                     }

        }, 1625)
      
});
},9750 )

function notification (key,message,index)
{
    
    
    let div=document.createElement('div')
        div.className='notification'
        div.textContent=key +  "  :" +  message
        div.style.top=index + 'px'
    board.appendChild(div)
    div.style.animation=' all 5s  ease-in-out '
      setTimeout(() => {
      div.remove()
     
    },( 30 * index));
}

