import {message,primaryID,FormSubmit,paginationView}from './min.js'
const UserID=document.getElementById('UsewrID').value;
const formSettings=document.getElementById('Form');
const userName=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('pass');
const cpassword=document.getElementById('cpass');
const URl='/Add/user';



let User={
    UserID:UserID,
    UserName:userName.value,
    Email:email.value,
    'new-password':password.value,
    ConfirmPassword:cpassword.value,
    varify:false,


}
FormSubmit('where',URl,[{UserID:UserID}],'').then(data=>{
    userName.value=data[0].UserName;
    email.value=data[0].Email;
    password.value=data[0].Password;
    cpassword.value=data[0].Password;
    console.log(data[0].Password.length);
    User.UserName=data[0].UserName;
    User.Email=data[0].Email;
    User['new-password']=data[0].Password;
    User.ConfirmPassword=data[0].Password;

})

 

userName.addEventListener('focusout',(e)=>{
    FormSubmit('UserNameVerification',URl,[{UserName:e.target.value}],'').then(data=>{
        if(data.success){
            userName.style.border='2px solid red';
              message('error-message', 'Username already exists');
            User.varify=true;
          
        }else{
            User.UserName=e.target.value;
            userName.style.border='2px solid green';
            User.varify=false;
        }

    });
});

    

email.addEventListener('input',(e)=>{
    User.Email=e.target.value;
})
password.addEventListener('input',(e)=>{
    User['new-password']=e.target.value;
})
cpassword.addEventListener('input',(e)=>{
    User.ConfirmPassword=e.target.value;
})


formSettings.addEventListener('submit',(e)=>{
    e.preventDefault();
       varify();
    if(User['new-password']!== User.ConfirmPassword){
           message('error-message', 'Passwords do not match');

        return;
    }
        if(User.varify){
           message('error-message', 'Please choose a different username');
        return;
    }
        if(User.UserName === '' || User.Email === '' || User.Password === ''){
           message('error-message', 'All fields are required');
        return;
    }
    
    // FormSubmit('update',URl,[User],formSettings).then(data=>{
    //     message('success-message', 'Settings updated successfully');
       
       
    // });

})
function varify(){
    let div=document.createElement('div');
    let btnbox=document.createElement('div');
    btnbox.className='button';

    div.className='varify-password';
    let boxInput=document.createElement('div');
    boxInput.className='input';
    let icon=document.createElement('icon');
    icon.className='fa fa-lock';
    let label=document.createElement('div');
        label.className='text-name';
    label.innerText='Enter your current password to change settings';
    let value=document.createElement('div');
        value.className='value';
    let input=document.createElement('input');
    input.type='password';
    input.name='varify-password';
    boxInput.appendChild(icon);
    div.appendChild(label);
    boxInput.appendChild(value);
    div.appendChild(boxInput);
    value.appendChild(input);
    let btn=document.createElement('button');
        btn.className='btn btn-varify';
        btn.type='button';
        btn.innerText='Varify';
    let btnClose=document.createElement('button');
        btnClose.className='btn btn-close';
        btnClose.type='button';
        btnClose.innerText='X';
    btnbox.appendChild(btn);
    btnbox.appendChild(btnClose);

    div.appendChild(btnbox);
    btn.addEventListener('click',()=>{
       if(input.value === ''){
              message('error-message', 'Please enter your current password');
       }else
       {
            FormSubmit('varify-password',URl,[{
                UserID:UserID,
                'new-password':input.value
            }]).then(data=>{
                if(data.success){
                    div.remove();
                    FormSubmit('update',URl,[User],formSettings).then(data=>{
                            if(data.success)
                            {
                                 message('success-message', 'Settings updated successfully');
                            }else{
                                 message('error-message', 'Failed to update settings');
                            }
                       
                    });
                }else{
                      message('error-message', 'Incorrect password');
                }
                    
            });
       }
    });
        btnClose.addEventListener('click',()=>{
        div.remove();
    });
    formSettings.parentElement.appendChild(div);


     
}