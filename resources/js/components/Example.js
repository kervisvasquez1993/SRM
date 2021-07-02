import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import axios from "axios";

var firebaseConfig = {
    apiKey: "AIzaSyBZtJyq8vyVOeWI6y0MieoGWhL4O7ni_Yk",
    authDomain: "srmdynamics-b5c51.firebaseapp.com",
    projectId: "srmdynamics-b5c51",
    storageBucket: "srmdynamics-b5c51.appspot.com",
    messagingSenderId: "593711179812",
    appId: "1:593711179812:web:b7f56b65a2e62f1a3f90b1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

function startFCM() {
    // messaging
    //         .requestPermission()
    //         .then(function () {
    //             const token = messaging.getToken();
    //             console.log(token)
    //             return messaging.getToken()
    //         }).then(function (response) {
    //             axios.post("/api/store-token") {

    //             }
    //         })

    // messaging
    //     .requestPermission()
    //     .then(function() {
    //         const token = messaging.getToken();
    //         console.log(token);
    //         return messaging.getToken();
    //     })
    //     .then(function(response) {
    //         console.log(response);
    //         $.ajaxSetup({
    //             headers: {
    //                 "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
    //                     "content"
    //                 ),
    //                 "Authorization":
    //                     `Bearer ${localStorage.getItem("auth")}`
    //             }
    //         });
    //         $.ajax({
    //             url: "/api/store-token",
    //             type: "POST",
    //             data: {
    //                 token: response
    //             },
    //             dataType: "JSON",
    //             success: function(response) {
    //                 alert("Token stored.");
    //             },
    //             error: function(error) {
    //                 console.log(error);
    //                 alert(error);
    //             }
    //         });
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //         alert(error);
    //     });

    messaging
        .getToken({
            vapidKey:
                "BJWiG1SA-CMBjxpd9s2hDz2mikd9kJragE0C28I1TDi2uVjroSkgJKTvnLq3kQNAqZmAArwU97vdrx00_vv2APA"
        })
        .then(currentToken => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                console.log("New Token! ");
                console.log(currentToken);

                axios
                    .post("/api/store-token", {
                        token: currentToken
                    })
                    .then(response => {
                        console.log("Token sended to the server!");
                        console.log(response);
                    });
            } else {
                // Show permission request UI
                console.log(
                    "No registration token available. Request permission to generate one."
                );
                // ...
            }
        })
        .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
        });
}

messaging.onMessage(function(payload) {
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    new Notification(title, options);
});

function Example() {
    const handleToast = () => {
        toast("✔️ La notificación funciona");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">
                            I'm an example component!
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => startFCM()}
                        >
                            Test Toast
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;
