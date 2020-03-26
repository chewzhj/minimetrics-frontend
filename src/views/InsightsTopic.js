import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Typography
} from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import { ResponsiveBar } from '@nivo/bar'

const { Option } = Select;
const { Title, Text } = Typography;

const columns = [
  {
    title: 'Quiz Title',
    dataIndex: 'quizTitle',
  },
  {
    title: 'Qn. No.',
    dataIndex: 'questionNumber',
  },
  {
    title: 'Percentage of error / %',
    dataIndex: 'percentage',
  },
  {
    title: 'View',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EyeOutlined />} onClick={ () => {alert("Show modal of question + question options (& maybe can put some quiz insights inside here too)")}} />
      )
    }
  }
];

export default class InsightsTopic extends React.Component {

  generateTableData = () => {
    const tableData = [
      {
        quizTitle: 'Mission 1 Quiz',
        questionNumber: '6',
        percentage: 50
      },
      {
        quizTitle: 'Mission 2 Quiz',
        questionNumber: '6',
        percentage: 50
      },
      {
        quizTitle: 'Mission 1 Quiz',
        questionNumber: '2',
        percentage: 40
      },
      {
        quizTitle: 'Mission 2 Quiz',
        questionNumber: '3',
        percentage: 30
      },
      {
        quizTitle: 'Mission 1 Quiz',
        questionNumber: '7',
        percentage: 20
      },
    ]

    return tableData
  }

  render() {
    const tableData = this.generateTableData()

    return (
      <SideBar activeTab='insights/topic' title="Insights" subtitle="Topic Insights">

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Title level={3}>Misunderstood Topics</Title>
            <Text>by percentage of incorrect 1st attempts</Text>
          </Col>
        </Row>
        <Row gutter={[15, 15]} justify="end" style={{ marginTop: 10, marginRight: 20 }}>
          <Col md={6} xs={24}>
            <span style={{ float: 'right', marginTop: 5 }}>Showing Results For:</span>
          </Col>
          <Col md={8} xs={24}>
            <Select defaultValue="allQuizzes" style={{ width: '100%', paddingLeft: 20 }}>
              <Option value="allQuizzes">All Quizzes</Option>
              <Option value="mission1quiz">Mission 1 Quiz</Option>
              <Option value="mission2quiz">Mission 2 Quiz</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col md={24} xs={24}>
            <div style={{ height: 400 }}>
              <ResponsiveBar
                data={[
                  {
                    "tag": "Utilitarianism",
                    "percentage": 21
                  },
                  {
                    "tag": "Rights",
                    "percentage": 30
                  },
                  {
                    "tag": "Virtues",
                    "percentage": 37
                  },
                  {
                    "tag": "Fair Use Doctrine",
                    "percentage": 48
                  },
                  {
                    "tag": "Deontology",
                    "percentage": 68
                  }
                ]}
                keys={['percentage']}
                layout='horizontal'
                enableGridX={true}
                enableGridY={false}
                gridXValues={5}
                indexBy='tag'
                margin={{ top: 0, right: 30, bottom: 50, left: 100 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                borderRadius={4}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 0,
                  tickValues: 5,
                  tickPadding: 0,
                  tickRotation: 0,
                  legend: 'Percentage',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 0,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['brighter', 10]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                onClick={(data, event) => {
                  console.log(data);
                  alert("Load " + data.indexValue + " questions into table below.");
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, paddingRight: 20 }}>
            <Title level={3}>Misunderstood Questions</Title>
            <Text>Select a Tag above to view its questions here.</Text>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col md={24} xs={24}>
            <Table columns={columns} dataSource={tableData} bordered={true} />
          </Col>
        </Row>
      </SideBar>
    )
  }
}
