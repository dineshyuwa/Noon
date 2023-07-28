import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

const MobileMenu = styled(Menu)`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    background-color: #001529; /* Change the background color as needed */
    color: #fff; /* Change the font color as needed */
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999; /* Set a higher z-index to ensure it stays on top */
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  width: 50px;
  height: 50px;
  /* Add your logo image or content styles here */
`;

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuSelect = ({ key }) => {
    setSelectedMenuItem(key);
  };

  return (
    <>
      {!isMobile && (
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            padding: 0, // Remove padding to avoid white background near "Home"
          }}
        >
          <NavContainer>
            {/* Desktop Menu */}
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['Home']}
              selectedKeys={[selectedMenuItem]}
              onSelect={handleMenuSelect}
            >
              <NavLogo />
              <Menu.Item key="Home">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="Favorites">
                <Link to="/fav">Liked</Link>
              </Menu.Item>
            </Menu>
          </NavContainer>
        </Header>
      )}

      {isMobile ? (
        <MobileMenu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['Home']}
          selectedKeys={[selectedMenuItem]}
          onSelect={handleMenuSelect}
        >
          <Menu.Item key="Home">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="Favorites">
            <Link to="/fav">Liked</Link>
          </Menu.Item>
        </MobileMenu>
      ) : null}
    </>
  );
};

export default NavBar;
