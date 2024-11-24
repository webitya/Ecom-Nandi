

import { useEffect, useState } from "react";
import { Card, Col, Row, InputNumber } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AccCartEl = () => {
  const dummyData = [
    {
      id: 1,
      name: "Wireless Headphones with Extra Long Name for Testing",
      description:
        "Noise-cancelling wireless headphones with superior sound quality, long-lasting battery, and comfortable design.",
      price: '₹7499',
      quantity: 1,
      category: "electronics",
      images: ["https://via.placeholder.com/150"],
    },
    {
      id: 2,
      name: "Smartphone Case",
      description: "Durable and stylish case for smartphones.",
      price: 599,
      quantity: 2,
      category: "accessories",
      images: ["https://via.placeholder.com/150"],
    },
  ];

  return (
    <div className="px-12 py-6 ">
      <h2 className="sm:text-3xl text-xl font-bold mb-6 text-gray-800">Your Cart</h2>
      <div className="flex flex-col gap-4">
        {dummyData.map((items) => {
          return (
            <div className="p-6 bg-white shadow-lg rounded-lg flex gap-2 w-[840px] mx-auto" id={items.id}>
              <img src={dummyData[0].images} alt="product image" className="h-28 w-28" />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-xl font-semibold">{items.name}</h3>
                <p className="text-sm font-light whitespace-nowrap text-[#878787] text-ellipsis overflow-hidden w-[680px] ">
                  {items.description}
                </p>
                <span className="text-sm font-semibold text-[#878787] capitalize">{items.category}</span>

                <div className="flex justify-between">
                  
                  <div className="flex gap-4 items-center">
                    <p className="flex gap-3 items-center">
                      <span className="text-sm text-[#878787] line-through">{items.price}</span>
                      <span className="text-lg text-black">{'₹5499'}</span>
                    </p>

                    <p className="flex gap-3 items-center">
                      <PlusOutlined className="border boredr-[#878787] rounded-full p-2" />
                      <span className="w-10 h-6 border border-black outline-none px-4" >{items.quantity}</span>
                      <MinusOutlined className="border boredr-[#878787] rounded-full p-2" />
                    </p>
                  </div>

                  <button className="hover:text-red-600 font-semibold">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 mt-10 bg-white shadow-lg rounded-lg flex flex-col gap-2 w-[840px] mx-auto">

       <div className="flex gap-2 items-center">
        <h2 className="font-semibold">Total Price:</h2> 
        <span>₹8099</span>
       </div>

       <div className="flex gap-2 items-center">
        <h2 className="font-semibold">Discount:</h2> 
        <span>-₹3019</span>
       </div>

       <div className="flex gap-2 items-center">
        <h2 className="font-semibold">Delivery Charges:</h2>
        <span>Free</span>
       </div>

       <div className="h-px w-full bg-[#87878738]"></div>

       <div className="flex gap-2 items-center">
        <h2 className="font-semibold">Total  Amount: </h2>
        <span>₹5080</span>
       </div>
       
      </div>
    </div>
  );
}

export default AccCartEl;
