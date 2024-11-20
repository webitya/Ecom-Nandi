'use client';

import React, { useEffect, useState } from "react";
import ImageUpload from "../uploadImageEl";
import { z } from "zod";

const productSchema = z.object({
    images: z.array(z.string()).min(1, "At least one image is required"),
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    discount: z
        .number({ invalid_type_error: "Discount must be a number" })
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot exceed 100"),
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, "Quantity must be at least 1"),
    category: z.string().nonempty("Category is required"),
});

const LOCAL_STORAGE_KEY = "productData";

export const AddProductHero = () => {
    const [imageUrl, setImageUrl] = useState([]);
    const [productData, setProductData] = useState({
        images: [],
        name: '',
        description: '',
        discount: '',
        quantity: '',
        category: '',
    });
    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]); // Initialize as empty array

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('productData');
        const savedImageData = localStorage.getItem('productImageList');

        // Ensure fileList is always an array even if no saved data
        if (savedData) {
            setProductData(JSON.parse(savedData));
        }
        if (savedImageData) {
            setFileList(JSON.parse(savedImageData)); // Default to an empty array if null
        }
    }, []);

    useEffect(() => {
        const urls = fileList.map((file) => file.url || file.preview);
        setProductData((prev) => ({
            ...prev,
            images: urls
        }));
    }, [fileList]);

    // Save productData to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('productData', JSON.stringify(productData));
        localStorage.setItem('productImageList', JSON.stringify(fileList)); // Save fileList, not productData
    }, [productData, fileList]); // Watch both productData and fileList

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = (newFileList) => {
        setFileList(newFileList); // Update fileList state
        setProductData((prevData) => ({
            ...prevData,
            images: newFileList.map(file => file.url || file.preview)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const validatedData = productSchema.parse({
                ...productData,
                discount: parseFloat(productData.discount),
                quantity: parseInt(productData.quantity),
            });
            console.log("Validated Data:", validatedData);
            setErrors({});

            // Clear saved data from localStorage after successful submission
            localStorage.removeItem('productData');
            localStorage.removeItem('productImageList');
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {/* Image Upload Component */}
                <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                    <label className="text-lg font-medium mb-2">Product Images <span className="text-red-500">*</span></label>
                    <ImageUpload onUpload={handleImageUpload} setProductData={setProductData} fileList={fileList} setFileList={setFileList} />
                    {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                </div>

                {/* Name Input */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                        placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Description Input */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-lg font-medium mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 h-24"
                        placeholder="Enter product description"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Discount Input */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Discount (%)</label>
                    <input
                        type="number"
                        name="discount"
                        value={productData.discount}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                        placeholder="Enter discount percentage"
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                </div>

                {/* Quantity Input */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Quantity <span className="text-red-500">*</span></label>
                    <input
                        type="number"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                        placeholder="Enter available quantity"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-lg font-medium mb-1">Category <span className="text-red-500">*</span></label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="furniture">Furniture</option>
                        <option value="toys">Toys</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                {/* Submit Button */}
                <div className="col-span-1 md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductHero;
