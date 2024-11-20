import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { MenuOutlined, CloseOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CustomDrawer from '../DrawerEl'; // Adjust path based on your project structure
import './NavbarEl.css';

import { useSelector } from 'react-redux';

const NavbarEl = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector(state => state.user.value)
  console.log(user)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const profileMenu = (
    <Menu>
      {user.role ? (
        <>
          <Menu.Item key="account">
            <Link to="/account">Account</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </>

      ) : (
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
        
    </Menu>
  );

  const navigationLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Book Pandit', href: '/book-pandit' },
    { label: 'Offers', href: '/offers' },
    { label: <ShoppingCartOutlined className="cart-icon" />, href: '/cart' },
  ];

  return (
    <>
      <nav className={`navbar ${isSticky ? 'sticky-navbar' : ''}`} style={{ top: "-3px", userSelect: "none" }}>
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <img src="/logo.webp" alt="brand-logo" width="50px" />
          </Link>
        </div>

        <div className="navbar-menu hidden lg:flex items-center">
          <div className="search-bar flex items-center">
            <SearchOutlined className="text-primary mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {navigationLinks.map((link, index) => (
            <Link key={index} to={link.href} className="navlink">
              {link.label}
            </Link>
          ))}

          <div className="profile-dropdown">
            {user.role ? (
            {user.role === 'user' ? (
              <Dropdown menu={profileMenu} trigger={['hover']}>
                <Button
                  icon={<UserOutlined />}
                  className="profile-icon"
                  shape="circle"
                  size="large"
                />
              </Dropdown>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <Button
          className="menu-toggle lg:hidden flex justify-center items-center"
          onClick={toggleDrawer}
          style={{ outline: 'none', border: 'none', marginTop: '-8px' }}
        >
          {isDrawerOpen ? <CloseOutlined /> : <MenuOutlined />}
        </Button>
      </nav>

      {/* Mobile Drawer */}
      <CustomDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default NavbarEl;
