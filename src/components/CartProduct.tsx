import { formatCurrency } from "../common/formatCurrency"
import { Product } from "./Products"
import { useContext } from "react"
import { CartContext } from "../context/ProductContext"



const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...'
    } else {
        return str
    }
}

const CartProduct = ({ image, title, price, description }: Product) => {
  const {addOneToCart} = useContext(CartContext)
  console.log(addOneToCart);
  
  
    
    
    return (
        <div>
            <img src={image} alt="" className="w-full rounded-md mb-4 transform transition-all duration-500 hover:scale-110 ease-in" />
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-2">{formatCurrency(price)}</p>
            <p className="text-gray-600">{truncateString(description, 100)}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add To Cart
            </button>

        </div>
    )
}

export default CartProduct