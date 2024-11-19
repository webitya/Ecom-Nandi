

import { useEffect, useState } from "react";
import { Card, Col, Row, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AccCartEl = () => {
  const dummyData = [
    {
      id: 1,
      name: "Wireless Headphones with Extra Long Name for Testing",
      description:
        "Noise-cancelling wireless headphones with superior sound quality, long-lasting battery, and comfortable design.",
      discount: 7499,
      quantity: 1,
      category: "electronics",
      images: ["https://via.placeholder.com/150"],
    },
    {
      id: 2,
      name: "Smartphone Case",
      description: "Durable and stylish case for smartphones.",
      discount: 599,
      quantity: 2,
      category: "accessories",
      images: ["https://via.placeholder.com/150"],
    },
  ];

  const [cartItems, setCartItems] = useState(dummyData);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigation =useNavigate()

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.discount * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (id, value) => {
    const roundedValue = Math.max(1, Math.round(value || 1));
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: roundedValue } : item
    );
    setCartItems(updatedItems);
  };

  const handleCheckout = () => {
    navigation("/checkout");
  };

  return (
    <div className="container mx-auto p-4" style={{ userSelect: "none" }}>
      {cartItems.length > 0 ? (
        <>
          <Row gutter={[16, 16]} justify="center">
            {cartItems.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.name}
                      src={item.images[0]}
                      className="object-contain h-40 w-full rounded-md"
                    />
                  }
                  actions={[
                    <button
                     key={2}
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => removeItem(item.id)}>
                      <DeleteOutlined /> Remove
                    </button>,
                  ]}
                  className="shadow-lg transition-transform transform  flex flex-col justify-between h-full rounded-xl"
                >
                  <h3 className="text-md font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm font-bold">
                      Price: ₹{item.discount.toLocaleString("en-IN")}
                    </p>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                      className="w-16"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Total: ₹
                    {(item.discount * item.quantity).toLocaleString("en-IN")}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h2 className="text-lg font-semibold">
                Total Price: ₹{totalPrice.toLocaleString("en-IN")}
              </h2>
              <p className="text-sm text-gray-600">
                Taxes and shipping will be calculated at checkout.
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 w-full sm:w-auto rounded-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors"
            onClick={() => navigation("/addProduct")}
          >
            Go to Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AccCartEl;
