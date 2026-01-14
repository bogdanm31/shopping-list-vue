<template>
  <q-card
    class="card full-width overflow-hidden"
    tag="article"
  >
    <q-card-section class="row">
      <q-card-section class="product-thumb col-12 col-sm-4 col-md-3 q-pa-none text-center">
        <slot name="thumbnail" />
      </q-card-section>
      <q-card-section class="col-12 col-sm column q-pa-none">
        <h3 class="bg-primary q-pa-md text-subtitle1 q-my-none text-white text-weight-bold">
          <slot name="title" />
        </h3>
        <q-card-section class="col">
          <slot />
        </q-card-section>
        <q-separator />
        <q-card-actions class="q-px-md">
          <slot name="actions" />
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: 0 .125rem .75rem -.25rem $secondary;
}

.product-thumb {
  font-size: 0;
}
</style>