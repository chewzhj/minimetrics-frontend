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

const HorizontalTick = ({ textAnchor, textBaseline, value, x, y }) => {
  const MAX_LINE_LENGTH = 16;
  const MAX_LINES = 2;
  const LENGTH_OF_ELLIPSIS = 3;
  const TRIM_LENGTH = MAX_LINE_LENGTH * MAX_LINES - LENGTH_OF_ELLIPSIS;
  const trimWordsOverLength = new RegExp(`^(.{${TRIM_LENGTH}}[^\\w]*).*`);
  const groupWordsByLength = new RegExp(
    `([^\\s].{0,${MAX_LINE_LENGTH}}(?=[\\s\\W]|$))`,
    'gm',
  );
  const splitValues = value
    .replace(trimWordsOverLength, '$1...')
    .match(groupWordsByLength)
    .slice(0, 2)
    .map((val, i) => (
      <tspan
        key={val}
        dy={12 * i}
        x={-10}
        style={{ fontFamily: 'sans-serif', fontSize: '11px' }}
      >
        {val}
      </tspan>
    ));
  return (
    <g transform={`translate(${x},${y})`}>
      <text alignmentBaseline={textBaseline} textAnchor={textAnchor}>
        {splitValues}
      </text>
    </g>
  );
};

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
    const {graphDropdown} = this.props.insightsTopic

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
        percentage: percentage1dp(tag.incorrect/tag.total)
      })).sort((t1, t2) => t1.percentage - t2.percentage)
    }
  }

  generateGraphTitle = () => {

  }

  changeGraphDropdown = (value) => this.props.changeDropdown(value)

  render() {
    const tableData = []
    const graphData = this.generateTableData()
    const {graphDropdown} = this.props.insightsTopic

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
            <Select value={graphDropdown} onChange={this.changeGraphDropdown} style={{ width: '100%', paddingLeft: 20 }}>
              <Option value="all">All Quizzes</Option>
              <Option value="1">Mission 1 Quiz</Option>
              <Option value="2">Mission 2 Quiz</Option>
            </Select>
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
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 0,
                  renderTick: HorizontalTick
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
