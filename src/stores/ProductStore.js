import { defineStore } from "pinia";
import axios from "axios";
//import products from "@/data/products.json";

export const useProductStore = defineStore("ProductStore", {
    state: () => {
        return {
            products: []
        }
    },
    actions: {
        async fill() {
            //this.products = products;
            //this.products = (await import("@/data/products.json")).default;

            const api_url = 'http://localhost:3000/products';

            this.products = (await axios.get(api_url)).data;

        }
    }

    // getters

});
