import { cartStore } from "./App.vue";

cartStore.$onAction(({ name, store, args, after, onError }) => {
    if (name === 'addProducts') {
        after(() => {
            console.log(args[0]);
            console.log(args[1]);
        });
        onError((err) => {
            console.log('Fehler: ', err.message);
        });
    }
});
