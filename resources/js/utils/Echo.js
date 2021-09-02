import { default as _Echo } from "laravel-echo";
// @ts-ignore
window.Pusher = require("pusher-js");

export let Echo = null;
export let Channel = null;

export const registerEcho = (token, user) => {
    console.log("Registrando Eco");
    Echo = new _Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true,
        auth: {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    });

    console.log("Escuchando canal");
    Channel = Echo.private(`App.User.${user.id}`);
};

export const unregisterEcho = () => {
    if (Echo) {
        Echo.disconnect();
        Echo = null;
        Channel = null;
    }
};
