import { defineStore, acceptHMRUpdate } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: '',
            user: {},
            roles: ['demo', 'admin'],
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
            const user = 'Demo - User';

            // const user = {
            //     username: 'Demo User',
            //     role: 'demo'
            // };
            this.addUser(user);
        },
        clickUser() {
            window.open('http://www.seymi.at/sechel/vue/gitprofile', '_blank');
            //window.open('http://www.seymi.at', '_blank');
        }
    },

    // getters: {
    //     username: () => 'Seymi'
    // }

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}
