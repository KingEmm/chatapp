import '../styles/style.css'
import '../styles/chat.css'
import '../styles/people.css'
import { Chat } from "./ChatServices.mjs";
import { getAndDisplay } from "./utils";

let data = []

const body = document.querySelector('body');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
// body.innerHTML = ``;

getAndDisplay(await new Chat().getAllUsers(), ul)

ul.addEventListener('click', (e)=>{
    const ele = e.target.closest('li');
    if(!data.includes(ele.id))
        data.push(ele.id)
    console.log(data)
});

button.addEventListener('click', ()=>{
    if(data != [])
        window.location.href = `/chat/index.html?data=${JSON.stringify(data)}`
})