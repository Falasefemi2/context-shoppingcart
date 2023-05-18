type childrenProp = {
    children: React.ReactNode
}

type ShoppingContext = {
    getItemQuantity: (id: number) => number
    increaseProductQuantity: (id: number) => void
    decreaseProductQuantity: (id: number) => void
    removeProduct: (id: number) => void
}

type CartItem = {
    id: number,
    quantity: number
}

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
};

export type {childrenProp, ShoppingContext, CartItem, Product}