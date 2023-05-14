import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CartProduct from './CartProduct';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
};



const Products = () => {
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

    return <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data?.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-md p-4 border-blue-500 border">
                <CartProduct {...product} />
            </div>
        ))}
    </div>

}



export default Products;
