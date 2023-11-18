import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            //username: 'Seymi_admin',
            users: [],
        }
    },

    actions: {
        addUser(user) {
            this.users.push(user);
        },
        addAdminUser() {
            const user = {
                username: 'Seymi_admin',
                role: 'admin'
            };
            this.addUser(user);
        },
        addDemoUser() {
            const user = {
                username: 'Demo',
                role: 'demo'
            };
            this.addUser(user);
        }
    }

    /*
    getters: {

    }
    */

});
