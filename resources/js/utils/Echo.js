import { default as _Echo } from "laravel-echo";
// @ts-ignore
window.Pusher = require("pusher-js");

export let Echo = null;

export const registerEcho = token => {
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
};

export const unregisterEcho = () => {
    if (Echo) {
        Echo.disconnect();
        Echo = null;
    }
};
