import React from 'react'
import { Layout, Menu, Avatar, Popover, PageHeader, Breadcrumb } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  BulbOutlined,
  TagOutlined,
  PieChartOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Wordless_Logo from '../assets/img/mm_wordless_logo.png'
import '../assets/css/Sidebar.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export default class SideBar extends React.Component {

  state = {
    visible: false
  }

  onVisibleChange = (visible) => this.setState({ visible })

  render() {
    const { activeTab, title, subtitle } = this.props
    const phtitle = title || "Title"
    const phsubtitle = subtitle || "Subtitle"

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <div style={{ height: 40, margin: 24 }}>
            <Link to='/'>
              <img src={Wordless_Logo} alt="MiniMetrics" style={{ height: 39, width: 152 }} />
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeTab]} defaultOpenKeys={[activeTab]}>
            <Menu.Item key="dashboard">
              <BarChartOutlined />
              <Link to="/dashboard">
                <span className="nav-text">Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="users">
              <UserOutlined />
              <Link to="/users">
                <span className="nav-text">Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="quiz">
              <BulbOutlined />
              <Link to="/quiz">
                <span className="nav-text">Quizzes</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="tags">
              <TagOutlined />
              <Link to="/tags">
                <span className="nav-text">Tags</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="insights"
              title={
                <span>
                  <PieChartOutlined />
                  <span className="nav-text">Insights</span>
                </span>
              }
            >
              <Menu.Item key="6"><Link to='/insights'>Overview</Link></Menu.Item>
              <Menu.Item key="7">Topic Insights</Menu.Item>
              <Menu.Item key="8">Quiz Insights</Menu.Item>
              <Menu.Item key="9">Student Insights</Menu.Item>
              <Menu.Item key="10">Confidence Insights</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff', boxShadow: '1px 1px 4px 0px #bcbcbc', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              <Popover
                content='Logout'
                trigger='click'
                visible={this.state.visible}
                onVisibleChange={this.onVisibleChange}
              >
                <div style={{ marginRight: 20 }}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
                  <span>Manager</span>
                  <DownOutlined style={{ marginLeft: 12 }} />
                </div>
              </Popover>
            </div>

          </Header>
          <PageHeader
            className="site-page-header"
            title={phtitle}
            subTitle={phsubtitle}
            style= {{ background: '#fff', paddingLeft: 50, zIndex: 0 }}
          />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright &copy; 2020 MiniMetrics</Footer>
        </Layout>
      </Layout>
    )
  }
}
