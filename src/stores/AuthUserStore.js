import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            //username: 'Seymi_admin',
            user: {},
        }
    },

    actions: {
        addUser(user) {
            this.user = user;
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
                username: 'Demo User',
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
