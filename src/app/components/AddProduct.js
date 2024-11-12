// src/app/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description };
        await axios.post('http://localhost:3000/products', newProduct);
        alert('Product added successfully');
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Product Name</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Product Description</label>
                    <textarea 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
