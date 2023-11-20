import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";

import { useAuthUserStore } from "@/stores/AuthUserStore.js";
//

//authUserStore.addAdminUser();

//import axios from "axios";
//import products from "@/data/products.json";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            productsInCart: [],
        }
    },
    actions: {

        checkOut() {
            const authUserStore = useAuthUserStore();
            // ${authUserStore.username}

            alert(` ${authUserStore.username} just bought ${this.count} products at a total of € ${this.total.toFixed(2)}`);
        },

        addProducts(count, product) {
            count = parseInt(count);

            const debugmode = false;
            if (debugmode) {
                throw new Error("forced Error for testing purpose");
            }

            for (let i = 0; i < count; i++) {
                this.productsInCart.push({ ...product });
            }
        },

        removeAllSingleProductFromCart(name) {
            this.productsInCart = this.productsInCart.filter((element) => element.name !== name)
        },

        handleNewProductQuantityInCart(product, name, qty) {
            this.removeAllSingleProductFromCart(name);
            this.addProducts(qty, product);
        },

        setEmpty() {
            this.productsInCart = [];
        }


    },
    getters: {
        count: (state) => state.productsInCart.length,
        isEmpty: (state) => state.count === 0,

        grouped: (state) => {
            const grouped = groupBy(state.productsInCart, (item) => item.name);
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach((key) => (inOrder[key] = grouped[key]));
            return inOrder;
        },

        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.productsInCart.reduce((p, c) => p + c.price, 0),
    }

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
