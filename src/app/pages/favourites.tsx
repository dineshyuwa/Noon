"use client";
import React from 'react';
import { Layout,Breadcrumb,theme} from 'antd';
import FooterBar from '../components/Footer';
import Favorites from "../components/Favourites";
const { Content } = Layout;

const FavouritesPage: React.FC = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
            <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>Favourites</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 900,
              background: colorBgContainer,
            }}
          >
            <Favorites/>
                </Content>
                <FooterBar/>
        </Layout>
        </Layout>
  );
};

export default FavouritesPage;
