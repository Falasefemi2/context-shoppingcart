import React, { createContext, useContext, useReducer } from 'react';
import { Product, childrenProp } from '../common/type';

// Define the types for the cart item and the cart state
type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  totalCost: number;
};

// Define the actions for adding, removing, and updating cart items
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'DELETE_FROM_CART'; payload: number }
  | { type: 'UPDATE_TOTAL_COST' };

// Create the cart context
const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}>({
  cartState: { cartItems: [], totalCost: 0 },
  cartDispatch: () => {},
});

// Define the cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.payload, quantity: 1 },
        ],
      };
    }

    case 'DELETE_FROM_CART': {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case 'UPDATE_TOTAL_COST': {
      const updatedTotalCost = state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      return {
        ...state,
        totalCost: updatedTotalCost,
      };
    }

    default:
      return state;
  }
};

// Create the CartProvider component
export const CartProvider = ({ children }: childrenProp) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cartItems: [],
    totalCost: 0,
  });

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
