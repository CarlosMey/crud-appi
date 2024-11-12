'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UpdateProduct({ productId }) {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        const product = response.data;
        setIdentifier(product.identifier);
        setName(product.name);
        setDescription(product.description);
        setImage(product.image);
      } catch (error) {
        console.error('Error al obtener los datos del producto:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!identifier || !name || !description || !image) {
      alert('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/products/${productId}`, {
        identifier,
        name,
        description,
        image,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Producto actualizado!',
          text: 'El producto se ha actualizado correctamente.',
        }).then(() => {
          router.push('/products');
        });
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un error al actualizar el producto');
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
                <h2 className="leading-relaxed">Actualizar Producto</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Modifique los datos del producto para actualizarlo.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
                  {loading ? 'Cargando...' : 'Actualizar Producto'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
