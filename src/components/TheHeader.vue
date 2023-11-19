<script>
import CartWidget from "@/components/CartWidget.vue";
import { useAuthUserStore } from "@/stores/AuthUserStore.js";
import { mapState } from "pinia";

//const useAuthUserStore = useAuthUserStore();

export default {
  components: { CartWidget },
  computed: {
    //...mapState (useAuthUserStore, ["user"])
    ...mapState (useAuthUserStore, {
      user: "username"

      //user: (store) => `Hello ${store.user.username.toLowerCase()}`
    })
  }
}

</script>

<template>
  <header
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <input v-model="user" type="text" />
      <span class="mr-2">{{ user }}</span>
      <CartWidget class="inline-block"/>
    </div>
  </header>
</template>
