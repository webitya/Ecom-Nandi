import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Card } from "antd"

const ProductCardEl = ({ product }) => {
    return (
        <Card
            hoverable
            className="rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            cover={
                <div className="relative w-full h-[150px] overflow-hidden rounded-t-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                </div>
            }
        >
            {/* Product Name and Wishlist */}
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                </h3>
                <HeartOutlined className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300 ease-in-out text-md" />
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between">
                {product.discountPrice && (
                    <p className="text-sm text-gray-500 line-through">
                        ₹{product.discountPrice}
                    </p>
                )}
                <p className="text-md font-semibold text-green-600">
                    ₹{product.price}
                </p>
            </div>

            {/* Add to Cart Button */}
            <button
                className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:from-green-500 hover:to-blue-600 transform hover:scale-105"
            >
                <ShoppingCartOutlined />
                Add to Cart
            </button>
        </Card>
    )
}

export default ProductCardEl