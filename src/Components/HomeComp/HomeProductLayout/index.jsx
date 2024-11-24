import React from "react";
import { Card, Row, Col } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

// Importing product data directly within this file
import HomeProductData from "./HomeProductData";

const HomeProductsLayoutEl = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-screen-xl w-full">
        <Row
          gutter={[24, 24]}
          className="flex justify-center"
        >
          {HomeProductData.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={5}>
              <Card
                hoverable
                className="rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out bg-white"
                cover={
                  <div className="relative w-full h-60">
                    <img
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                  </div>
                }
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <HeartOutlined className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300 ease-in-out" />
                </div>

                <div className="mt-2 flex items-center justify-between">
                  {product.discountPrice && (
                    <p className="text-gray-500 line-through text-sm">₹{product.discountPrice}</p>
                  )}
                  <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                </div>

                <button
                  className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:from-green-500 hover:to-blue-600 transform hover:scale-105"
                >
                  <ShoppingCartOutlined />
                  Buy Now
                </button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeProductsLayoutEl;
