import React from 'react'
import { Button, Tabs, Modal } from 'antd'
import { Link } from 'react-router-dom'
import SideBar from '../components/SideBar'
import CommonPhrases from '../phrases/CommonPhrases'
import {
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs

export default class QuizCreation extends React.Component {

  changeTab = (tab) => this.props.changeTab(tab)
  openPreview = () => this.props.openPreview()
  closePreview = () => this.props.closePreview()

  render() {
    const {
      currentTab,
      quizPreviewVisible,
    } = this.props.quizCreation

    return (
      <SideBar activeTab='quiz' title="Quiz" subtitle="Create New Quiz">
        {/* Quiz Preview Modal */}
        <Modal
          title="Basic Modal"
          visible={quizPreviewVisible}
          onOk={this.closePreview}
          onCancel={this.closePreview}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // marginBottom: 20,
        }}>
          <div>
            <Button onClick={this.openPreview}>
              Preview Quiz
            </Button>
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{marginRight: 10}}>
              <Link to='/quiz'>
                <Button type='danger'>
                  Discard Quiz
                </Button>
              </Link>
            </div>
            <div>
              <Link to='#'>
                <Button type='primary'>
                  Create Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div style={{height: 20, width: '100%', borderBottom: '1px solid #ddd', marginBottom: 8}}/>
        <Tabs activeKey={currentTab} tabPosition='left' onChange={this.changeTab}>
          <TabPane
            key='basic-settings'
            tab={
              <span>
                <BulbOutlined />
                Quiz Settings
              </span>
            }>
            {CommonPhrases.LoremIpsumText}
            {CommonPhrases.LoremIpsumText}
          </TabPane>
          <TabPane
            key='basic-questions'
            tab={
              <span>
                <SettingOutlined />
                Build Questions
              </span>
            }>
            questions
          </TabPane>
        </Tabs>

      </SideBar>
    )
  }
}
