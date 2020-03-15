import React from 'react'
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  BulbOutlined,
  CodeOutlined,
  TagOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import Wordless_Logo from '../assets/img/mm_wordless_logo.png'

const { Header, Content, Footer, Sider } = Layout;
const {SubMenu} = Menu

export default class SideBar extends React.Component {


  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div style={{height: 40, margin: 24}}>
            <Link to='/'>
              <img src={Wordless_Logo} alt="MiniMetrics" style={{height: 39, width: 152}}/>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <BarChartOutlined />
              <span className="nav-text">Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <UserOutlined />
              <span className="nav-text">Users</span>
            </Menu.Item>
            <Menu.Item key="3">
              <BulbOutlined />
              <span className="nav-text">Quizzes</span>
            </Menu.Item>
            <Menu.Item key="5">
              <TagOutlined />
              <span className="nav-text">Tags</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <PieChartOutlined />
                  <span className="nav-text">Insights</span>
                </span>
              }
            >
              <Menu.Item key="7">Option 5</Menu.Item>
              <Menu.Item key="8">Option 6</Menu.Item>
              <Menu.Item key="9">Option 7</Menu.Item>
              <Menu.Item key="10">Option 8</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright &copy; 2020 MiniMetrics</Footer>
        </Layout>
      </Layout>
    )
  }
}
