import React from 'react'
import SideBar from '../components/SideBar'
import {
  Tabs,
  Row,
  Col,
  Select,
  Table,
  Button
} from 'antd';
import { EyeOutlined } from '@ant-design/icons'

const columns = [
  {
    title: 'Tag',
    dataIndex: 'tag',
  },
  {
    title: 'Percentage / %',
    dataIndex: 'percentage',
  },
  {
    title: 'View',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EyeOutlined />} />
      )
    }
  }
];

const { TabPane } = Tabs;
const { Option } = Select;

export default class TagsMain extends React.Component {

  generateTableData = () => {
    const tableData = [
      {
        tag: 'Deontology',
        percentage: 68
      },
      {
        tag: 'Fair Use Doctrine',
        percentage: 48
      },
      {
        tag: 'Virtues',
        percentage: 37
      },
      {
        tag: 'Rights',
        percentage: 30
      },
      {
        tag: 'Utilitarianism',
        percentage: 21
      },
    ]

    return tableData
  }

  render() {
    const tableData = this.generateTableData()
    return (
      <SideBar activeTab='tags' title='Tags' subtitle='This is the tags page'>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Statistics By Incorrect Attempts" key="1">
            <Row>
              <Col md={12} xs={24}>
                <h1><b>Misunderstood Topics</b></h1>
                <p>by percentage of incorrect attempts (1st Attempt)</p>

              </Col>
              <Col md={12} xs={24}>
                Showing Results For:&nbsp;&nbsp;
                <Select defaultValue="allQuizzes" style={{ width: '50%' }}>
                  <Option value="allQuizzes">All Quizzes</Option>
                  <Option value="mission1quiz">Mission 1 Quiz</Option>
                  <Option value="mission2quiz">Mission 2 Quiz</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col md={12} xs={24}>
                <div>
                  <span>INSERT CHART HERE.</span>
                </div>
              </Col>
              <Col md={12} xs={24}>
                <Table columns={columns} dataSource={tableData} bordered={true} />
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </SideBar>
    )
  }
}
