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

export function sendTokenToServer() {
    messaging
        .getToken({
            vapidKey:
                "BJWiG1SA-CMBjxpd9s2hDz2mikd9kJragE0C28I1TDi2uVjroSkgJKTvnLq3kQNAqZmAArwU97vdrx00_vv2APA"
        })
        .then(currentToken => {
            if (currentToken) {
                localStorage.setItem("FcmToken", currentToken);

                // Send the token to your server and update the UI if necessary
                console.log("New Token! ");

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
            }
        })
        .catch(err => {
            console.log("An error occurred while retrieving token. ", err);
        });
}

messaging.onMessage(payload => {
    const title = payload.notification.title;
    new Notification(title, { ...payload.notification });
});

export function removeTokenFromServer() {
    const token = localStorage.getItem("FcmToken");
    localStorage.removeItem("FcmToken");

    if (token) {
        console.log("Removing token from server");

        return axios
            .post("/api/delete-token", {
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
