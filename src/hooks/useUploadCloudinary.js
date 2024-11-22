import axios from "axios";

export const useUploadCloudinary= async(file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
    try{
       const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData); 
        console.log(response)
        return response.data?.secure_url;
    }
    catch(error){
        console.log(error)
        return error;
    }  
}