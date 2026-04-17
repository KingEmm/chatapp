import { getAuth } from "firebase/auth";

import '../styles/style.css'
import '../styles/form.css'
// import { app } from './firebase';
import { Auth } from './AuthServices.mjs';
import { loader } from "./utils";

// let auth = getAuth(app);

// let ba = new Auth().isAuthenticated(auth)
// console.log(ba);

// new Auth().isAuthenticated(auth, '/chat/index.html')

console.log(new Auth().isAuthenticated())

if(new Auth().isAuthenticated())
    window.location.href = '/chat/index.html'

document.querySelector('body').innerHTML =`
<div class="auth-container">
  <div class="bt-toggle">
    <div id='login' class="bt login active">Login</div>
    <div id='signup' class="bt signup">Signup</div>
  </div>
    <h2 class="head">Login to View Chat</h2>
    
    <form method="post">

        <div class="form-group">
            <label for="email">Email:</label>
            <input class='input' required type="email" name="email" id="email" placeholder="jdoe@mail.com">
        </div>
        
        <div class="form-group">
            <label for="password">Password:</label>
            <input class='input' required type="password" name="password" id="password">
        </div>

        <div class="btns">
            <button type="submit" class="btn">Login</button>
        </div>
    </form>
    </div>
    <div class="err_active"></div>

`
let logedIn = true;

let logIn = document.querySelector('.bt-toggle #login');
let signUp = document.querySelector('.bt-toggle #signup');
let email = document.querySelector('input[type="email"]')
let password = document.querySelector('input[type="password"]')
let btns = document.querySelector('.btn')
let toggle = document.querySelector('.bt-toggle')
let h2 = document.querySelector('.head')

toggle.addEventListener('click', (e)=>{
    if (e.target.closest('.login')){
        logedIn = true;
        signUp.classList.remove('active');
        logIn.classList.add('active')
        
        h2.textContent='Login to View Chat';
        btns.innerHTML = 'Login';
        console.log("Login ...");
    }
    else{
        logedIn = false;
        
        signUp.classList.add('active');
        logIn.classList.remove('active')
        
        h2.textContent='Signup to Start Chatting';
        btns.innerHTML = 'Sign up';
        console.log("Signup ...");
    }

})


document.querySelector('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    // e.cancelable = true;
    // loader(document.querySelector('.btn'), true)
    
    new Auth().authenticate(logedIn, email.value, password.value)
    window.location.href = '/chat/index.html'

    // if(new Auth().isAuthenticated()){
    // }

    // loader(document.querySelector('.btn'), false)

    // if(logedIn){
    //     let authorisation =  new Auth()
    //     authorisation.login(lo, email.value, password.value)
    //     new Auth().isAuthenticated(auth, '/chat/index.html')
    // }
    // else{
    //     let authorisation =  new Auth()
    //     authorisation.signUp(auth, email.value, password.value)
    //     new Auth().isAuthenticated(auth, '/chat/index.html')
    // }

})