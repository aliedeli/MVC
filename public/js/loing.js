const loginForm=document.getElementById('loginForm');
const url='/App/loing';
loginForm.addEventListener('submit',function(event){
    event.preventDefault();
    const formData=new FormData(loginForm); 
    let myPromise= new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open('POST',url,true);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4 && xhr.status===200){
               console.log(xhr.response);
                resolve(JSON.parse(xhr.response));
            }
        }


        xhr.send(formData);
    }).then((data)=>{
       
        if(data.status){
           
             window.location.href=data.redirect;
        }
        else{
         document.querySelector('.message').textContent=data.message    
        }
    }   
    )

});
