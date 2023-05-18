import { formatCurrency } from "../common/formatCurrency";
import { useCart } from '../context/ProductContext';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ExpandCartItem = () => {
  const { cartState, cartDispatch } = useCart();
  

  const handleIncreaseQuantity = (productId: number) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: 1 } });
  };

  const handleDecreaseQuantity = (productId: number) => {
    cartDispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: -1 } });
  };

  return (
    <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-white shadow-xl p-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Cart Items:</h3>
        {cartState.cartItems.map((cartItem) => (
          <div key={cartItem.product.id} className="flex items-center mb-4">
            <img src={cartItem.product.image} alt={cartItem.product.title} className="w-16 h-16 mr-4" />
            <div>
              <h4 className="text-lg font-semibold">{cartItem.product.title}</h4>
              <p className="text-sm text-gray-500">Price: {formatCurrency(cartItem.product.price)}</p>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(cartItem.product.id)}
                  className="bg-gray-200 px-2 py-1 rounded-l"
                >
                  <AiOutlineMinus />
                </button>
                <p className="px-2">{cartItem.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(cartItem.product.id)}
                  className="bg-gray-200 px-2 py-1 rounded-r"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mb-4">Total Cost: {formatCurrency(cartState.totalCost)}</h2>
    </div>
  );
};

export default ExpandCartItem;
