import { computed, ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

import { useProductsStore } from './products';

import type {
  CartItem,
  CartProduct
} from '@/utils/types/cart';

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<CartItem[]> = ref([]);
  const productStore = useProductsStore();

  const formattedCart = computed(() => {
    if (!productStore.products.length) {
      return [];
    }
    return cart.value.reduce((acc: CartProduct[], { id, quantity }: CartItem) => {
      const product = productStore.products.find(p => p.id === id);
      if (!product) {
        removeFromCart(id);
        return acc;
      }
      return [...acc, { ...product, quantity }];
    }, []);
  });

  const totalCartPrice = computed(() => formattedCart.value.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0
  ));

  const totalCartItemsNumber = computed(() => cart.value.reduce(
    (acc: number, item) => acc + Number(item.quantity),
    0
  ));

  const loadCart = () => {
    if (cart.value.length) {
      return;
    }

    const savedProducts = localStorage.getItem('cart');
    if (!savedProducts) {
      return;
    }
    cart.value = JSON.parse(savedProducts as string);
  };

  const checkItem = (id: string) => cart.value.find(item => item.id === id);

  const addToCart = (id: string, quantity: number) => {
    if (checkItem(id)) {
      cart.value = cart.value.map(item => item.id !== id
        ? item
        : {id, quantity: item.quantity + quantity}
      );
    } else {
      cart.value.push({
        id,
        quantity
      });
    }
    saveCart();
  };

  const updateItem = (id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }
    cart.value = cart.value.map(item => item.id !== id
      ? item
      : {...item, quantity}
    );
    saveCart();
  }

  const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(item => item.id !== id);
    saveCart();
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }

  return {
    formattedCart,
    totalCartPrice,
    totalCartItemsNumber,
    addToCart,
    checkItem,
    loadCart,
    removeFromCart,
    updateItem
  };
});