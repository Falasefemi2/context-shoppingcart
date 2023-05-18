import { formatCurrency } from "../common/formatCurrency"
import { Product } from "../common/type"
import { useCart } from "../context/ProductContext"


const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...'
    } else {
        return str
    }
}



const CartProduct = ({ image, title, price, description, id }: Product) => {
    const { cartDispatch } = useCart();

    const handleAddToCart = () => {
        cartDispatch({ type: 'ADD_TO_CART', payload: { id, title, price, description, image } });
        cartDispatch({ type: 'UPDATE_TOTAL_COST' });
      };
    
      const handleDeleteFromCart = () => {
        cartDispatch({ type: 'DELETE_FROM_CART', payload: id });
        cartDispatch({ type: 'UPDATE_TOTAL_COST' });
      };

      console.log(handleAddToCart);
      

    return (
        <div>
            <img src={image} alt="" className="w-full rounded-md mb-4 transform transition-all duration-500 hover:scale-110 ease-in" />
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{formatCurrency(price)}</p>
            <p className="text-gray-600">{truncateString(description, 100)}</p>
            <div className=" mt-3">

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
                Add To Cart
            </button>
            <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteFromCart}
        >
          Delete From Cart
        </button>

            </div>
        </div>
    )
}

export default CartProduct