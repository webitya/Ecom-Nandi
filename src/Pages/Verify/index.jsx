import { useRequestApi } from "../../hooks/useRequestApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
 

const Verify= () => {
    const {token}= useParams();
    const navigation= useNavigate();
    console.log(token)

    useEffect(() => {
       async function fetching () {
            return await useRequestApi(`api/auth/verify?token=${token}`);
        }

        try{
            const response = fetching();
            if(response.message){
                toast.success('verified!')
                setTimeout(()=> {
                    navigation('/login')
                },1000)
            }
        }catch(error) {
            toast.error('verification failed!')
            setTimeout(()=> {
                navigation('/register')
            },1000)     
        }

    }, [])

    return(
            <div className="flex flex-col items-center justify-center h-screen">
                {
                token?
                    <div>
                        <p className="text-3xl font-bold text-green-600">Verify...</p>
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
