import {
  createUserWithEmailAndPassword,
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  googleProvider,
  FacebookAuthProvider,
  doc, 
  setDoc,
  db,
} from "./firebase.js"


let confirmation;

const register = () => {
  const phone = document.getElementById("phone")
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, `+${phone.value}`, appVerifier)
    .then((confirmationResult) => {
      console.log("confirmation Result", confirmationResult)

      alert("OTP sent to your phone number")
      confirmation = confirmationResult
      window.confirmationResult = confirmationResult;
    }).catch((error) => {
      console.log(error, "error")
    });
}




// const email = document.getElementById("email");
// const password = document.getElementById("password")

// console.log(email.value, password.value);

// createUserWithEmailAndPassword(auth, email.value, password.value)
// .then((userCredential) => {
//   const user = userCredential.user;
//   console.log("userRegister -->", user)
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log("RegisterError -->", errorMessage)
//   });
// }
let registerBtn = document.getElementById("registerBtn");
registerBtn && registerBtn.addEventListener("click", register);


let otpVerification = () => {
  let otp = document.getElementById("otp")
  confirmation.confirm(otp.value).then((result) => {
    const user = result.user;
    console.log("user -->", user)
  }).catch((error) => {
    console.log("error", error)
  });
}


let addUserToFirestore = async (user) => {
  const res = await setDoc(doc(db, "users", user.uid), {
    name: user.displayName,
    email: user.email,
    verify: user.emailVerified,
    photo: user.photoURL,
  });
  console.log("res", res)
}


let signWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("user -->", user)
      addUserToFirestore(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("error -->", errorMessage)

    });
}

let signWithFacebook = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log("user -->", user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log("error Message", errorMessage)
    });
}



let otpVerify = document.getElementById("otpVerify");
otpVerify.addEventListener("click", otpVerification);

let signInWithGoogle = document.getElementById("signInWithGoogle");
signInWithGoogle.addEventListener("click", signWithGoogle);

// signInWithFacebook
let signInWithFacebook = document.getElementById("signInWithFacebook");
signInWithFacebook.addEventListener("click", signWithFacebook);