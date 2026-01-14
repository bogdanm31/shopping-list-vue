<template>
  <GridCard>
    <template #thumbnail>
      <q-img
        :alt="product.name"
        :src="product.thumbnail"
      />
    </template>
    <div>{{ product.description }}</div>
    <template #title>
      {{ product.name }}
    </template>
    <template #actions>
      <div class="text-center">
        <q-btn
          :disable="product.quantity <= 1"
          label="-"
          :round="true"
          @click="updateQuantity(-1)"
        />
        <span class="q-mx-md">{{ product.quantity }}</span>
        <q-btn
          label="+"
          :round="true"
          @click="updateQuantity(1)"
        />
        <div class="text-center q-mt-sm">
          <span class="text-italic">&times; {{ product.price }} = </span>
          <Price :price="product.price * product.quantity" />
        </div>
      </div>

      <div class="col text-right">
        <slot name="actions">
          <q-btn
            color="negative"
            icon="delete"
            :round="true"
            size="sm"
            @click="cartStore.removeFromCart(product.id)"
          />
        </slot>
      </div>
    </template>
  </GridCard>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/hocs/store/cart';
import type { CartProduct } from '@/utils/types/cart';

import Price from '@/features/pricing/Price.vue';
import GridCard from '@/components/ui/GridCard.vue';

const {
  action,
  product
} = defineProps<{
  action: 'add' | 'edit',
  product: CartProduct
}>();

const emit = defineEmits<{
  (e: 'closeModal'): void;
  (e: 'updateQty', v: number): void;
}>();

const cartStore = useCartStore();

const updateQuantity = (incValue: number) => {
  if (!incValue || product.quantity + incValue <= 1) {
    return;
  }
  switch(action) {
    case 'add': {
      emit('updateQty', product.quantity + incValue);
      break;
    }
    case 'edit': {
      if (product.quantity + incValue < 1) {
        return;
      }
      cartStore.updateItem(product.id, product.quantity + incValue);
      break;
    }
  }
};
</script>