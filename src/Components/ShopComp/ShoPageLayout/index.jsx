"use client"

import { FilterOutlined, DownOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Button, Dropdown, Menu, Checkbox } from "antd";
import ShopDrawerEl from "../ShopDrawer";
import ShCaHawanSamagiriEl from "../../ShopCategoryComp/ShCaHawanSamagiriEl";
import ShCaFlowersEl from "../../ShopCategoryComp/ShCaFlowersEl";
import ShCaFruitsEl from "../../ShopCategoryComp/ShCaFruitsEl";
import ShCaGiftEl from "../../ShopCategoryComp/ShCaGiftEl";
import ShCaPriceLowToHighEl from "../../ShopCategoryComp/ShCaPriceLowToHighEl";
import ShCaPriceHighToLowEl from "../../ShopCategoryComp/ShCaPriceHighToLowEl";
import ShCaNewArrivalEl from "../../ShopCategoryComp/ShCaNewArrivalEl";
import "./ShopPageLayout.css";

const ShopPageLayoutEl = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState("Relevance");

  const categories = [
    { id: 1, name: "Hawan Samagiri", component: <ShCaHawanSamagiriEl /> },
    { id: 2, name: "Flowers", component: <ShCaFlowersEl /> },
    { id: 3, name: "Fruits", component: <ShCaFruitsEl /> },
    { id: 4, name: "Gifts", component: <ShCaGiftEl /> },
  ];

  const sortOptions = [
    "New Arrivals",
    "Price (High to Low)",
    "Price (Low to High)",
  ];

  const handleSortChange = ({ key }) => {
    setSortOption(key);
    setDrawerVisible(false);  // Close the drawer after sorting
  };

  const handleCheckboxChange = (categoryId, checked) => {
    if (checked) {
      setSelectedFilters((prevFilters) => [
        ...prevFilters,
        categoryId.toString(),
      ]);
    } else {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((id) => id !== categoryId.toString())
      );
    }
  };

  const renderSortedContent = () => {
    switch (sortOption) {
      case "Price (Low to High)":
        return <ShCaPriceLowToHighEl />;
      case "Price (High to Low)":
        return <ShCaPriceHighToLowEl />;
      case "New Arrivals":
        return <ShCaNewArrivalEl />;
      default:
        return null;
    }
  };

  const renderCategoryContent = () => {
    if (selectedFilters.length > 0) {
      return categories
        .filter((cat) => selectedFilters.includes(cat.id.toString()))
        .map((filteredCat) => (
          <div key={filteredCat.id} className="mb-8 animate-fade-in">
            {filteredCat.component}
          </div>
        ));
    }

    // Render the default content or sorted content if no filters are applied
    return renderSortedContent() || <ShCaFlowersEl />;
  };

  const menu = (
    <Menu onClick={handleSortChange}>
      {sortOptions.map((option) => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ userSelect: "none" }}>
      {/* Sidebar for large screens */}
      <div className="hidden lg:block w-64 bg-white border-r shadow-md p-6">
        <div className="mb-6">
          {/* Sort Dropdown */}
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button className="flex items-center justify-between w-full bg-blue-500 text-white px-4 py-2 rounded-md">
              Sort by: {sortOption} <DownOutlined className="ml-2" />
            </Button>
          </Dropdown>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          {categories.map((cat) => (
            <div key={cat.id} className="mb-3">
              <Checkbox
                onChange={(e) => handleCheckboxChange(cat.id, e.target.checked)}
                checked={selectedFilters.includes(cat.id.toString())}
              >
                {cat.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer for tablet and mobile screens */}
      <ShopDrawerEl
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        categories={categories}
        selectedFilters={selectedFilters}
        onCategoryChange={setSelectedFilters}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Toggle Button for Drawer (Mobile and Tablet View) */}
        <Button
          type="primary"
          icon={<FilterOutlined />}
          className="lg:hidden my-3 mx-1 bg-blue-600 hover:bg-blue-700"
          onClick={() => setDrawerVisible(true)}
        >
          Filter
        </Button>

        {/* Render Category Content */}
        <div
          className="border bg-white transition-all duration-500 overflow-y-auto max-h-[100vh] scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {renderCategoryContent()}
        </div>
      </div>
    </div>
  );
};

export default ShopPageLayoutEl;
