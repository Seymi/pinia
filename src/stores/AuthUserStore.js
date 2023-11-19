import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: '',
            //user: {},
        }
    },

    actions: {
        addUser(user) {
            this.username = user;
        },
        addAdminUser() {

            const user = 'Seymi_admin';
            // const user = {
            //     username: 'Seymi_admin',
            //     role: 'admin'
            // };
            this.addUser(user);
        },
        addDemoUser() {
            const user = 'Demo User';

            // const user = {
            //     username: 'Demo User',
            //     role: 'demo'
            // };
            this.addUser(user);
        }
    },

    // getters: {
    //     username: () => 'Seymi'
    // }

});
