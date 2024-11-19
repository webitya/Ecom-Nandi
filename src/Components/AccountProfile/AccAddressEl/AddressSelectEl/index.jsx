

import { useState } from 'react';
import { Radio, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const AddressSelection = ({ addresses, onSelectAddress, onEditAddress }) => {
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const handleSelectChange = (e) => {
        setSelectedAddressId(e.target.value);
        onSelectAddress(e.target.value); // Callback to parent to handle address selection
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Select or Edit Address</h2>

            {/* Radio buttons for address selection */}
            <div className="space-y-4">
                {addresses.map((address) => (
                    <div key={address.id} className="border-b pb-4 mb-4">
                        <Radio.Group
                            onChange={handleSelectChange}
                            value={selectedAddressId}
                            className="w-full"
                        >
                            <Radio value={address.id} className="flex items-center space-x-3">
                                <div>
                                    <p className="font-semibold">{address.name}</p>
                                    <p>{address.street}, {address.city}, {address.state} - {address.postalCode}</p>
                                    <p>Phone: {address.phone}</p>
                                </div>
                            </Radio>

                            {/* Edit and Select Default buttons */}
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    {!address.isDefault && (
                                        <Button
                                            type="link"
                                            onClick={() => onSelectAddress(address.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Select as Default
                                        </Button>
                                    )}
                                </div>
                                <Button
                                    type="link"
                                    onClick={() => onEditAddress(address.id)}
                                    icon={<EditOutlined />}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    Edit
                                </Button>
                            </div>
                        </Radio.Group>
                    </div>
                ))}
            </div>

            {/* Add New Address Button */}
            <div className="mt-6">
                <Button
                    type="primary"
                    onClick={() => onEditAddress(null)} // Pass null to indicate new address
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                >
                    Add New Address
                </Button>
            </div>
        </div>
    );
};

export default AddressSelection;
