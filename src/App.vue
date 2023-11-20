<script setup>

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
