

import React, { useState } from 'react';
import { GiftOutlined, MenuOutlined, UserAddOutlined } from '@ant-design/icons';
import { Drawer, Menu, Button } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  SettingOutlined,
  ShopOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import AccProfileEl from '../AccProfileEl';
import AccCartEl from '../AccCartEl';
import AccAddressEl from '../AccAddressEl';
import AccPanditEl from '../AccPanditEl';
import AccSellerEl from '../AccSellerEl';
import AccSettingEl from '../AccSettingEl';
import { useNavigate } from 'react-router-dom';
import AccRegisterPandit from '../AccRegisterPanditEl';

const AccountProfileLayout = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate= useNavigate();
  // Example user object. Replace with actual user data.
  const user = { role: 'user' }; // Example: User has both roles.

  // Dynamically create menu items based on user roles
  const menuItems = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'cart', label: 'Cart', icon: <ShoppingCartOutlined /> },
    { key: 'address', label: 'Address', icon: <HomeOutlined /> },
    { key: 'register_as_pandit', label: 'Register As Pandit', icon: <UserSwitchOutlined /> },
    { key: 'register_as_seller', label: 'Register As Seller', icon: <GiftOutlined /> },
    (user.role.includes('pandit') && { key: 'pandit', label: 'Pandit', icon: <UserSwitchOutlined /> }),
    (user.role.includes('seller') && { key: 'seller', label: 'Seller', icon: <ShopOutlined /> }),
    { key: 'settings', label: 'Settings', icon: <SettingOutlined /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AccProfileEl />;
      case 'cart':
        return <AccCartEl />;
      case 'address':
        return <AccAddressEl />;
      case 'register_as_pandit':
          return <AccRegisterPandit />;
      case 'pandit':
        return <AccPanditEl />;
      case 'seller':
        return <AccSellerEl />;
      case 'settings':
        return <AccSettingEl />;
      default:
        return <AccProfileEl />;
    }
  };

  const handleClick= (e) => {
    switch (e.key) {

      case 'register_as_seller': 
        navigate('/login')
        break;

      default:
        setActiveTab(e.key)
        break;
    }
    
  }

  return (
    <div className="flex min-h-screen bg-gray-100" style={{userSelect:"none"}}>
      {/* Sidebar for large screens */}
      <div className="hidden md:block w-64 bg-white border-r">
        <Menu
          mode="inline"
          defaultSelectedKeys={['profile']}
          onClick={handleClick}
          items={menuItems}
          className="h-full"
        />
      </div>

      {/* Drawer for small screens */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        style={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['profile']}
          onClick={(e) => {
            setActiveTab(e.key);
            setDrawerVisible(false); // Close drawer after selecting a menu item
          }}
          items={menuItems}
          className="h-full"
        />
      </Drawer>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {/* Toggle Button for Drawer */}
        <Button
          type="primary"
          icon={<MenuOutlined />}
          className="md:hidden mb-4"
          onClick={() => setDrawerVisible(true)}
        >
          Menu
        </Button>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountProfileLayout;

