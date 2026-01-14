<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn
        aria-label="Menu"
        dense
        flat
        icon="fas fa-bars"
        round
        @click="$emit('toggle-drawer')"
      />

      <q-toolbar-title>
        Shopping list
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
defineEmits(['toggle-drawer']);
</script>
