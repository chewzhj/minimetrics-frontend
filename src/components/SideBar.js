import React from 'react'
import { Layout, Menu, Avatar, Popover, PageHeader, Button } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  BulbOutlined,
  TagOutlined,
  PieChartOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {logout} from '../actions/loginActions'
import Wordless_Logo from '../assets/img/mm_wordless_logo.png'
import '../assets/css/Sidebar.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export default class SideBar extends React.Component {

  state = {
    visible: false
  }

  // to change the state of the sidebar, open or closed
  onVisibleChange = (visible) => this.setState({ visible })

  render() {
    const { activeTab, title, subtitle, disabled } = this.props
    // reading in props, and setting default values if not provided
    const phtitle = title || "Title"
    const phsubtitle = subtitle || "Subtitle"
    const bpCallBack = this.props.onBreakpoint || (() => null)
    const insightsOpen = activeTab.substring(0,8)
    const displayName = sessionStorage.getItem('name') || ''

    return (
      <Layout style={{ minHeight: '100vh' }}>

        {/* Sider Component */}
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={bpCallBack}
        >
          {/* MiniMetrics Logo */}
          <div style={{ height: 40, margin: 24 }}>
            <Link to='/index'>
              <img src={Wordless_Logo} alt="MiniMetrics" style={{ height: 39, width: 152 }} />
            </Link>
          </div>

          {/* Menu */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeTab]} defaultOpenKeys={[insightsOpen]}>

            {/* Dashboard Tab */}
            <Menu.Item key="dashboard" disabled={disabled}>
              <BarChartOutlined />
              <Link to="/index">
                <span className="nav-text">Dashboard</span>
              </Link>
            </Menu.Item>

            {/* Quizzes Tab */}
            <Menu.Item key="quiz" disabled={disabled}>
              <BulbOutlined />
              <Link to="/quiz">
                <span className="nav-text">Quizzes</span>
              </Link>
            </Menu.Item>

            {/* Topics Tab */}
            <Menu.Item key="topic" disabled={disabled}>
              <TagOutlined />
              <Link to="/topic">
                <span className="nav-text">Topics</span>
              </Link>
            </Menu.Item>

            {/* Insights Tab */}
            <SubMenu
              key="insights"
              disabled={disabled}
              title={
                <span>
                  <PieChartOutlined />
                  <span className="nav-text">Insights</span>
                </span>
              }
            >
              {/* Topic Insights Tab */}
              <Menu.Item key="insights/topic" disabled={disabled}><Link to='/insights/topic'>Topic Insights</Link></Menu.Item>
              {/* Student/Confidence Insights Tab */}
              <Menu.Item key="insights/confidence" disabled={disabled}><Link to='/insights/confidence'>Student Insights</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        {/* Layout for Header, PageHeader, Content, Footer */}
        <Layout>

          {/* Header */}
          <Header style={{ padding: 0, background: '#fff', boxShadow: '1px 1px 4px 0px #bcbcbc', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              <Popover
                content={<Link to='/login'><Button onClick={logout}>Logout</Button></Link>}
                trigger='click'
                visible={this.state.visible}
                onVisibleChange={this.onVisibleChange}
              >
                <div style={{ marginRight: 20 }}>
                  <Avatar icon={<UserOutlined />} style={{ marginRight: 12 }} />
                  <span>{displayName}</span>
                  <DownOutlined style={{ marginLeft: 12 }} />
                </div>
              </Popover>
            </div>
          </Header>

          {/* PageHeader */}
          <PageHeader
            className="site-page-header"
            title={phtitle}
            subTitle={phsubtitle}
            style= {{ background: '#fff', paddingLeft: 50, zIndex: 0 }}
          />

          {/* Content */}
          <Content style={{ margin: '16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              {this.props.children}
            </div>
          </Content>

          {/* Footer */}
          <Footer style={{ textAlign: 'center' }}>Copyright &copy; 2020 MiniMetrics</Footer>
        </Layout>
      </Layout>
    )
  }
}
