import { signInWithEmailAndPassword, auth } from "./firebase.js";

const login = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
  
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location = "profile.html"
        console.log("login user -->", user)
  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login error -->", errorMessage)
      });
  
  }
  
  
  let loginBtn = document.getElementById("loginBtn");
  
  loginBtn &&  loginBtn.addEventListener("click", login)