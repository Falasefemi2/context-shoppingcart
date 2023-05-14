// import { createContext, useState } from "react";
// import { Product } from "../components/Products";

// type CartProp = {
//     items: Product[];
//     getProductQuantity: (id: number) => number;
//     addOneToCart: (id: number) => void;
//     removeOneFromCart: (id: number) => void;
//     deleteFromCart: (id: number) => void;
//     getTotalCost: () => number;
//   };

// interface ProductProviderProps {
//     children: React.ReactNode;
// }

// const CartContext = createContext<CartProp>({
//     items: [],
//     getProductQuantity: () => 0,
//     addOneToCart: () => { },
//     removeOneFromCart: () => { },
//     deleteFromCart: () => { },
//     getTotalCost: () => 0
// });

// export const ProductProvider = ({ children }: ProductProviderProps) => {
//     const [cartProduct, setCartProduct] = useState<Product[]>([])

//     const getProductQuantity = (id: number) => {
//         cartProduct.find(product => product.id === id)?.id
//         if (id === undefined) {
//             return 0;
//         }
//         return id
//     }

//     const addOneToCart = (id: number) => {
//         const quantity = getProductQuantity(id)

//         if (quantity === 0) {
//             setCartProduct([
//                 ...cartProduct,
//             ])
//         } else {
//             setCartProduct(
//                 cartProduct.map(
//                     product => product.id === id ? { ...product, quantity: product.id + 1 } : product
//                 )
//             )
//         }
//     }

//     const deleteFromCart = (id: number) => {
//         setCartProduct(
//             cartProduct => cartProduct.filter(currentproduct => {
//                 return currentproduct.id != id
//             })
//         )
//     }

//     const removeOneFromCart = (id: number) => {
//         const quantity = getProductQuantity(id);
//         if (quantity == 1) {
//             deleteFromCart(id)
//         } else {
//             setCartProduct(
//                 cartProduct.map(
//                     product => product.id === id ? { ...product, quantity: product.id - 1 } : product
//                 )
//             )
//         }
//     }

//     const getTotalCost = () => {

//     }

//     const cartValue = {
//         items: cartProduct,
//         getProductQuantity,
//         addOneToCart,
//         removeOneFromCart,
//         deleteFromCart,
//         getTotalCost,
//     };
//     return (
//         <CartContext.Provider value={cartValue}>
//             {children}
//         </CartContext.Provider>
//     );
// };


import { createContext,  useReducer } from "react";
import { Product } from "../components/Products";

type CartProp = {
  items: Product[];
  getProductQuantity: (id: number) => number;
  addOneToCart: (id: number) => void;
  removeOneFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  getTotalCost: () => number;
};

interface ProductProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartProp>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => { },
  removeOneFromCart: () => { },
  deleteFromCart: () => { },
  getTotalCost: () => 0
});

const cartReducer = (state: { items: any[]; }, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const getProductQuantity = (id: number) => {
    return cart.items.find(product => product.id === id)?.quantity || 0;
  };

  const addOneToCart = (id: number) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: id,
    });
  };

  const removeOneFromCart = (id: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const deleteFromCart = (id: number) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const getTotalCost = () => {
    return cart.items.reduce((acc, product) => acc + product.price, 0);
  };

  const cartValue = {
    items: cart.items,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};

export default ProductProvider;





