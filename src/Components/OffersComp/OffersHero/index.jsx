

import { Tabs, Carousel, Card, Button } from "antd";


const { TabPane } = Tabs;
import "./Offers.css"

const featuredProducts = [
  { title: "Smartphones", image: "/offer_image.avif", price: "$299" },
  { title: "Headphones", image: "/offer_image.avif", price: "$99" },
  { title: "Smartwatches", image: "/offer_image.avif", price: "$199" },
  { title: "Laptops", image: "/offer_image.avif", price: "$899" },
];

const offerCategories = [
  { title: "Electronics", gradient: "from-blue-100 to-blue-300" },
  { title: "Fashion", gradient: "from-purple-100 to-purple-300" },
  { title: "Home & Kitchen", gradient: "from-green-100 to-green-300" },
  { title: "Beauty & Personal Care", gradient: "from-pink-100 to-pink-300" },
];

const bestDeals = [
  {
    title: "50% Off on Electronics",
    image: "/offer img.webp",
    description: "Grab amazing deals on the latest gadgets.",
  },
  {
    title: "Flat 60% Off - Fashion",
    image: "/offer img.webp",
    description: "Upgrade your wardrobe with stunning fashion deals.",
  },

];
const OffersPageHero = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-10 min-h-screen" style={{userSelect:"none"}}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Exclusive Offers
        </h1>
        <p className="text-lg text-gray-600">
          Discover amazing deals across categories. Shop now!
        </p>
      </div>

      {/* Carousel Section */}
      <div className="mb-16 flex flex-col lg:flex-row items-center lg:items-start justify-between">
  {/* Left Side - Carousel */}
  <div className="lg:w-2/3 w-full">
    <Carousel autoplay effect="slide" className="rounded-lg shadow-lg">
      {bestDeals.map((deal, index) => (
        <div key={index} className="rounded-lg overflow-hidden">
          <img
            src={deal.image}
            alt={deal.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      ))}
    </Carousel>
  </div>

  {/* Right Side - Heading, Description, and Shop Now Button */}
  <div className="lg:w-1/3 w-full lg:pl-12 mt-8 lg:mt-0">
    {bestDeals.map((deal, index) => (
      <div
        key={index}
        className="mb-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl rounded-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {deal.title}
        </h2>
        <p className="text-lg text-gray-600 mb-6">{deal.description}</p>
        <Button
          type="primary"
          size="large"
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-8 py-2 rounded-full"
        >
          Shop Now
        </Button>
      </div>
    ))}
  </div>
</div>


      {/* Tabs Section */}
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Featured Products" key="1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={index}
                hoverable
                className="shadow-lg transition-transform transform hover:scale-105"
                cover={
                  <img
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="rounded-t-lg"
                  />
                }
              >
                <Card.Meta
                  title={<h3 className="text-lg font-semibold">{product.title}</h3>}
                  description={<p className="text-gray-500">{product.price}</p>}
                />
                <Button
                  type="link"
                  className="mt-4 text-blue-600 hover:underline"
                >
                  View Product
                </Button>
              </Card>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Trending Categories" key="2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {offerCategories.map((category, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md bg-gradient-to-r ${category.gradient} text-center hover:scale-105 transform transition duration-300 rj`}
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
export default OffersPageHero