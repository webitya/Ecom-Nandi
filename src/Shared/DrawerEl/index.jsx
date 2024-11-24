import { useState } from 'react';
import { Drawer, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./DrawerEl.css";
import useSelection from 'antd/es/table/hooks/useSelection';
import { useSelector } from 'react-redux';

const CustomDrawer = ({ toggleDrawer, isDrawerOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const user = useSelector((state) => state.user.value)
  console.log(user)

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Book Pandit', href: '/book-pandit' },
    { label: 'Offers', href: '/offers' },
    { label: 'Cart', href: '/cart' },
    ...(user?.role
      ? [
        { label: 'Account', href: '/account' },
        { label: 'Logout', href: '/logout' },
      ]
      : [
        { label: 'Login', href: '/login' }
      ]
    )

  ];


  return (
    <Drawer
      className="cd-custom-drawer"
      placement="left"
      onClose={toggleDrawer}
      open={isDrawerOpen}
      width={280}
      closeIcon={<span className="cd-close-icon">&times;</span>}
      aria-label="Navigation Drawer"
    >
      <div className="cd-drawer-content">
        <div className="cd-search-container">
          <SearchOutlined className="cd-search-icon" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="cd-search-input"
            aria-label="Search products"
          />
        </div>
        <ul className="cd-drawer-menu">
          {navigationLinks.map((item) => (
            <li key={item.label} className="cd-menu-item">
              <Link to={item.href} onClick={toggleDrawer} className="cd-menu-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
