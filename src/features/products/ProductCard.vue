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
      <q-input
        class="col-6 col-sm-5 col-md-4"
        :dense="true"
        :hide-bottom-space="true"
        :model-value="product.price"
        :rules="[(val: string | number) => +val >= 0.01 || 'Minimum value is 0.01']"
        type="number"
        @update:model-value="updateProductPrice"
      />
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
import { useProductsStore } from '@/hocs/store/products';
import type { Product } from '@/utils/types/product';

import GridCard from '@/components/ui/GridCard.vue';

const {
  product
} = defineProps<{
  product: Product
}>();

defineEmits<{
  (e: 'openAddToCartModal', v: string): void
}>();

const productStore = useProductsStore();

const updateProductPrice = (value: string | number | null) => {
  if (!value || +value < 0.01) {
    return false;
  }
  productStore.updateProductPrice(product.id, +value);
};
</script>