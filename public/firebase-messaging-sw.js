// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js");

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
firebase.initializeApp({
    apiKey: "AIzaSyBZtJyq8vyVOeWI6y0MieoGWhL4O7ni_Yk",
    authDomain: "srmdynamics-b5c51.firebaseapp.com",
    projectId: "srmdynamics-b5c51",
    storageBucket: "srmdynamics-b5c51.appspot.com",
    messagingSenderId: "593711179812",
    appId: "1:593711179812:web:b7f56b65a2e62f1a3f90b1"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log("Message received.", payload);

    const title = "Hello world is awesome";
    const options = {
        body: "Your notificaiton message .",
        icon: "/firebase-logo.png"
    };

    return self.registration.showNotification(title, options);
});
