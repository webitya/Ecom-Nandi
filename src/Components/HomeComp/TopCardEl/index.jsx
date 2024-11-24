

import { Link } from "react-router-dom";
import { Carousel } from "antd";
import {
  ShoppingCartOutlined,
  MobileOutlined,
  SkinOutlined,
  LaptopOutlined,
  HeartOutlined,
  HomeOutlined,
  BookOutlined,
  GiftOutlined,
  TruckOutlined,
} from "@ant-design/icons";

const products = [
  { title: "Flowers", href: "/shop", gradient: "from-green-400 to-green-600", icon: <TruckOutlined /> },
  { title: "Clothes", href: "/shop", gradient: "from-blue-400 to-blue-600", icon: <SkinOutlined/> },
  { title: "Daily Puja", href: "/shop", gradient: "from-purple-400 to-purple-600", icon: <ShoppingCartOutlined /> },
  { title: "Book", href: "/shop", gradient: "from-yellow-400 to-yellow-600", icon: <BookOutlined /> },
  { title: "Gift", href: "/shop", gradient: "from-pink-400 to-pink-600", icon: <GiftOutlined /> },
  { title: "Festival", href: "/shop", gradient: "from-teal-400 to-teal-600", icon: <HomeOutlined /> },
];

const TopProductCarEl = () => {
  return (
    <div
      className="bg-white p-1 rounded-lg shadow-xl"
      style={{
        order: 1,
        height: "calc(100% - 16px)",
        zIndex: 10,
      }}
    >
      <Carousel
        autoplay
        dots={false}
        infinite
        speed={400}
        slidesToShow={5}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
            },
          },
        ]}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <Link to={product.href}>
              <div
                className={`flex flex-col items-center bg-gradient-to-r ${product.gradient} p-4 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out`}
              >
                <div className="text-3xl text-white mb-3">
                  {product.icon}
                </div>
                <span className="font-semibold text-white text-lg">
                  {product.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopProductCarEl;
