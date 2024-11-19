
import { ProductsLayoutEl } from "../../../Shared/ProductsLayoutEl";




const ShCaPriceHighToLowEl = () => {
  const dummyProducts = [
    { id: 1, name: 'ShCaPriceHighToLowEl', price: 500, discountPrice: 1000, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 2, name: 'ShCaPriceHighToLowEl', price: 1200, discountPrice: 1500, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 3, name: 'ShCaPriceHighToLowEl', price: 800, discountPrice: 1200, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 4, name: 'ShCaPriceHighToLowEl', price: 300, discountPrice: 600, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 5, name: 'ShCaPriceHighToLowEl', price: 900, discountPrice: 1300, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 6, name: 'ShCaPriceHighToLowEl', price: 2500, discountPrice: 3000, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 7, name: 'ShCaPriceHighToLowEl', price: 400, discountPrice: 800, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 8, name: 'ShCaPriceHighToLowEl', price: 1500, discountPrice: 2000, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 9, name: 'ShCaPriceHighToLowEl', price: 700, discountPrice: 1000, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 10, name: 'ShCaPriceHighToLowEl', price: 500, discountPrice: 700, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 11, name: 'ShCaPriceHighToLowEl', price: 200, discountPrice: 500, image: 'https://imageonline.co/imageonline-image.jpg' },
    { id: 12, name: 'ShCaPriceHighToLowEl', price: 1000, discountPrice: 2000, image: 'https://imageonline.co/imageonline-image.jpg' },
  ];
   const display=(
    <>
       {/* <div className="mx-auto w-full flex flex-col gap-10 mt-7 p-5 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-xl"> */}
    <ProductsLayoutEl dummyProducts={dummyProducts} tittle="New Products" />
  {/* </div> */}
    </>
   )
   return display
}
export default ShCaPriceHighToLowEl