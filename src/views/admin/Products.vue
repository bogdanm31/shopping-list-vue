<template>
  <template
    v-if="store.products.length"
  >
    <q-list
      class="row"
      tag="ul"
    >
      <q-item
        v-for="product in store.products"
        class="full-width col-12 col-md-6"
        :key="product.id"
        tag="li"
      >
        <AdminProductCard
          :product="product"
          @open-add-to-cart-modal="openAddToCartModal"
        />
      </q-item>
    </q-list>
    <AddToCart
      :model="showAddToCartModal"
      :product="editProduct"
      @add-to-cart="cartStore.addToCart"
      @before-hide="showAddToCartModal = false"
      @hide="editProduct.value = undefined"
    />
  </template>
  <div v-else>No products found!</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useProductsStore } from '@/hocs/store/products';
import { useCartStore } from '@/hocs/store/cart';

import AdminProductCard from '@/features/admin/product/AdminProductCard.vue';
import AddToCart from '@/features/products/modals/AddToCart.vue';

const editProduct = ref();
const showAddToCartModal = ref(false);
const store = useProductsStore();
const cartStore = useCartStore();

const openAddToCartModal = (id: string) => {
  editProduct.value = store.products.find(product => product.id === id);
  showAddToCartModal.value = true;
}
</script>