<template>
  <template v-if="cartStore.formattedCart.length">
    <q-list tag="ul">
      <q-item
        v-for="product in cartStore.formattedCart"
        :key="product.id"
        tag="li"
      >
        <ItemCard
          action="edit"
          :product="product"
        />
      </q-item>
    </q-list>
    <q-separator class="q-my-lg" />
    <div class="text-right text-h6 q-px-md">
      <div>
        <span class="q-mr-xs">Total items:</span>
        <span>{{ cartStore.totalCartItemsNumber }}</span>
      </div>
      <q-space />
      <div>
        <span class="q-mr-xs">Total price:</span>
        <Price :price="cartStore.totalCartPrice" />
      </div>
    </div>
  </template>
  <div v-else>
    Cart is empty!
  </div>
</template>

<script setup>
import { useCartStore } from '@/hocs/store/cart';

import ItemCard from '@/features/cart/ItemCard.vue';
import Price from '@/features/pricing/Price.vue';

const cartStore = useCartStore();
</script>