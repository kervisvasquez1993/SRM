import { apiURL } from "./App";

const firebaseConfig = {
    apiKey: "AIzaSyBZtJyq8vyVOeWI6y0MieoGWhL4O7ni_Yk",
    authDomain: "srmdynamics-b5c51.firebaseapp.com",
    projectId: "srmdynamics-b5c51",
    storageBucket: "srmdynamics-b5c51.appspot.com",
    messagingSenderId: "593711179812",
    appId: "1:593711179812:web:b7f56b65a2e62f1a3f90b1"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Esta función se ejecuta al iniciar sesión y se encarga de solicitar un nuevo token de Firebase Messagin
// y lo envia al server para que este lo registre en la base de datos
export function sendTokenToServer() {
    messaging
        .getToken({
            vapidKey:
                "BJWiG1SA-CMBjxpd9s2hDz2mikd9kJragE0C28I1TDi2uVjroSkgJKTvnLq3kQNAqZmAArwU97vdrx00_vv2APA"
        })
        .then(currentToken => {
            if (currentToken) {
                const oldToken = localStorage.getItem("FcmToken");

                // Si el token guardado es distinto al nuevo
                if (oldToken !== currentToken) {
                    console.log("New Token!");

                    // Enviar al server el token
                    axios
                        .post(`${apiURL}/push-notification`, {
                            token: currentToken
                        })
                        .then(response => {
                            // Se registro el token correctamente en el server
                            console.log("Token sended to the server!");
                            console.log(response);

                            // Guardar el token localmente
                            localStorage.setItem("FcmToken", currentToken);
                        });
                }
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

// Esta función se ejecuta cuando la pagina web esta en primer plano y se recibe un mensaje de Firebase Messaging
messaging.onMessage(payload => {
    const title = payload.notification.title;
    new Notification(title, { ...payload.notification });
});

// Esta función se llama cada vez que el usuario cierra sesión y se encarga de remover el token de Firebase Messaging del server
export function removeTokenFromServer() {
    messaging.deleteToken();

    const token = localStorage.getItem("FcmToken");
    localStorage.removeItem("FcmToken");

    if (token) {
        console.log("Removing token from server");

        // Enviar una peticion al server para borrar el token
        return axios
            .delete(`${apiURL}/push-notification`, {
                token
            })
            .then(response => {
                console.log("Token removed from the server!");
                console.log(response);
            })
            .catch(response => {
                console.log(response);
            });
    }
}
