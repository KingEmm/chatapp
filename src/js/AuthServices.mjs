// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase";
import { errorMsg, loader } from "./utils";

export class Auth{
    email;
    password;
    auth;

    // constructor(){}

    constructor(auth='', email='', password=''){
        this.email = email;
        this.password = password;
        this.auth= auth;
    }

    isAuthenticated(){
        // console.log(localStorage.getItem('token'))
        return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('refreshToken') !== null;
    }
    // isNotAuthenticated(auth=this.auth){
    //     onAuthStateChanged(auth, (user)=>{
    //         if(!user){
    //             // console.log(user.uid);
    //             window.location.href = '/'
                
    //         }
    //         else{
    //             // window.location.href = '/'
    //             console.log(user.uid);
    //             // return false;
    //         }
    //     })
    //     // return isAuth;
    // }

    // async login(_auth = this.auth, _email = this.email, _password=this.password) {


    //     // const userInfo = await signInWithEmailAndPassword(_auth, _email, _password)
    //     // const user = userInfo.user;
    // }
    
    async authenticate( _auth = false, email = this.email, password = this.password, ele=document.querySelector('button')){
        // let loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`;
        // let signUp = `https://identitytoolkit.googleapis.com/v1/accounts:signup?key=${firebaseConfig.apiKey}`;
        const loginUrl = 'https://firebase-backend-0eq0.onrender.com/login'
        const signUpUrl = 'https://firebase-backend-0eq0.onrender.com/signup'
        // console.log(email)
        // console.log(password)
        loader(ele, true);
        try{
            const res = await fetch(`${!_auth ? signUpUrl : loginUrl}`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'email':email, 'password':password})
            })
            if(res.status != 200){
                alert('Error Occured');
                // errorMsg(document.querySelector('body'), res.error);
                errorMsg(document.querySelector('body'), res.error);
                return;
            }
            console.log(res.status)
            const data = await res.json();
            if(data.error){
                errorMsg(document.querySelector('body'), data.error.message);
                return;
            }
            // loader(ele, false); 
            console.log(data);
            localStorage.setItem('token', data.idToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("expiresAt", data.expiresIn);
            localStorage.setItem("uid", data.localId);
            // localStorage.setItem("email", email);
        }catch(error){
            // alert(error)
            const selector= document.querySelector('body');
            errorMsg(selector ,error);
        }
        finally{
            loader(ele, false);
        }
        // const userInfo = await createUserWithEmailAndPassword(_auth, _email, _password)
        // const user = userInfo.user;
        // await setDoc(doc(db, "users", user.uid), {email: user.email, createdAt: new Date(),});
    }

    async getValidToken() {
        const idToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const expiresAt = Number(localStorage.getItem("expiresAt"));

        if (!idToken || !refreshToken || !expiresAt) {
            throw new Error("User is not authenticated");
        }

        const now = Date.now();

        if (now < expiresAt - 60_000) {
            return idToken;
        }

        const response = await fetch("https://firebase-backend-0eq0.onrender.com/refresh-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
        });

        const data = await response.json();

        if (!data.idToken) {
            throw new Error("Failed to refresh token");
        }

        sessionStorage.setItem("idToken", data.idToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        sessionStorage.setItem(
            "expiresAt",
            Date.now() + Number(data.expiresIn) * 1000
        );

        return data.idToken;
    }
    
    logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("uid");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("uid");
        window.location.href = "/login.html";
    }

}
