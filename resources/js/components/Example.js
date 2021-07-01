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

    messaging
        .requestPermission()
        .then(function() {
            const token = messaging.getToken();
            console.log(token);
            return messaging.getToken();
        })
        .then(function(response) {
            console.log(response);
            $.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                    "Authorization":
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYyNTE2ODQzNCwiZXhwIjoxNjI1MjU0ODM0LCJuYmYiOjE2MjUxNjg0MzQsImp0aSI6ImJDUENrNURwSWs3TzRUNE8iLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.BczABQEghK-Br9ZIQM2tO8Vs-FEUzxaLIfbLncPExjc"
                }
            });
            $.ajax({
                url: "/api/store-token",
                type: "POST",
                data: {
                    token: response
                },
                dataType: "JSON",
                success: function(response) {
                    alert("Token stored.");
                },
                error: function(error) {
                    console.log(error);
                    alert(error);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
            alert(error);
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
