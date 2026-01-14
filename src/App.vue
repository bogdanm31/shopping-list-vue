<template>
  <q-layout view="lHh Lpr lFf">
    <Header
      @toggle-drawer="drawerOpen = !drawerOpen"
    />
    <NavMenu
      :drawer-open="drawerOpen"
    />

    <q-page-container>
      <main>
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { useProductsStore } from '@/hocs/store/products';
import { useCartStore } from '@/hocs/store/cart';

import Header from '@/layouts/Header.vue';
import NavMenu from '@/layouts/NavMenu.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();
const drawerOpen = ref(false);

onMounted(() => {
  // localStorage.clear();
  productsStore.loadProducts();
  cartStore.loadCart();
});
</script>

<style>
@import '@/assets/styles/main.scss';
</style>
