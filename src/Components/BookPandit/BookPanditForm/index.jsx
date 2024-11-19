'use client'

import React, { useState } from 'react';

export const BookPanditFormEl = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNo: '',
        pincode: '',
        state: '',
        streetOrVillage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Handle form submission here (e.g., send data to backend)
    };

    const display=(
      
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-sm shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Booking Pandit Now</h2>

            {/* Name Field */}
            <div className="mb-2">
                {/* <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label> */}
                <input
                    type="text"
                    placeholder='Enter Your Name'
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Contact Number Field */}
            <div className="mb-2">
                {/* <label htmlFor="contactNo" className="block text-gray-700 font-semibold mb-2">Contact No.</label> */}
                <input
                    type="tel"
                    placeholder='Mobile Number'
                    id="contactNo"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Address Fields */}
            <div className="mb-2">
                {/* <h3 className="text-lg font-semibold mb-2">Address</h3> */}

                {/* Street/Village Field */}
                <div className="mb-2">
                    {/* <label htmlFor="streetOrVillage" className="block text-gray-700 mb-2">Street or Village</label> */}
                    <input
                        type="text"
                        placeholder='Address'
                        id="streetOrVillage"
                        name="streetOrVillage"
                        value={formData.streetOrVillage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* State Field */}
                <div className="mb-2">
                    {/* <label htmlFor="state" className="block text-gray-700 mb-2">State</label> */}
                    <input
                        type="text"
                        placeholder='State Name'
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Pincode Field */}
                <div className="mb-2">
                    {/* <label htmlFor="pincode" className="block text-gray-700 mb-2">Pincode</label> */}
                    <input
                        type="text"
                        placeholder='Enter Pincode'
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-1 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
            >
                Book Now
            </button>
        </form>
 
    )
    return display
};

export default BookPanditFormEl;
