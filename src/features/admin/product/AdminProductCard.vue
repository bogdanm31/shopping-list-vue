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
        v-model.number="newPrice"
        class="col-6 col-sm-5 col-md-4"
        :dense="true"
        :hide-bottom-space="true"
        :rules="[(val: string | number) => +val >= 0.01 || 'Minimum value is 0.01']"
        type="number"
      />
      <div class="col text-right">
        <q-btn
          v-if="newPrice !== product.price"
          color="primary"
          icon="save"
          :round="true"
          @click="updateProductPrice(newPrice)"
        />
      </div>
    </template>
  </GridCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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

const newPrice = ref(product.price);

const updateProductPrice = (value: string | number | null) => {
  if (!value || +value < 0.01) {
    return false;
  }
  productStore.updateProductPrice(product.id, +value);
};
</script>