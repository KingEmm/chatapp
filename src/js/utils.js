import { Chat } from "./ChatServices.mjs";

export async function get(url){
    try{
        let data = await fetch('url')
        data = await data.json()
        return data;
    }catch(error){
        console.log(error);
    }
}

export function errorMsg(selector, msg, type = 'error'){
    const msgBox = document.createElement('div')
    msgBox.classList.add('err_active')
    selector.appendChild(msgBox);
    msgBox.textContent= msg;
    msgBox.style.opacity= 1;
    
    let timeout = null;
    let count = 0;
    timeout = setInterval(()=>{
        count++
        if(count >= 5){
            msgBox.style.opacity= 0;
            // msgBox.textContent= '';
            selector.removeChild(msgBox);
            clearInterval(timeout);
        }
    }, 1000)
    // msgBox.classList.add('active')
}

export function loader(selector, loading){
    let loadEle = document.createElement('div')
    loadEle.classList.add('loading')
    if(loading){
        selector.classList.add('.center')
        selector.disabled=loading;
        selector.style.cursor = 'not-allowed'
        selector.innerHTML = '';
        selector.appendChild(loadEle);
    }
    else{
        selector.style.cursor = 'pointer'
        selector.disabled = loading;
        selector.innerHTML = document.querySelector('.active').textContent;
        selector.classList.remove('.center')
        // selector.removeChild(document.querySelector('.loading'));

    }
}

export async function getAndDisplay(arr=[], selector=document.querySelector('.recent_chats ul')){
    selector.innerHTML='';
    arr.forEach( item => {
        const ele = document.createElement('li');
        ele.id = item.id;
        ele.textContent = item.email;
        selector.appendChild(ele);
        console.log(item);
    })
}

export async function loadMsg(list, selector){
    selector.innerHTML='';
    list.forEach(msg =>{
        let msg_con = document.createElement('div');
        msg_con.classList.add('msg_con')
        let msg_ele = document.createElement('div');

        msg_ele.innerText = msg.fields.text.stringValue;
        (msg.fields.senderId.stringValue == localStorage.getItem('uid')) ? msg_ele.classList.add('sender') : msg_ele.classList.add('reciever');
        msg_con.appendChild(msg_ele)
        selector.appendChild(msg_con);
    })
}