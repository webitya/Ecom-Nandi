import { useRequestApi } from "../../hooks/useRequestApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate, useFetcher } from "react-router-dom";
import { useVerify } from "../../hooks/useVerify";


const Verify = () => {
    const { token } = useParams();
    const navigation = useNavigate();
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await useRequestApi(`api/auth/verify?token=${token}`, 'POST');
                console.log('response ', response)
                toast.success('verified successfully!')
                setTimeout(() => {
                    navigation('/login')
                }, 1000)
            } catch (error) {
                console.log("error ", error)
                setError(error?.response?.data?.message || error.message || 'some error')
                toast.error(error?.response?.data?.message || error.message || 'some error')
                setTimeout(() => {
                    navigation('/register')
                }, 2000)
            }
        }
        fetching();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {
                token ?
                    <div>
                        {error ? <p className="text-3xl font-bold text-red-600">
                            {error}
                        </p> : <p className="text-3xl font-bold text-green-600">
                            Verify...
                        </p>}
                    </div>
                    :
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-red-500">404</h1>
                        <p className="text-2xl">Page Not Found</p>
                        <a href="/" className="mt-4 text-blue-500">Go back to Home</a>
                    </div>
            }
        </div>
    );
}

export default Verify;
