'use client';

import { useState } from 'react';
import AddressSelection from './AddressSelectEl';
import AddAddressForm from './AddressFormEl';

const AccAddressEl = () => {
    // Sample address data
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'John Doe',
            phone: '9876543210',
            street: '123 Main St',
            city: 'New York',
            postalCode: '10001',
            state: 'NY',
            isDefault: false,
        },
        // {
        //     id: 2,
        //     name: 'Jane Smith',
        //     phone: '9876543211',
        //     street: '456 Elm St',
        //     city: 'Los Angeles',
        //     postalCode: '90001',
        //     state: 'CA',
        //     isDefault: false,
        // },
    ]);

    const [selectedAddress, setSelectedAddress] = useState(null); // Store the selected address
    const [isEditing, setIsEditing] = useState(false); // Flag for editing

    // Handle address selection
    const handleSelectAddress = (addressId) => {
        const updatedAddresses = addresses.map((address) =>
            address.id === addressId ? { ...address, isDefault: true } : { ...address, isDefault: false }
        );
        setAddresses(updatedAddresses);
        setSelectedAddress(addressId); // Update selected address
    };

    // Handle address editing
    const handleEditAddress = (addressId) => {
        setIsEditing(true);
        setSelectedAddress(addressId); // Set selected address for editing
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Addresses</h2>

            {/* Address Selection Component */}
            <AddressSelection
                addresses={addresses}
                onSelectAddress={handleSelectAddress}
                onEditAddress={handleEditAddress}
            />

            {/* Show address form for adding or editing */}
            {isEditing && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Edit Address</h3>
                    <AddAddressForm
                        selectedAddress={addresses.find((address) => address.id === selectedAddress)}
                        setIsEditing={setIsEditing}
                    />
                </div>
            )}
        </div>
    );
};

export default AccAddressEl;
