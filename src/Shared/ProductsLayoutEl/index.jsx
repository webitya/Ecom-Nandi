
import { StarFilled } from "@ant-design/icons";

export const ProductsLayoutEl = (({ dummyProducts = [], title = "" }) => {
  return (
    <div
      className="mx-auto flex flex-col gap-8 md:px-4 px-2 bg-gradient-to-br from-gray-50 to-gray-200 shadow-md"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="font-extrabold text-3xl md:text-4xl text-gray-800">{title}</h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden rounded-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                <StarFilled className="mr-1" /> 4.5
              </div>
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
              <p className="mt-1 text-sm text-gray-600">
                <span className="line-through text-gray-400">
                  ₹{product.discountPrice}
                </span>
                <span className="ml-2 font-bold text-green-600">₹{product.price}</span>
              </p>
              <button className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
