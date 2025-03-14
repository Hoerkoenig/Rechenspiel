document.addEventListener('DOMContentLoaded', () => {
    const googleLoginBtn = document.getElementById('google-login');
    const facebookLoginBtn = document.getElementById('facebook-login');
    const emailLoginBtn = document.getElementById('email-login');
    const emailSignupBtn = document.getElementById('email-signup');

    // 🔹 Google Login
    googleLoginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(userCredential => {
            saveUserToDatabase(userCredential.user);
        }).catch(error => console.error(error));
    });

    // 🔹 Facebook Login
    facebookLoginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(userCredential => {
            saveUserToDatabase(userCredential.user);
        }).catch(error => console.error(error));
    });

    // 🔹 E-Mail Login
    emailLoginBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                saveUserToDatabase(userCredential.user);
            })
            .catch(error => alert(error.message));
    });

    // 🔹 Registrierung mit E-Mail
    emailSignupBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                saveUserToDatabase(userCredential.user);
            })
            .catch(error => alert(error.message));
    });

    // 🔹 Speichert den Benutzer in die Firebase-Datenbank
    function saveUserToDatabase(user) {
        const userRef = firebase.database().ref('users/' + user.uid);

        userRef.once('value', snapshot => {
            if (!snapshot.exists()) {
                userRef.set({
                    email: user.email,
                    level: 1, 
                    b1: false, b2: false, b3: false, b4: false, 
                    b5: false, b6: false, b7: false, b8: false, 
                    zb1: 0, zb2: 0, zb3: 0, zb4: 0, 
                    zb5: 0, zb6: 0, zb7: 0, zb8: 0
                }).then(() => {
                    console.log('Benutzer zur DB hinzugefügt.');
                    window.location.href = 'dashboard.html';
                });
            } else {
                console.log('Benutzer existiert bereits.');
                window.location.href = 'dashboard.html';
            }
        });
    }
});
