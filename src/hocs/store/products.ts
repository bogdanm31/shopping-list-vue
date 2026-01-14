import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import apiClient from '@/services/apiClient';

import type { Product } from '@/utils/types/product';
import { serializeProducts } from '@/utils/helpers/serialize';

export const useProductsStore = defineStore('products', () => {
  const error = ref(null);
  const products: Ref<Product[]> = ref([]);

  const checkStorage = () => {
    const savedProducts = localStorage.getItem('products');
    try {
      if (!savedProducts) {
        throw new Error('Something went wrong!');
      }
      products.value = JSON.parse(savedProducts as string);
      return true;
    } catch (err) {
      localStorage.clear();
    }
    return false;
  }

  const updateStorageProducts = (data: any) => {
    localStorage.setItem('products', JSON.stringify(data));
  }

  const updateProductPrice = (id: string, price: number) => {
    products.value = products.value.map((product: Product) => product.id !== id
      ? product
      : { ...product, price: Math.round(price * 100) / 100 }
    );
    updateStorageProducts(products.value);
  }

  const loadProducts = () => {
    // we have already loaded the products list or we have something in the storage, no longer need to fetch it
    if (products.value.length || checkStorage()) {
      return;
    }

    apiClient.get('products', { params: { length: 50 } }).then(({ data }: any) => {
      updateStorageProducts(
        serializeProducts(data)
      );
    }).catch((err) => {
      error.value = err.message;
    }).finally(() => {
      checkStorage();
    });
  };

  return {
    products,
    loadProducts,
    updateProductPrice
  };
})
