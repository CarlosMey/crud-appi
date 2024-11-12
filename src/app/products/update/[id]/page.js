'use client'; // Directiva que indica que este es un componente de cliente

import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export default function UpdateProduct({ params }) {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: '',
        identifier: '', // Campo para el identificador
        _id: '' // ID del producto
    });

    useEffect(() => {
        if (params?.id) {
            // Obtener los datos del producto cuando se carga la página
            axios.get(`http://localhost:3000/products/${params.id}`).then((response) => {
                setProduct(response.data);
            });
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hacer el update del producto
            await axios.put(`http://localhost:3000/products/${params.id}`, product);
            
            // Mostrar la alerta de éxito con SweetAlert
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Redirigir a la lista de productos después de actualizar
            window.location.href = '/';
        } catch (error) {
            // Manejo de errores
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update the product.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-lg">
                <h1 className="text-2xl text-center mb-6">Update Product</h1>
                <form onSubmit={handleSubmit}>
                    {/* Campo para el identificador del producto */}
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-sm font-medium">Product Identifier</label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={product.identifier}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Campo para el nombre del producto */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Campo para la descripción */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Campo para la imagen */}
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Mostrar la imagen actual debajo del campo de URL */}
                    {product.image && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Current Image</label>
                            <img
                                src={product.image}
                                alt="Current Product"
                                className="w-full h-auto border border-gray-300 rounded-lg mt-2"
                            />
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}
