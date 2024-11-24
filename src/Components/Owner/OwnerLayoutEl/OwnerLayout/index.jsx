import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined, ClusterOutlined } from "@ant-design/icons";
import OwnerSellerAll from "../../OwnerSellerAll";
import OwnerPanditAll from "../../OwnerPanditAll";
import SellerChain from "../../OwnerRoleChain/SellerChain";

// Example Dashboard Component
const Dashboard = () => <div className="text-xl">Welcome to the Dashboard</div>;

// Pandit Chain Component
const PanditChain = () => (
  <div className="text-xl">Pandit Chain: Specific Content</div>
);

// Seller Chain Component


const SidebarWithContent = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  // Function to dynamically render content based on the active menu
  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Seller":
        return <OwnerSellerAll />;
      case "Pandit":
        return <OwnerPanditAll />;
      case "PanditChain":
        return <PanditChain />;
      case "SellerChain":
        return <SellerChain />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white h-full shadow-md">
        <Menu mode="inline" theme="light" className="h-full">
          {/* Main Menu Items */}
          <Menu.Item
            icon={<HomeOutlined />}
            key="dashboard"
            onClick={() => setActiveComponent("Dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            icon={<UserOutlined />}
            key="seller"
            onClick={() => setActiveComponent("Seller")}
          >
            Seller
          </Menu.Item>
          <Menu.Item
            icon={<UserOutlined />}
            key="pandit"
            onClick={() => setActiveComponent("Pandit")}
          >
            Pandit
          </Menu.Item>

          {/* RoleChain Submenu */}
          <Menu.SubMenu
            key="rolechain"
            icon={<ClusterOutlined />}
            title="RoleChain"
          >
            <Menu.Item
              key="rolechain-seller"
              onClick={() => setActiveComponent("SellerChain")}
            >
              Seller Chain
            </Menu.Item>
            <Menu.Item
              key="rolechain-pandit"
              onClick={() => setActiveComponent("PanditChain")}
            >
              Pandit Chain
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 p-4 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default SidebarWithContent;
