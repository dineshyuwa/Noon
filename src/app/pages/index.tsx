"use client";
import React from 'react';
import Home from '../components/Home';
import { Layout,Breadcrumb,theme} from 'antd';
import FooterBar from '../components/Footer';
const { Content } = Layout;

const IndexPage: React.FC = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
            <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 900,
              background: colorBgContainer,
            }}
          >
            <Home/>
                </Content>
                <FooterBar/>
        </Layout>
        </Layout>
  );
};

export default IndexPage;
