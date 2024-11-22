import { useState } from "react";
import Input from "../InputField";
import { Link } from "react-router-dom"
import { Spin } from "antd";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice/userSlice"; 
import toast from "react-hot-toast";
import { useRequestApi } from "../../hooks/useRequestApi";

const LoginEl = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();

    const dispatch = useDispatch();

    const handleInputChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setIsLoading(true);
            const response = await useRequestApi('api/auth/login', 'POST', formData);
            console.log(response.user);
            dispatch(setUser({
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
            }));
            localStorage.setItem('token', response?.token)
            navigation('/');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = async () => {
        try {
            window.location.href = 'http://localhost:4000/api/auth/google';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-4 py-12 flex justify-center items-center bg-[#f2f2f2]">
            <div className="flex flex-col gap-4 justify-center bg-white shadow-lg p-8 rounded-xl">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-black text-center">Login to Continue</h2>
                    <p className="text-sm text-[#71717a] text-center">
                        Enter your details below to log into your account
                    </p>
                </div>

                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <Input type="email" name="email" ph="Email" data={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    <Input type="password" name="password" ph="Password" data={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />

                    <button type="submit" className="p-2 rounded-md bg-slate-900 text-white font-semibold active:scale-95" disabled={isLoading}>
                        {isLoading ? <Spin /> : "Login"}
                    </button>
                </form>

                <div className="flex items-center justify-center gap-2">
                    <div className="w-[30%] h-px bg-[#71717ab9]"></div>
                    <span className="text-xs text-[#71717a] capitalize whitespace-nowrap">or continue with socials</span>
                    <div className="w-[30%] h-px bg-[#71717a]"></div>
                </div>

                <div className="flex flex-col gap-2">
                    <button type="button" className="p-1 rounded-md active:scale-95 border shadow-sm font-semibold" onClick={handleClick}>Google</button>
                    <button className="p-1 rounded-md active:scale-95 border shadow-sm font-semibold" type="button">Facebook</button>

                    <p className="text-sm flex justify-between">  
                        <Link 
                            to={"/register"} 
                            className="text-blue-600 cursor-pointer font-semibold"
                        >
                            Register
                        </Link>

                         <Link 
                            to={'/Forget'}
                            className="text-blue-600 cursor-pointer font-semibold"
                        >
                            Forget Password
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginEl;
