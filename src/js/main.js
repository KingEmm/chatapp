import '../styles/style.css'
import '../styles/chat.css'
// import { vite.svg }
import { Chat } from './ChatServices.mjs'
import { Auth } from './AuthServices.mjs';
import { errorMsg, getAndDisplay, loadMsg } from './utils';
import logo from '../assets/vite.svg';
import search from '../assets/search.svg';

const auth = new Auth();

if(!auth.isAuthenticated())
    window.location.href = '/'


document.querySelector('#app').innerHTML = `
    <main>
        <div class='modal'>
        </div>
        <header>
          <button id="open-menu" class="btn">&#9776;</button>
          <h1>Username</h1>
          <button id="logout" class="btn">Logout</button>
        </header>
        <section>
          <div class="msgs-container">

          </div>
          <div class="msg-container">
            <input class="input" id="msg" type="text" placeholder="Enter a message">
            <button id='send_btn' class="btn">Send</button>
          </div>
        </section>
      </main>
      <aside>
        <section class="info">
          <div class="as-heading">
            <img loading="lazy" src="${logo}" alt="Logo" width="30" height="30">
            <h2>Chat APP</h2>
          </div>
          <div class="search">
            <input class="input" type="text" placeholder="Search">
            <img loading="lazy" src="${search}" alt="Search Icon" width="30" height="30">
          </div>
        </section>
        <section class="recent_chats">
          <ul>
          </ul>
        </section>
        <a class="add_people" href="/people/index.html">ADD</a>
      </aside>
`

let chat = new Chat()

let messages = [];
let recent_chats = document.querySelector('.recent_chats ul')
let msg_container = document.querySelector('.msgs-container')
let aside = document.querySelector('aside')
let modal = document.querySelector('.modal')

document.querySelector('#open-menu').addEventListener('click', ()=>{
  aside.style.display = 'block';
  modal.style.display = 'block';
})

modal.addEventListener('click', ()=>{
  aside.style.display = 'none'
  modal.style.display = 'none'
})

let req = new URLSearchParams(window.location.search);

console.log(req.get('data'));

// var messageBody = document.querySelector('#messageBody');

document.querySelector('#logout').addEventListener('click', ()=> {
  new Auth().logout()
  window.location.href = '/';
})

let friends = chat.getAllUsers()
getAndDisplay(await friends, recent_chats)

let active_chat = sessionStorage.getItem('active_chat') || null;

if(active_chat != null){
  document.querySelector(`#${active_chat}`).classList.add('active');
}

if(await friends != []){
  recent_chats.addEventListener('click', async(e)=>{
      (active_chat != null)? document.querySelector(`#${active_chat}`).classList.remove('active'): console.log('No active chat.');
        msg_container.innerHTML = '';
        let ele = e.target.closest('li')
        ele.classList.add('active')
        sessionStorage.setItem('active_chat', ele.id)
        active_chat = ele.id;
        await chat.openChat(ele.id);
        messages = await chat.fetchMessages(sessionStorage.getItem('currentChatId'), msg_container, true);
        await loadMsg(messages, msg_container)
        // alert(ele.id)
    })
    if(active_chat != null){
      const send_btn = document.querySelector('#send_btn')

      send_btn.addEventListener('click', async()=>{
        send_btn.disabled = true;
        const input = document.querySelector('#msg')
        if(input.value.trimStart().trimEnd() != ''){
          console.log('sent')
          await chat.sendMessage(sessionStorage.getItem('currentChatId'), input.value)
          input.value='';
          messages = await loadMsg(await chat.fetchMessages(sessionStorage.getItem('currentChatId'), msg_container), msg_container);
          // await loadMsg(messages, msg_container)
          send_btn.disabled = false;
        }
        else{
          errorMsg(document.querySelector('body'), 'Enter a valid message before sending', 'hi')
          send_btn.disabled = false;
        }
        // send_btn.disabled = false;
      })
    }
}
setTimeout(()=>{
  msg_container.scrollTop = msg_container.scrollHeight - msg_container.clientHeight;
}, 6000)


setInterval(async() => {
  // alert(20)
  messages = await loadMsg(await chat.fetchMessages(sessionStorage.getItem('currentChatId'), msg_container), msg_container);

}, 5000);

console.log(messages)
