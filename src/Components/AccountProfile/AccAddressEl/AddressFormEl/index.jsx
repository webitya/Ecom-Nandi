import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { z } from 'zod';

const addressSchema= z.object({
    name: z.string().min(1, 'Enter your name'),
    phone: z.string()
    .min(10 ,'Contact must be atleat 10 digit')
    .max(10,'Contact must be atleat 10 digit')
    .regex(/^[1-9]\d*$/, "Enter a valid Contact"),
    street: z.string().min(1, 'Enter your street'),
    city: z.string().min(1,'Enter your city'),
    postalCode: z.string()
    .min(6, 'Postal Code must be at leat 6 digit')
    .regex(/^[1-9]\d*$/, "Enter a valid Postal Code"),
    state: z.string().min(1, 'Enter your State')
});

const AddAddressForm = () => {
    const [newAddress, setNewAddress] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        postalCode: '',
        state: '',
    });

    const [schemaError, setSchemaError]= useState({})

    // const navigation =useNavigate()
    
    const handleSaveAddress = (e) => {
        e.preventDefault()
        const result= addressSchema.safeParse(newAddress);
        console.log(result)
        if(result.success){
            console.log()
            toast.success("Address added successfully!");
        }else{
            const errorMap = result.error.errors.reduce((acc, curr) => {
              acc[curr.path[0]] = curr.message; // Field name and error message
              return acc;
            }, {});
            console.log(errorMap)
            setSchemaError(errorMap);
        }
    };

    const handleChange= (e) => {
        const { name,value }= e.target
        setNewAddress({ ...newAddress, [name]: value })
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Address</h2>
            <form className="flex flex-col gap-2" onSubmit={handleSaveAddress}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name"
                    value={newAddress.name}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.name && <p className='text-red-500'>{schemaError.name}</p>}
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone Number"
                    value={newAddress.phone}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.phone && <p className='text-red-500'>{schemaError.phone}</p>}
                <input 
                    type="text" 
                    name="street" 
                    placeholder="Street Address"
                    value={newAddress.street}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.street && <p className='text-red-500'>{schemaError.street}</p>}
                <input 
                    type="text" 
                    name="city" 
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.city && <p className='text-red-500'>{schemaError.city}</p>}
                <input 
                    type="text" 
                    name="postalCode" 
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={handleChange}
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.postalCode && <p className='text-red-500'>{schemaError.postalCode}</p>}
                
                <input 
                    type="text"
                    name="state" 
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleChange} 
                    className="mb-2 px-3 py-1 text-sm  rounded-sm hover:outline focus:outline outline-1 outline-blue-500"
                />
                {schemaError.state && <p className='text-red-500'>{schemaError.state}</p>}

                <div className='flex '>
                    <button 
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-md font-bold"
                    >
                        Save Address
                    </button>
                    <button
                        type='button'
                        className='text-blue-500 ml-4'
                    >
                        Cancel
                    </button>
                </div>

            </form>
            
        </div>
    );
};

export default AddAddressForm;