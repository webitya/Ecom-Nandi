
import { Link } from 'react-router-dom'
import Input from "../InputField";
import { useState } from "react";
import { Spin } from "antd";
import { useNavigate } from 'react-router-dom';
import { useRequestApi } from '../../hooks/useRequestApi';
import toast from 'react-hot-toast';

const RegisterEl = () => {
    const [checkMail, setCheckMail] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [isOpen, setIsopen] = useState(false)

    const handleInputChange = (name, value) => {
        setFormData(
            (prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            }
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            setIsLoading(true);
            const response = await useRequestApi('api/auth/register', 'POST', {
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
                password: formData.password,
            });
            console.log(response);
            setIsopen(true)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Please Try Again");
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = async () => {
        try {
            window.location.href = 'http://localhost:4000/api/auth/google';
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="px-4 py-12 flex justify-center items-center bg-[#f2f2f2]">
            <div className="flex flex-col gap-4 justify-center bg-white shadow-lg p-8 rounded-xl">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-black text-center">Create an Account</h2>
                    <p className="text-base text-[#71717a] text-center">
                        Enter your detail below to create new account
                    </p>
                </div>

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex gap-2 md:flex-row flex-col ">
                        <Input type='text' name='first_name' ph='First Name' data={formData.first_name} onChange={(e) => { handleInputChange('first_name', e.currentTarget.value) }} />
                        <Input type='text' name='last_name' ph='Last Name' data={formData.last_name} onChange={(e) => { handleInputChange('last_name', e.currentTarget.value) }} />
                    </div>
                    <Input type='email' name='email' ph='Email' data={formData.email} onChange={(e) => { handleInputChange('email', e.currentTarget.value) }} />
                    <Input type='password' name='password' ph='Password' data={formData.password} onChange={(e) => { handleInputChange('password', e.currentTarget.value) }} />
                    <button
                        type="submit"
                        className={`p-2 rounded-md bg-slate-900 text-white font-semibold active:scale-95`
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? <Spin /> : 'sign-up'}
                    </button>
                </form>

                <div className="flex items-center justify-center gap-2">
                    <div className="w-[30%] h-px bg-[#71717ab9]"></div>
                    <span className="text-xs text-[#71717a] capitalize">or continue with socials</span>
                    <div className="w-[30%] h-px bg-[#71717a]"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        className="p-1 rounded-md active:scale-95 border shadow-sm font-semibold"
                        onClick={handleClick}
                    >
                        Google
                    </button>

                    <button
                        className="p-1 rounded-md active:scale-95 border shadow-sm font-semibold"
                        type="button"
                    >
                        Facebook
                    </button>
                    <p className="text-sm self-center">
                        Already have an account?
                        <Link to={'/login'} className="text-blue-600 cursor-pointer font-semibold">log In</Link>
                    </p>
                </div>
            </div>'
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => { setIsopen(false) }}
                    ></div>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Check Your Email</h2>
                        <p className="text-gray-600">We've sent a verification email to your address. Please check your inbox.</p>
                        <button
                            onClick={() => setIsopen(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default RegisterEl;