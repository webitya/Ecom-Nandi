
import { useDispatch } from "react-redux";
import { addProducts } from "../../redux/features/homeProductSlice/homeProductSlice";
import { HomeProductData } from "../HomeComp/HomeProductLayout/HomeProductData";

const LoadMore= () => {
    let data= [
        {id: 13, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 14, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 15, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 16, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 17, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 18, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 19, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 20, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 21, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 22, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
        {id: 23, name: 'Sunglasses', price: 1000, discountPrice: 2000, image: '/i3.jpeg'},
    ]
    const dispatch= useDispatch();

    function handleClick() {
        const updatedData= [...HomeProductData, ...data]
        dispatch(addProducts(updatedData));
    }

    return(
        <div className=" flex justify-center items-center p-4">
            <button 
            type="button" 
            className="px-4 py-3 bg-[#e4e4e4] text-gray-600  rounded-md shadow-md uppercase font-semibold active:scale-95"
            onClick={handleClick}
            >
                show more results
            </button>
        </div>
    );
}

export default LoadMore;