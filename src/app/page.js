'use client'; // Indica que este es un componente del cliente

import { useState, useEffect } from 'react'; // Importación correcta
import ProductTable from './components/ProductTable'; // Ruta correcta para tu componente
import axios from 'axios';
import Link from 'next/link';
import './styles/globals.css';  // Asegúrate de que el archivo global.css esté aquí

export default function Home() {
    const [products, setProducts] = useState([]);  // Aquí ya puedes usar useState

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
        <div>
            <ProductTable products={products} deleteProduct={deleteProduct} />
        </div>
    );
}
