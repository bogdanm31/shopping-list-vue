<template>
  <q-dialog
    :model-value="model"
    @hide="hideCallback"
  >
    <q-layout>
      <ItemCard
        v-if="product"
        action="add"
        :product="{...product, quantity}"
        @add-to-cart="addToCart"
        @close-modal="$emit('beforeHide')"
        @update-qty="value => quantity = value"
      >
        <template #actions>
          <q-btn
            color="primary"
            label="Add to cart"
            :v-close-popup="true"
            @click="addToCart"
          />
          <q-space />
          <q-btn
            class="q-mr-md"
            color="primary"
            :flat="true"
            label="Cancel"
            :v-close-popup="true"
            @click="$emit('beforeHide')"
          />
        </template>
      </ItemCard>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useCartStore } from '@/hocs/store/cart';
import type { Product } from '@/utils/types/product';

import ItemCard from '@/features/cart/ItemCard.vue';

const {
  product
} = defineProps<{
  model: boolean
  product?: Product
}>();

const emit = defineEmits<{
  (e: 'beforeHide'): void;
  (e: 'hide'): void;
}>();

const cartStore = useCartStore();
const quantity = ref(1);

const hideCallback = () => {
  emit('hide');
  quantity.value = 1;
}

const addToCart = () => {
  if (!product) {
    return;
  }
  cartStore.addToCart(product.id, quantity.value);
  emit('beforeHide');
};
</script>