import { useEffect, useState } from "react";
import ImageUpload from "../uploadImageEl";
import { z } from "zod";

const productSchema = z.object({
    images: z.array(z.string()).min(1, "At least one image is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    quantity: z.string().regex(/^[1-9]\d*$/, "Enter a valid value"),
    price: z.string().regex(/^[1-9]\d*$/, "Enter a valid positive value"),
    discountPrice: z.string().regex(/^[1-9]\d*$/, "Enter a valid positive value"),

    category: z.string().min(1, "Category is required"),
});

const LOCAL_STORAGE_KEY = "productData";

export const AddProductHero = () => {
    const [productData, setProductData] = useState({
        images: [],
        name: '',
        price: '',
        description: '',
        discountPrice: '',
        quantity: '',
        category: '',
    });
    const [errors, setErrors] = useState({});
    const [fileList, setFileList] = useState([]); // Initialize as empty array

    useEffect(() => {
        const savedData = localStorage.getItem('productData');
        const savedImageData = localStorage.getItem('productImageList');

        if (savedData) {
            setProductData(JSON.parse(savedData));
        }
        if (savedImageData) {
            setFileList(JSON.parse(savedImageData));
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
            console.log('Submitting product data:', productData);  // Debugging log

            const validatedData = productSchema.parse({
                ...productData,
                // quantity: parseInt(productData.quantity),  // Uncomment if you want to parse quantity as a number
            });

            console.log("Validated Data:", validatedData); // This will log the validated data

            setErrors({});

            // Clear saved data from localStorage after successful submission
            localStorage.removeItem('productData');
            localStorage.removeItem('productImageList');

            // Here, you can add further functionality after the successful form submission
            // For example, you could send the data to a backend server or trigger a success toast.

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors); // Set validation errors if any
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

                <div className="flex flex-col">
                    <label className="text-lg font-medium mb-1">Price <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                        placeholder="Enter product price"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
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
                    <label className="text-lg font-medium mb-1">Discount</label>
                    <input
                        type="string"
                        name="discount"
                        value={productData.discountPrice}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1"
                        placeholder="Enter product discount"
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