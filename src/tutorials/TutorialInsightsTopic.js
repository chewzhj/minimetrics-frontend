import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Select,
  Table,
  Button,
  Typography,
  Spin,
  Modal,
  Card,
  Radio,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import { ResponsiveBar } from '@nivo/bar'
import { HorizontalBar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-style';
import GlobalConstants from '../variables/GlobalConstants'
import InsightsTopicData from '../variables/InsightsTopicData'

const { Option } = Select;
const { Title, Text } = Typography;

const percentage1dp = (number) => {
  const thousandtimes = Math.round(number * 1000)
  return thousandtimes / 10
}

export default class InsightsTopic extends React.Component {

  state = {
    step: 1,
    graphDropdown: 'all',
    selectedTag: '',
    selectedQuiz: '',
    viewQuestion: '',
    graphLoading: false,
    graphData: [],
  }

  cleanGraphData = () => {
    const { graphDropdown } = this.state
    const topicData = InsightsTopicData.topicData

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
      graphData.sort((t1, t2) => {
        if (t1.percentage !== t2.percentage) {
          return t2.percentage - t1.percentage
        } else {
          return t1.tag.localeCompare(t2.tag)
        }
      })
      return graphData
    } else {
      const quizTopicData = topicData.filter(quiz => quiz.id === graphDropdown)[0]
      return quizTopicData.tagData.map(tag => ({
        tag: tag.tag,
        percentage: percentage1dp(tag.incorrect / tag.total)
      })).sort((t1, t2) => {
        if (t1.percentage !== t2.percentage) {
          return t2.percentage - t1.percentage
        } else {
          return t1.tag.localeCompare(t2.tag)
        }
      })
    }
  }
  generateChartData = (prevChartData) => {
    return {
      labels: prevChartData.map(line => line.tag),
      datasets: [{
        label: 'Incorrect',
        backgroundColor: '#428bca',
        borderColor: '#428bca',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: prevChartData.map(line => line.percentage),
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
  }
  chartOptions = {
    title: {
      display: true,
      position: 'bottom',
      text: 'Percentage of incorrect 1st attempts'
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: '#000',
        align: 'end',
        anchor: 'end',
        formatter: function (value, context) {
          return value + '%';
        }
      }
    },
    layout: {
      padding: {
        right: 50
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          stepSize: 5
        }
      }]
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    onClick: (e,arr) => this.clickBar(arr[0]._index),
  }
  generateTableData = () => {
    const { selectedTag, selectedQuiz } = this.state
    const rawData = InsightsTopicData.quizQnsData

    const filtered = rawData.filter(qn => {
      const quizOk = selectedQuiz === 'all' || qn.quiz === selectedQuiz
      const tagOk = qn.tag === selectedTag
      return quizOk && tagOk
    })

    const processed = filtered.map(qn => ({
      key: qn.questionID,
      quizTitle: qn.quizTitle,
      questionNumber: qn.questionNumber,
      percentage: percentage1dp(qn.incorrect/qn.total)
    }))

    const sorted = processed.sort((q1, q2) => {
      if (q1.percentage !== q2.percentage) {
        return q2.percentage - q1.percentage
      } else if (q1.quizTitle !== q2.quizTitle) {
        return q1.quizTitle.localeCompare(q2.quizTitle)
      } else {
        return q1.questionNumber - q2.questionNumber
      }
    })

    return sorted
  }
  columns = [
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
          <Button
            shape='circle'
            icon={<EyeOutlined />}
            onClick={() => this.clickViewQuestion(record.key)}
          />
        )
      }
    }
  ];

  changeGraphDropdown = (value) => this.setState({graphDropdown: value})
  clickBar = (index) => {
    const graphData = this.cleanGraphData()
    const quiz = this.state.graphDropdown
    const tag = graphData[index].tag

    this.setState({selectedTag: tag, selectedQuiz: quiz})
  }
  clickViewQuestion = (questionID) => this.setState({viewQuestion: questionID})
  closeModal = () => this.setState({viewQuestion: ''})

  render() {
    const tableData = this.generateTableData()
    const graphData = this.cleanGraphData()
    const chartData = this.generateChartData(graphData)
    const modalQuestion = InsightsTopicData.defaultQuestion

    const { graphDropdown, viewQuestion } = this.state

    return (
      <SideBar activeTab='insights/topic' title="Topic Insights (Tutorial)" subtitle="Identify the most troublesome topics for students" disabled>

        {/* Quiz Question Modal */}
        <Modal
          title={modalQuestion ? `View ${modalQuestion.quizTitle} Question ${modalQuestion.questionNumber}`: "View Question"}
          visible={viewQuestion !== ''}
          footer={null}
          onCancel={this.closeModal}
        >
          {modalQuestion &&
            <div>
              <Title level={3}>{modalQuestion.questionTitle}</Title>
              {modalQuestion.options.map(option => (
                <Card key={option.optionNumber}>
                  <Radio
                    checked={option.optionNumber === modalQuestion.correctOption}
                    disabled={option.optionNumber !== modalQuestion.correctOption}>
                    {option.title}
                  </Radio>
                </Card>
              ))}
            </div>
          }
        </Modal>
        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Title level={3}>Misunderstood Topics & Questions&nbsp;&nbsp;<Button onClick={()=>{this.props.history.goBack()}}>End Tutorial</Button></Title>
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
              <Option value={1}>Mission 1 Quiz</Option>
              <Option value={2}>Mission 2 Quiz</Option>
            </Select>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={24} xs={24} style={{ marginTop: 20, paddingLeft: 20 }}>
            <Col>
              <div align="center">
                <Text strong>Topic Bar Chart</Text>
              </div>
              <div align="center" style={{ marginTop: 10, marginBottom: 20 }}>
                <Text>Click on a bar in the chart below to view a Table of Questions about the topic.</Text>
              </div>
            </Col>
            <Spin spinning={false}>
              <HorizontalBar
                data={chartData}
                width={100}
                height={400}
                options={this.chartOptions}
              />
            </Spin>
          </Col>

          <Col lg={12} md={24} xs={24} style={{ marginTop: 20, paddingLeft: 10, paddingRight: 20 }}>
            <Col>
              <div align="center">
                <Text strong>Table of Questions</Text>
              </div>
              <div align="center" style={{ marginTop: 10, marginBottom: 20 }}>
                <Text>This table will populate with questions from the topics selected.</Text>
              </div>
            </Col>
            <Table columns={this.columns} dataSource={tableData} bordered/>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
