import { firebaseConfig } from "./firebase"
import { errorMsg, loader } from "./utils";
import { Auth } from "./AuthServices.mjs";

export class Chat{
    async getAllUsers() {
        const token = localStorage.getItem('token')

        try{
            const res = await fetch(`https://firebase-backend-0eq0.onrender.com/users`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            
            if(res.status != 200)
                errorMsg(document.querySelector('body'), res.json.error)
    
            return (data.documents || []).map(doc => {
                return {
                    id: doc.name.split('/').pop(),
                    email: doc.fields.email.stringValue
                }
            })
        }
        catch(error){
            errorMsg(document.querySelector('body'), error);
            return;
        }
    }

    async openChat(otherUserId){
        // console.log(otherUserId)
        const token = await new Auth().getValidToken();
        // const token = localStorage.getItem('token');

        const res = await fetch("https://firebase-backend-0eq0.onrender.com/chats", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ currentUserId: localStorage.getItem("uid"), otherUserId })
        });

        const data = await res.json();
        console.log(data);
        sessionStorage.setItem("currentChatId", data.chatId);

    }

    async sendMessage(chatId, text) {
        const token = await new Auth().getValidToken();

        await fetch(`https://firebase-backend-0eq0.onrender.com/chats/${chatId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                senderId: localStorage.getItem("uid"),
                text: text
            })
        });

            // messageInput.value = "";
        }

    
    async fetchChatList() {
        try {
            const token = await getValidToken();
            const uid = sessionStorage.getItem("uid");

            const response = await fetch("https://firebase-backend-0eq0.onrender.com/chats", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "x-user-id": uid
            }
            });

            const chats = await response.json();
            console.log(chats);

            return chats;

        } catch (error) {
            console.error("Failed to fetch chat list:", error);
        }
    }

    async fetchMessages(chatId, selector=document.querySelector('body')) {
        loader(selector, true)
        try {
            const token = await new Auth().getValidToken();
            
            const response = await fetch(`https://firebase-backend-0eq0.onrender.com/chats/${chatId}/messages`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // alert('hi')

            const messages = await response.json();
            console.log(messages);
            loader(selector, false)
            return messages;
            
        } catch (error) {
            loader(selector, false)
            console.error("Failed to fetch messages:", error);
        }
        loader(selector, false)
    }

}