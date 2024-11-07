import { createSlice } from '@reduxjs/toolkit';

const initialState = {}; // Initialize with an empty object to store user carts

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      
      // Initialize the user's cart if it doesn't exist
      if (!state[userId]) {
        state[userId] = [];
      }

      const existingProduct = state[userId].find(item => item.id === product.id);

      // Update quantity if the product already exists, otherwise add it to the cart
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state[userId].push({ ...product, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const { userId, productId } = action.payload;
      const product = state[userId]?.find(item => item.id === productId);

      // Increment the product quantity if it exists
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { userId, productId } = action.payload;
      const product = state[userId]?.find(item => item.id === productId);

      // Decrement quantity or remove the product if it reaches zero
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state[userId] = state[userId].filter(item => item.id !== productId);
        }
      }
    },
    removeItem: (state, action) => {
      const { userId, productId } = action.payload;
      // Remove the product from the user's cart
      if (state[userId]) {
        state[userId] = state[userId].filter(item => item.id !== productId);
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      // Clear the user's cart
      if (state[userId]) {
        state[userId] = [];
      }
    },
  },
});

// Export actions for use in components
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;