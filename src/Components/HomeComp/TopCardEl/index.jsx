

import { Link } from "react-router-dom";
import { Carousel } from "antd";
import {
  ShoppingCartOutlined,
  MobileOutlined,
  SkinOutlined,
  LaptopOutlined,
  HeartOutlined,
  HomeOutlined,
  TrophyOutlined,
  SmileOutlined,
  BookOutlined,
} from "@ant-design/icons";

const products = [
  { title: "Grocery", href: "/grocery-supermart-store", gradient: "from-green-400 to-green-600", icon: <ShoppingCartOutlined /> },
  { title: "Mobiles", href: "/mobile-phones-store", gradient: "from-blue-400 to-blue-600", icon: <MobileOutlined /> },
  { title: "Fashion", href: "/fashion-store", gradient: "from-purple-400 to-purple-600", icon: <SkinOutlined /> },
  { title: "Electronics", href: "/electronics-store", gradient: "from-yellow-400 to-yellow-600", icon: <LaptopOutlined /> },
  { title: "Beauty", href: "/beauty-personal-care", gradient: "from-pink-400 to-pink-600", icon: <HeartOutlined /> },
  { title: "Home & Furniture", href: "/home-furniture-store", gradient: "from-teal-400 to-teal-600", icon: <HomeOutlined /> },
  { title: "Sports", href: "/sports-outdoors-store", gradient: "from-orange-400 to-orange-600", icon: <TrophyOutlined /> },
  { title: "Toys", href: "/toys-games-store", gradient: "from-indigo-400 to-indigo-600", icon: <SmileOutlined /> },
  { title: "Books", href: "/books-store", gradient: "from-gray-400 to-gray-600", icon: <BookOutlined /> },
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
