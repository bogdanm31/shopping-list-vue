<template>
  <GridCard>
    <template #thumbnail>
      <q-img
        :alt="product.name"
        :src="product.thumbnail"
      />
    </template>
    <template #title>
      {{ product.name }}
    </template>
    {{ product.description }}
    <template #actions>
      <div class="col-6 col-sm-5 col-md-4">
        <Price :price="product.price" />
      </div>
      <div class="col text-right">
        <q-btn
          color="primary"
          icon="add_shopping_cart"
          :round="true"
          @click="$emit('openAddToCartModal', product.id)"
        />
      </div>
    </template>
  </GridCard>
</template>

<script lang="ts" setup>
import type { Product } from '@/utils/types/product';

import GridCard from '@/components/ui/GridCard.vue';
import Price from '@/features/pricing/Price.vue';

const {
  product
} = defineProps<{
  product: Product
}>();

defineEmits<{
  (e: 'openAddToCartModal', v: string): void
}>();
</script>