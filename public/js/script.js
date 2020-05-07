 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDb43T-JejidZev3wlKTI-D7MnKNHHRRp0",
    authDomain: "super-awesome-ninjah-todoapp.firebaseapp.com",
    databaseURL: "https://super-awesome-ninjah-todoapp.firebaseio.com",
    projectId: "super-awesome-ninjah-todoapp",
    storageBucket: "super-awesome-ninjah-todoapp.appspot.com",
    messagingSenderId: "807682571217",
    appId: "1:807682571217:web:4ec05b4d7df0fc709a3ef0",
    measurementId: "G-3BHEM5DSRB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


document.querySelector('button').addEventListener('click', () => {
    
    // Kika vad som finns i input
    let text = document.querySelector('#todo').value;

    // Skapa ett JS-objekt ( Todo )
    let todo = {
        text: text,
        done: false
    };

    // Slänga upp den i firestore
    db.collection('lists').doc('xch').collection('todos').doc().set(todo)
    .then(resp => console.log('DB updated!'))
    .catch(err => console.error(err))

})




// hämta data vid collection update
db.collection('lists').doc('xch').collection('todos').onSnapshot((snapshot) => {

    // empty ul
    document.querySelector('#todos').innerHTML = '';

    // Loopa igenom de dokument vi fått tillbaka från FB.
    snapshot.forEach(doc => {

        // FB-obj > JS-obj
        let obj = doc.data();

        // skapa li
        let el = document.createElement('li');

        // sätt ett data-id attr.
        el.setAttribute('data-id', doc.id);

        // Skriv in text i elementet
        el.innerHTML = obj.text;

        // om klart, lägg till .done class.
        if(obj.done) {
            el.classList.add('done');
        }

        // lyssna efter klick
        el.addEventListener('click', (e) => {
            handleClick(e);
        })

        // Släng in det i ul#todos.
        document.querySelector('#todos').appendChild(el);

    })
})


function handleClick(e) {

    let docId = e.target.getAttribute('data-id');

    if(e.altKey) {
    
        // remove todo
        db.collection('todos').doc(docId).delete();

    } else {

        // update todo
        if(e.target.classList.contains('done')) { 
        
            // Set to false
            db.collection('todos').doc(docId).update({ done: false })
            .catch(err => console.error(err))
        
        } else {

            // set to true
            db.collection('todos').doc(docId).update({ done: true })
            .catch(err => console.error(err))
        }
    }
}

// Login 
document.querySelector('#login').addEventListener('click', () => {

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    // Login
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => console.log(user))
    .catch(err => console.error(err))

})



document.querySelector('#logout').addEventListener('click', () => {

    firebase
    .auth()
    .signOut()
    .catch(err => console.error(err))

})


firebase.auth().onAuthStateChanged((user) => {

    let stateNotice = document.querySelector('footer p');

    if(user){

        console.log('We are logged in!')
        stateNotice.innerHTML = 'Du är inloggad!'


    } else {
        console.log('We are NOT logged in!')
        stateNotice.innerHTML = 'Du är utloggad!'
    }

})