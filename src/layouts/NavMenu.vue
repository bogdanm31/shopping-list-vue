<template>
  <q-drawer
    :bordered="true"
    class="bg-grey-2"
    show-if-above
    :model-value="drawerOpen"
  >
    <q-list tag="nav">
      <q-item
        class="items-center"
        tag="a"
        :to="{ name: 'home' }"
      >
        Home
      </q-item>
      <q-item
        class="items-center"
        tag="a"
        :to="{ name: 'cart' }"
      >
        <q-item-section>
          Cart
        </q-item-section>
        <q-item-section
          v-if="cartStore.totalCartItemsNumber"
          class="col-auto text-right"
        >
          <q-badge>{{ cartStore.totalCartItemsNumber }}</q-badge>
        </q-item-section>
      </q-item>
      <q-item
        class="items-center"
        tag="a"
        :to="{ name: 'admin' }"
      >
        Admin
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { useCartStore } from '@/hocs/store/cart';

defineProps<{
  drawerOpen?: boolean
}>();

const cartStore = useCartStore();
</script>
