'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddProduct() {
    const [identifier, setIdentifier] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validación de campos
        if (!identifier || !name || !description || !image) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor complete todos los campos',
            });
            setLoading(false);
            return;
        }

        try {
            // Realiza la solicitud POST al backend para agregar el producto
            const response = await axios.post('http://localhost:3000/products', {
                identifier,
                name,
                description,
                image
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado exitosamente',
                    text: 'El producto se ha creado correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Redirigir a la página principal después de agregar el producto
                setTimeout(() => {
                    router.push('/');
                }, 1500); // Esperar el cierre de la alerta antes de redirigir
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al agregar el producto',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Agregar Producto</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Complete los datos del producto para agregarlo a la base de datos.</p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                {/* Identificador */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Identificador</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Identificador del producto"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Nombre del Producto */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Nombre del Producto</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Nombre del producto"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Descripción del Producto */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Descripción</label>
                                    <textarea
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Descripción del producto"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Imagen (URL) */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Imagen (URL)</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="URL de la imagen"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                                <button 
                                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? 'Cargando...' : 'Crear Producto'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
