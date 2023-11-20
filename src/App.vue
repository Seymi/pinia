<script setup>
  import { ref, reactive } from 'vue';

  import TheHeader from "@/components/TheHeader.vue";
  import ProductCard from "@/components/ProductCard.vue";

  import { useProductStore } from "@/stores/ProductStore.js";
  import { useCartStore } from "@/stores/CartStore.js";

  import { useAuthUserStore } from "@/stores/AuthUserStore.js";
  const authUserStore = useAuthUserStore();
  authUserStore.addDemoUser();

  const productStore = useProductStore();
  productStore.fill();

  const cartStore = useCartStore();

  const recordHistory = ref(true);
  const history = reactive([]);

  // products removed by undo will be saved to get them for redo
  const redoList = reactive([]);
  const trackRedoList = ref(true);

  history.push( JSON.stringify(useCartStore.$state) );

  console.log('HL: ', history.length);

  const redo = () => {
    if (redoList.length > 0 ) {
      const recoverOrder = redoList.slice(-1);
      history.push(recoverOrder);
      redoList.pop();

      recordHistory.value = false;
      cartStore.$state = JSON.parse(history.at(-1));
      recordHistory.value = true;
    }
  }

  const undo = () => {
    if (history.length === 1) return;
    // when cart is not empty, undo is recorded for redo
    trackRedoList.value = !cartStore.isEmpty;

    if (trackRedoList.value === true || history.length > 2 ) {
      recordHistory.value = false;
      const lastOrder = history.slice(-1);
      history.pop();
      redoList.push(lastOrder);

      if (history.length === 1) {
        console.log ('history  vor setEmpty: ', history);

        cartStore.setEmpty(); // dadurch wird history.length wieder 2
        trackRedoList.value = false;

        console.log ('hist len nach setEmpty: ', history.length);
        console.log ('history  nach setEmpty: ', history);
      } else {
        cartStore.$state = JSON.parse(history.at(-1));
        trackRedoList.value = true;
      }
      recordHistory.value = true;
    }
  }

  cartStore.$subscribe((mutation, state) => {
    if (recordHistory.value) {
      history.push( JSON.stringify(state) );
      //changes resets redoList, only undo is source for redo
      redoList.splice(0, redoList.length);
    }
  });

  cartStore.$onAction(({name, store, args, after, onError}) => {
    if (name==='addProducts') {
      after(() => {
        console.log(args[0]);
        console.log(args[1]);
      });
      onError((err) => {
        console.log('Fehler: ', err.message)
      })
    }
  })

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton :title="Math.max(history.length-2, 0)" @click="undo">undo</AppButton>
      <AppButton :title="redoList.length" class="ml-2" @click="redo">redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addProducts($event, product)"
      />
    </ul>
  </div>
</template>
