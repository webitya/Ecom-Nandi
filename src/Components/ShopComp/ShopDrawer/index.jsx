import React from "react";
import { Drawer, Checkbox, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ShopDrawerEl = ({
  visible,
  onClose,
  categories,
  selectedFilters,
  onCategoryChange,
  sortOption,
  onSortChange,
}) => {
  const sortOptions = [
    "New Arrivals",
    "Price (High to Low)",
    "Price (Low to High)",
  ];

  const handleCheckboxChange = (categoryId, checked) => {
    if (checked) {
      onCategoryChange((prevFilters) => [
        ...prevFilters,
        categoryId.toString(),
      ]);
    } else {
      onCategoryChange((prevFilters) =>
        prevFilters.filter((id) => id !== categoryId.toString())
      );
    }
    onClose(); // Close the drawer after checkbox change
  };

  const handleSortChange = ({ key }) => {
    onSortChange(key);
    onClose(); // Close the drawer after sort option is selected
  };

  const sortMenu = (
    <Menu onClick={handleSortChange}>
      {sortOptions.map((option) => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Drawer
      title={<h2 className="text-lg font-bold">Categories</h2>}
      placement="left"
      onClose={onClose}
      open={visible}
      bodyStyle={{ padding: 0 }}
      style={{ zIndex: 1050 }} // Ensure drawer has high z-index
    >
      <div className="p-4">
        {/* Sorting Dropdown */}
        {/* <div className="mb-6">
          <Dropdown overlay={sortMenu} trigger={["click"]}>
            <Button className="flex items-center justify-between w-full bg-blue-500 text-white px-4 py-2 rounded-md">
              Sort by: {sortOption} <DownOutlined className="ml-2" />
            </Button>
          </Dropdown>
        </div> */}

        {/* Category Checkboxes */}
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
    </Drawer>
  );
};

export default ShopDrawerEl;
