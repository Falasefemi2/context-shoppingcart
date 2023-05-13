import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
};

const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
        return str.slice(0, num) + '...'
    } else {
        return str
    }
}

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
            <div key={product.id} className="bg-white shadow-md rounded-md p-4">
                <img src={product.image} alt="" className="w-full rounded-md mb-4" />
                <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-600">{truncateString(product.description, 100)}</p>
            </div>
        ))}
    </div>

}



export default Products;
