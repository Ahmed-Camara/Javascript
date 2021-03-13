// Get modal element

var modal = document.getElementById('simpleModal');

// Get open modal button

var modalBtn = document.getElementById('modal-btn');

// Get close modal button

var closeBtn = document.querySelector('.close-btn');

// Listen for open click on modal button

modalBtn.addEventListener('click', openModal);

// Listen for close click on modal button

closeBtn.addEventListener('click', closeModal);

// Listen for outside click

window.addEventListener('click',clickOutside);

//create openModal function

function openModal(){
  modal.style.display = 'block';
}

//create closeModal function
function closeModal(){
  modal.style.display = 'none';
}

//create closeModal function if outside click
function clickOutside(e){


  if(e.target === modal){
    modal.style.display = 'none';
  }
}


// FORM VALIDATION



const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');


//Show input error message

function showError(input,message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';

}

//Email

function isValidEmail(email)
{
    const re= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}





form.addEventListener('submit',function(e){
    e.preventDefault();

    if(username.value===''){
        showError(username,'Username is required');
    }
    else{
        showSuccess(username);
    }
    if(email.value===''){
        showError(email,'Email is required');
    }else if(!isValidEmail(email.value)){
        showError(email,'Email is not valid');
    }
    else{
        showSuccess(email);
    }

    if(password.value===''){
        showError(password,'Password is required');
    }
    else{
        showSuccess(password);
    }
    if(password2.value===''){
        showError(password2,'confirm password is required');
    }
    else{
        showSuccess(password2);
    }

    if(password.value !== password2.value){
      showError(password2,'password do not match');
    }


});
