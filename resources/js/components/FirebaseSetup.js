import axios from "axios";
import { apiURL } from "./App";
import { DeviceUUID } from "device-uuid";

const uuid = new DeviceUUID().get();

const firebaseConfig = {
    apiKey: "AIzaSyBZtJyq8vyVOeWI6y0MieoGWhL4O7ni_Yk",
    authDomain: "srmdynamics-b5c51.firebaseapp.com",
    projectId: "srmdynamics-b5c51",
    storageBucket: "srmdynamics-b5c51.appspot.com",
    messagingSenderId: "593711179812",
    appId: "1:593711179812:web:b7f56b65a2e62f1a3f90b1"
};

firebase.initializeApp(firebaseConfig);

let messaging = null;
if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// Esta función se ejecuta al iniciar sesión y se encarga de solicitar un nuevo token de Firebase Messaging
// y lo envia al server para que este lo registre en la base de datos
export function sendTokenToServer() {
    if (messaging) {
        messaging
            .getToken({
                vapidKey:
                    "BJWiG1SA-CMBjxpd9s2hDz2mikd9kJragE0C28I1TDi2uVjroSkgJKTvnLq3kQNAqZmAArwU97vdrx00_vv2APA"
            })
            .then(newToken => {
                if (newToken) {
                    const oldToken = localStorage.getItem("FcmToken");

                    // Si el token guardado es distinto al nuevo
                    if (oldToken && oldToken !== newToken) {
                        axios.delete(`${apiURL}/push-notification/${oldToken}`);
                    }

                    console.log("New Token!");

                    // Enviar al server el token
                    axios
                        .post(`${apiURL}/push-notification`, {
                            value: newToken,
                            device_id: uuid
                        })
                        .then(response => {
                            // Se registro el token correctamente en el server
                            console.log("Token sended to the server!");
                            console.log(response);

                            // Guardar el token localmente
                            localStorage.setItem("FcmToken", newToken);
                            localStorage.setItem(
                                "FcmTokenId",
                                response.data.id
                            );
                        });
                } else {
                    // No se recibio ningun token
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch(err => {
                // Hubo un error al solicitar el token
                console.log("An error occurred while retrieving token. ", err);
            });
    }
}

// // Esta función se ejecuta cuando la pagina web esta en primer plano y se recibe un mensaje de Firebase Messaging
// messaging.onMessage(payload => {
//     const title = payload.notification.title;
//     new Notification(title, { ...payload.notification });
// });

// Esta función se llama cada vez que el usuario cierra sesión y se encarga de remover el token de Firebase Messaging del server
export function removeTokenFromServer() {
    if (messaging) {
        messaging.deleteToken();

        const tokenId = localStorage.getItem("FcmTokenId");
        localStorage.removeItem("FcmToken");
        localStorage.removeItem("FcmTokenId");

        if (tokenId) {
            console.log("Removing token from server");

            // Enviar una peticion al server para borrar el token
            return axios
                .delete(`${apiURL}/push-notification/${tokenId}`)
                .then(response => {
                    console.log("Token removed from the server!");
                    console.log(response);
                })
                .catch(response => {
                    console.log(response);
                });
        }
    }
}
