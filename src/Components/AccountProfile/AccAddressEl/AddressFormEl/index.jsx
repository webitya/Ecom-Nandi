
import { useState } from 'react';
import { Button, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddAddressForm = () => {
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        postalCode: '',
        state: '',
    });

    const navigation =useNavigate()
    
    const handleSaveAddress = () => {
        if (!Object.values(newAddress).every((field) => field.trim())) {
            toast.error("Please fill in all fields.");
            return;
        }

        // Save the address (e.g., send it to the server or save in localStorage)
        toast.success("Address added successfully!");
        navigation('/checkout'); // Navigate back to the checkout page
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Address</h2>

            <Input
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className="mb-2"
            />
            <Input
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                className="mb-2"
            />
            <Input
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                className="mb-2"
            />
            <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="mb-2"
            />
            <Input
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                className="mb-2"
            />
            <Input
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                className="mb-4"
            />

            <Button
                type="primary"
                onClick={handleSaveAddress}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold"
            >
                Save Address
            </Button>
            <Button
                type="link"
                className="text-blue-500 ml-4"
                onClick={() => navigation('/checkout')}
            >
                Cancel
            </Button>
            
        </div>
    );
};

export default AddAddressForm;
