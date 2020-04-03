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
import { HorizontalBar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-style';

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
        <Button shape='circle' icon={<EyeOutlined />} onClick={() => { alert("Show modal of question + question options (& maybe can put some quiz insights inside here too)") }} />
      )
    }
  }
];

/*
START CHARTJS CONFIG
*/

const quizChartData = {
  labels: ['Deontology', 'Virtues', 'Utilitarianism', 'Fair Use Doctrine', 'Rights'],
  datasets: [{
    label: 'Incorrect',
    backgroundColor: '#428bca',
    borderColor: '#428bca',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [85, 60, 30, 15],
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 2,
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }, {
    hidden: true,
    label: 'Total',
    data: [60, 70, 90, 42, 30]
  }]
};

const options = {
  plugins: {
    // Change options for ALL labels of THIS CHART
    datalabels: {
      color: '#000',
      align: 'end',
      anchor: 'end'
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  }
}

/*
END CHARTJS CONFIG
*/

const topicData = [
  {
    quizTitle: 'Mission 1 Quiz',
    id: '1',
    tagData: [
      {
        tag: 'Deontology',
        incorrect: 45,
        total: 60,
      },
      {
        tag: 'Fair Use Doctrine',
        incorrect: 40,
        total: 70,
      },
      {
        tag: 'Virtues',
        incorrect: 45,
        total: 90,
      },
      {
        tag: 'Rights',
        incorrect: 30,
        total: 42,
      },
      {
        tag: 'Utilitarianism',
        incorrect: 23,
        total: 30,
      },
    ]
  },
  {
    quizTitle: 'Mission 2 Quiz',
    id: '2',
    tagData: [
      {
        tag: 'Deontology',
        incorrect: 25,
        total: 43,
      },
      {
        tag: 'Fair Use Doctrine',
        incorrect: 4,
        total: 25,
      },
      {
        tag: 'Virtues',
        incorrect: 23,
        total: 40,
      },
      {
        tag: 'Rights',
        incorrect: 3,
        total: 32,
      },
      {
        tag: 'Utilitarianism',
        incorrect: 12,
        total: 50,
      },
    ]
  },
]

const percentage1dp = (number) => {
  const thousandtimes = Math.round(number * 1000)
  return thousandtimes / 10
}

export default class InsightsTopic extends React.Component {

  generateTableData = () => {
    const { graphDropdown } = this.props.insightsTopic

    if (graphDropdown === 'all') {
      let accumulateIncorrect = {}
      let accumulateTotal = {}
      for (const quiz of topicData) {
        for (const tag of quiz.tagData) {
          if (!accumulateTotal[tag.tag]) {
            accumulateTotal[tag.tag] = 0
            accumulateIncorrect[tag.tag] = 0
          }
          accumulateIncorrect[tag.tag] += tag.incorrect
          accumulateTotal[tag.tag] += tag.total
        }
      }
      let graphData = []
      for (const tag in accumulateIncorrect) {
        graphData.push({
          tag: tag,
          percentage: percentage1dp(accumulateIncorrect[tag] / accumulateTotal[tag])
        })
      }
      graphData.sort((t1, t2) => t1.percentage - t2.percentage)
      return graphData
    } else {
      const quizTopicData = topicData.filter(quiz => quiz.id === graphDropdown)[0]
      return quizTopicData.tagData.map(tag => ({
        tag: tag.tag,
        percentage: percentage1dp(tag.incorrect / tag.total)
      })).sort((t1, t2) => t1.percentage - t2.percentage)
    }
  }

  generateGraphTitle = () => {

  }

  changeGraphDropdown = (value) => this.props.changeDropdown(value)

  render() {
    const tableData = []
    const graphData = this.generateTableData()
    const { graphDropdown } = this.props.insightsTopic

    return (
      <SideBar activeTab='insights/topic' title="Insights" subtitle="Topic Insights">

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Title level={3}>Misunderstood Topics & Questions</Title>
            <Text>by percentage of incorrect 1st attempts</Text>
          </Col>
        </Row>
        <Row gutter={[15, 15]} justify="end" style={{ marginTop: 10, marginRight: 20 }}>
          <Col md={6} xs={24}>
            <span style={{ float: 'right', marginTop: 5 }}>Showing Results For:</span>
          </Col>
          <Col md={8} xs={24}>
            <Select value={graphDropdown} onChange={this.changeGraphDropdown} style={{ width: '100%', paddingLeft: 20 }}>
              <Option value="all">All Quizzes</Option>
              <Option value="1">Mission 1 Quiz</Option>
              <Option value="2">Mission 2 Quiz</Option>
            </Select>
          </Col>
        </Row>

        <Row type="flex" justify="center" style={{ marginTop: 20 }}>
          <Text strong>Click on a Tag in the chart to view its questions.</Text>
        </Row>

        <Row>
          <Col lg={12} md={24} xs={24} style={{ marginTop: 20, paddingLeft: 20 }}>
            <HorizontalBar
              data={quizChartData}
              width={100}
              height={400}
              options={options}
            />
          </Col>

          <Col lg={12} md={24} xs={24} style={{ marginTop: 20, paddingLeft: 10, paddingRight: 20 }}>
            <Table columns={columns} dataSource={tableData} bordered={true} />
          </Col>
        </Row>

        <Row>

          <Col md={24} xs={24}>

            <div style={{ height: 400 }}>

              <ResponsiveBar
                data={graphData}
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
      </SideBar>
    )
  }
}
