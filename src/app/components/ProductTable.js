import Link from 'next/link';
import { useState } from 'react';

export default function ProductTable({ products, deleteProduct }) {
    const [search, setSearch] = useState(''); 

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value); 
    };

    return (
        <section className="antialiased bg-gray-100 text-gray-600 min-h-screen px-4 py-8">
            <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">Lista de Productos</h2>
                    <Link href="/products/add">
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                            Agregar Producto
                        </button>
                    </Link>
                </div>
                
                <div className="px-6 py-4">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="p-4">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-sm text-left">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-3 whitespace-nowrap">ID</th>
                                    <th className="p-3 whitespace-nowrap">Identificador</th>
                                    <th className="p-3 whitespace-nowrap">Nombre del Producto</th>
                                    <th className="p-3 whitespace-nowrap">Descripción</th>
                                    <th className="p-3 whitespace-nowrap">Imagen</th>
                                    <th className="p-3 whitespace-nowrap text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product._id}>
                                            <td className="p-3">{product._id}</td>
                                            <td className="p-3">{product.identifier}</td>
                                            <td className="p-3">{product.name}</td>
                                            <td className="p-3">{product.description}</td>
                                            <td className="p-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    width="50"
                                                    height="50"
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="p-3 text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <Link href={`/products/update/${product._id}`}>
                                                        <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
                                                            Actualizar
                                                        </button>
                                                    </Link>
                                                    
                                                    <button
                                                        onClick={() => deleteProduct(product._id)}
                                                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">No se encontraron productos</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
