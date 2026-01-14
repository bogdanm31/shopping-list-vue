<template>
  <span class="text-primary text-weight-bold">
    {{ formattedPrice }}
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { formatPrice } from '@/utils/helpers/price';

const {
  price
} = defineProps<{
  price: number
}>();

const formattedPrice = computed(() => formatPrice(price));
</script>