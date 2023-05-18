import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CartProduct from './CartProduct';
import { Product } from '../common/type';
import { useCart } from '../context/ProductContext';
import { formatCurrency } from '../common/formatCurrency';


const Products = () => {
    const { cartState } = useCart();
    const getProducts = async (): Promise<Product[]> => {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        return response.data;
    };

    const { isLoading, isError, data, error } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: getProducts,
    });


    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error?.message}</span>;
    }

    return (
        <div>
            <h2>Total Cost: {formatCurrency(cartState.totalCost)}</h2>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data?.map((product) => (
                <div key={product.id} className="bg-white shadow-md rounded-md p-4 border-blue-500 border">
                    <CartProduct {...product} />
                </div>
            ))}
        </div>
        </div>
    );
}



export default Products;
