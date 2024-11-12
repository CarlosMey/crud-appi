import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UpdateProduct({ params }) {
    const [product, setProduct] = useState({ name: '', description: '', image: '' });

    useEffect(() => {
        if (params?.id) {
            axios.get(`http://localhost:3000/products/${params.id}`).then((response) => {
                setProduct(response.data);
            });
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/products/${params.id}`, product);
        alert('Product updated successfully!');
        window.location.href = '/'; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Update Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
            </form>
        </div>
    );
}
