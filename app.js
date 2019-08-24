(function() {
    //Initialize Firebase [here] {https://support.google.com/firebase/answer/7015592?hl=en}
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      };
      firebase.initializeApp(firebaseConfig);

    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // Add login event
    btnLogin.addEventListener('click', e => {
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add signup event
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://standy.firebaseapp.com/',
        handleCodeInApp: true,
      };

    btnSignUp.addEventListener('click', e=> {
        // Get email and pass
        //TODO: CHECK FOR REAL EMAIL
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        // const promise = auth.createUserWithEmailAndPassword(email, pass);
        // promise.catch(e => console.log(e.message));

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function() {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                alert('Please check your email for verification link');
                console.log('Please check your email for access');
        })
        .catch(function(error) {
            console.log('Email send has error.');
        });
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
        } else {
            console.log('User not logged in')
            btnLogout.classList.add('hide');
        }
    });

}());