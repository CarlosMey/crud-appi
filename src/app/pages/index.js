import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from '@/components/ProductTable';
import Link from 'next/link';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Product List</h1>
            <Link href="/add-product">
                <button className="bg-green-500 text-white p-2 rounded mb-4">Add Product</button>
            </Link>
            <ProductTable products={products} deleteProduct={deleteProduct} />
        </div>
    );
}
