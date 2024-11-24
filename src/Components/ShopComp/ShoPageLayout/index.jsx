import { FilterOutlined, DownOutlined, LoadingOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Button, Dropdown, Menu, Checkbox, Spin, message, Input, Col, Card } from "antd";
import axios from "axios";
import "./ShopPageLayout.css";
import { useRequestApi } from "../../../hooks/useRequestApi";
import ProductCardEl from "../../../Shared/ProductCardEl";

const ShopPageLayoutEl = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState("Relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hardcoded categories
  const categories = [
    { id: 1, name: "Hawan Samagiri" },
    { id: 2, name: "Flowers" },
    { id: 3, name: "Fruits" },
    { id: 4, name: "Gifts" },
  ];

  const sortOptions = [
    { label: "Relevance", key: "relevance" },
    { label: "New Arrivals", key: "new-arrivals" },
    { label: "Price (High to Low)", key: "price-high-to-low" },
    { label: "Price (Low to High)", key: "price-low-to-high" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await useRequestApi(`api/product/getFilterProduct`, "POST", {
        categories: selectedFilters,
        sort: sortOption,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
      });
      setProducts(response.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = ({ key }) => {
    setSortOption(key);
    setDrawerVisible(false);
  };

  const handleCheckboxChange = (category, checked) => {
    const updatedFilters = checked
      ? [...selectedFilters, category.toString()]
      : selectedFilters.filter((id) => id !== category.toString());
    setSelectedFilters(updatedFilters);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedFilters, sortOption, minPrice, maxPrice]);

  const menu = (
    <Menu onClick={handleSortChange}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.key}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-72 bg-white border-r shadow-md p-6">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button className="flex items-center justify-between w-full bg-blue-500 text-white px-4 py-2 rounded-md">
            Sort by: {sortOption} <DownOutlined className="ml-2" />
          </Button>
        </Dropdown>


        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Categories</h2>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              onChange={(e) => handleCheckboxChange(cat.name, e.target.checked)}
              checked={selectedFilters.includes(cat.name.toString())}
            >
              {cat.name}
            </Checkbox>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Price Range</h2>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            type="number"
            className="w-1/2"
          />
          <Input
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            type="number"
            className="w-1/2"
          />
        </div>
      </div>

      {/* Drawer for tablet and mobile screens */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform ${drawerVisible ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4">
          <Button type="primary" onClick={() => setDrawerVisible(false)}>
            Close Filters
          </Button>
          <h2 className="text-xl font-bold mt-6 mb-4">Categories</h2>
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              onChange={(e) => handleCheckboxChange(cat.id, e.target.checked)}
              checked={selectedFilters.includes(cat.id.toString())}
            >
              {cat.name}
            </Checkbox>
          ))}
          <h2 className="text-xl font-bold mt-6 mb-4">Price Range</h2>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              className="w-1/2"
            />
            <Input
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Button
          type="primary"
          icon={<FilterOutlined />}
          className="lg:hidden mb-4"
          onClick={() => setDrawerVisible(true)}
        >
          Filter
        </Button>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCardEl product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-16">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopPageLayoutEl;
