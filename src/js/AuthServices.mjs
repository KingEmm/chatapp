import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

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

    isAuthenticated(auth=this.auth, redirect){
        onAuthStateChanged(auth, (user)=>{
            if(user){
                // console.log(user.uid);
                window.location.href = redirect
                
            }
            else{
                // window.location.href = '/'
                console.log('user.uid');
                // return false;
            }
        })
        // return isAuth;
    }
    isNotAuthenticated(auth=this.auth){
        onAuthStateChanged(auth, (user)=>{
            if(!user){
                // console.log(user.uid);
                window.location.href = '/'
                
            }
            else{
                // window.location.href = '/'
                console.log(user.uid);
                // return false;
            }
        })
        // return isAuth;
    }

    async login(_auth = this.auth, _email = this.email, _password=this.password) {
        const userInfo = await signInWithEmailAndPassword(_auth, _email, _password)
        const user = userInfo.user;
    }
    
    async signUp(_auth = this.auth, _email = this.email, _password = this.password){
        const userInfo = await createUserWithEmailAndPassword(_auth, _email, _password)
        const user = userInfo.user;
        await setDoc(doc(db, "users", user.uid), {email: user.email, createdAt: new Date(),});
    }
}
