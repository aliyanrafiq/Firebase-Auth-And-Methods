import {
  onAuthStateChanged,
  auth,
  signOut,
  updateEmail,
  sendEmailVerification,
  db,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "./firebase.js"

let name = document.getElementById("name")
let email = document.getElementById("email")
let main = document.getElementById("main")
let loader = document.getElementById("loader")
let updatedEmailBtn = document.getElementById("UpdatedEmailBtn")
let newEmail = document.getElementById("updateEmail")
let verifyEmail = document.getElementById("verifyEmail")


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log("doc", docSnap.data())
    if (location.pathname !== "/profile.html") {
      window.location.href = "profile.html"
    }
    loader.style.display = "none";
    main.style.display = "flex";
    // name.value = docSnap.data().name;
    name.innerHTML = docSnap.data().name
    email.innerHTML = user.email;
    console.log("user -->", user)

  } else {
    console.log("not login")
    if (location.pathname !== "/index.html" && location.pathname !== "/register.html") {
      window.location.href = "index.html"
    }
  }
  // sendEmailVerification(auth.currentUser)
  //   .then(() => {
  //     // Email verification sent!
  //     // ...
  //   });
  // const uid = user.uid;
  // console.log("user -->", user);

});

let logout = () => {
  signOut(auth).then(() => {
    console.log("Signout successful")
    window.location = "index.html"
  }).catch((error) => {
  });
}

let emailUpdate = () => {
  console.log("chal")
  // if (verifyEmail.value === ) {

  updateEmail(auth.currentUser, newEmail.value).then(() => {
    console.log("Email updated")
    // name.innerHTML = user.email.slice(0, user.email.indexOf("@"))
    // email.innerHTML = user.email;
  }).catch((error) => {
    console.log(error)
    console.log(auth.currentUser)
  });
}
// }

let update = async () => {
  let name = document.getElementById("updatedName")
  console.log("chal raha hai")
  const user = doc(db, "users", auth.currentUser.uid);

  // Set the "capital" field of the city 'DC'
  if (name.value === "") {
    alert("Please Enter Your Name");
  }
  else {

    await updateDoc(user, {
      name: name.value
    });
    window.location.href = "profile.html"
    console.log("Profile Updated")
  }
}

let deleteDocum = async () => {
  await deleteDoc(doc(db, "users", "6pdxyghnZJfdiYJbvONRPSxPZzk2"));
  console.log("Deleted")
  logout()
}

let deleteFild = async () => {
  const userRef = doc(db, 'users', '6pdxyghnZJfdiYJbvONRPSxPZzk2');

  // Remove the 'capital' field from the document
  await updateDoc(userRef, {
    photo: deleteField()
  });
  console.log("Delete Field")
}


updatedEmailBtn && updatedEmailBtn.addEventListener("click", emailUpdate)

let logoutBtn = document.getElementById("logoutBtn");

logoutBtn && logoutBtn.addEventListener("click", logout)

let updateName = document.getElementById("UpdateName");

updateName && updateName.addEventListener("click", update);

let deleteDocument = document.getElementById("deleteDoc");
deleteDocument && deleteDocument.addEventListener("click", deleteDocum);

let deleteFiled = document.getElementById("deleteFild");
deleteFiled && deleteFiled.addEventListener("click", deleteFild)





let addTodo = async () => {
  let todo = document.getElementById("todo");
  const docRef = await addDoc(collection(db, "todos"), {
    value: todo.value,
    timestamp: serverTimestamp(),
    status: "pending",
  });
  console.log("Document written with ID: ", docRef.id);
}

let addTodoBtn = document.getElementById("addTodoBtn");

addTodoBtn && addTodoBtn.addEventListener("click", addTodo)

let getAllTodos = async () => {
  const ref = query(collection(db, "todos"), orderBy('timestamp', 'asc'), where('status', ));
  const todoList = document.getElementById("todoList")
  const unsubscribe = onSnapshot(ref, (querySnapshot) => {
    todoList.innerHTML = ""
    querySnapshot.forEach((doc) => {
      console.log("timestamp", doc.data().timestamp.toMillis())
      todoList.innerHTML += `<li class="list-group-item">${doc.data().value}</li>`
    });
  });
}

getAllTodos();