import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Divider,
  Select,
  Table,
  Button,
  Typography,
  Spin,
  Modal,
  Card,
  Radio,
} from 'antd';
import { EyeOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { green } from '@ant-design/colors'
import { ResponsiveBar } from '@nivo/bar'
import { HorizontalBar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import { Link } from 'react-router-dom'
import 'chartjs-plugin-style';
import GlobalConstants from '../variables/GlobalConstants'
import InsightsTopicData from '../variables/InsightsTopicData'

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const percentage1dp = (number) => {
  const thousandtimes = Math.round(number * 1000)
  return thousandtimes / 10
}

export default class InsightsTopic extends React.Component {

  componentDidMount() {
    this.props.loadChartData(GlobalConstants.ModuleID)
  }

  cleanGraphData = () => {
    const { graphDropdown, graphData } = this.props.insightsTopic
    const { tagList } = this.props.tags
    const topicData = graphData

    if (graphDropdown === 'all') {
      let accumulateIncorrect = {}
      let accumulateCorrect = {}
      let holdingTagID = {}
      for (const quiz of topicData) {
        for (const tag of quiz.tagList) {
          if (!holdingTagID[tag.tagName]) {
            holdingTagID[tag.tagName] = tag.tagID
            accumulateCorrect[tag.tagName] = 0
            accumulateIncorrect[tag.tagName] = 0
          }
          accumulateIncorrect[tag.tagName] += tag.incorrect
          accumulateCorrect[tag.tagName] += tag.correct
        }
      }
      let graphData = []
      for (const tag in accumulateIncorrect) {
        if (accumulateIncorrect[tag]+accumulateCorrect[tag] > 0) {
          graphData.push({
            tag: tag,
            tagID: holdingTagID[tag],
            percentage: percentage1dp(accumulateIncorrect[tag] / (accumulateIncorrect[tag]+accumulateCorrect[tag]))
          })
        }
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
      const topicDataFiltered = topicData.filter(quiz => quiz.quiz.quizID === graphDropdown)
      if (topicDataFiltered.length === 0) {
        return []
      }
      const quizTopicData = topicDataFiltered[0]
      return quizTopicData.tagList.filter(tag => (
        tag.correct + tag.incorrect > 0
      )).map(tag => ({
        tag: tag.tagName,
        tagID: tag.tagID,
        percentage: percentage1dp(tag.incorrect / (tag.correct+tag.incorrect))
      })).sort((t1, t2) => {
        if (t1.percentage !== t2.percentage) {
          return t2.percentage - t1.percentage
        } else {
          return t1.tag.localeCompare(t2.tag)
        }
      })
    }
  }
  cleanGraphTempData = () => {
    const { graphDropdown } = this.props.insightsTopic
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
        hoverBackgroundColor: 'rgba(158, 158, 158, 0.7)',
        hoverBorderColor: 'rgba(158, 158, 158, 0.7)',
        data: prevChartData.map(line => line.percentage),
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 4,
        shadowColor: 'rgba(0, 0, 0, 0.4)'
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
          suggestedMax: 100,
          stepSize: 5
        }
      }]
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    onClick: (e,arr) => this.clickBar(arr),
  }
  generateTableData = () => {
    const { questionTableData } = this.props.insightsTopic

    const processed = []
    // const filtered = rawData.filter(qn => {
    //   const quizOk = selectedQuiz === 'all' || qn.quiz === selectedQuiz
    //   const tagOk = qn.tag === selectedTag
    //   return quizOk && tagOk
    // })
    for (const quiz of questionTableData) {
      for (const qn of quiz.questionList) {
        if (qn.incorrect+qn.correct > 0) {
          processed.push({
            key: qn.questionID,
            quizTitle: quiz.title,
            questionNumber: qn.sequence,
            percentage: percentage1dp(qn.incorrect/(qn.incorrect+qn.correct))
          })
        }
      }
    }

    // const processed = filtered.map(qn => ({
    //   key: qn.questionID,
    //   quizTitle: qn.quizTitle,
    //   questionNumber: qn.questionNumber,
    //   percentage: percentage1dp(qn.incorrect/qn.total)
    // }))

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
  generateTableDataTemp = () => {
    const { selectedTag, selectedQuiz } = this.props.insightsTopic
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
  cleanViewQuestion = () => {
    const { viewQuestion } = this.props.insightsTopic

  }
  filterQuestion = () => {
    const rawData = InsightsTopicData.quizQnsData
    const { viewQuestionID } = this.props.insightsTopic

    if (viewQuestionID === '') {
      return null
    }

    return rawData.filter(qn => qn.questionID === viewQuestionID)[0]
  }
  openTutorial = () => {
    this.closeTutorialModal()
    this.props.history.push('/tutorials/insights/topic')
  }

  changeGraphDropdown = (value) => this.props.changeDropdown(value)
  clickBar = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }
    const moduleID = sessionStorage.getItem('moduleID')
    const graphData = this.cleanGraphData()
    const tagID = graphData[index].tagID
    const { graphDropdown } = this.props.insightsTopic
    let quizID = null
    console.log(graphDropdown);
    if (graphDropdown && graphDropdown !== 'all') {
      quizID = graphDropdown
    }

    this.props.getQuestionsOfTopics(moduleID, quizID, tagID)
    // this.props.clickBar(tag, quiz);
  }
  clickBarTemp = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }
    const graphData = this.cleanGraphData()
    const quiz = this.props.insightsTopic.graphDropdown
    const tag = graphData[index].tag

    this.props.clickBar(tag, quiz);
  }
  clickViewQuestion = (questionID) => this.props.clickViewQuestion(questionID)
  closeModal = () => this.props.closeModal()
  openTutorialModal = () => this.props.openTutorialModal()
  closeTutorialModal = () => this.props.closeTutorialModal()

  render() {
    const tableData = this.generateTableData()
    const graphData = this.cleanGraphData()
    const chartData = this.generateChartData(graphData)
    const modalQuestion = this.filterQuestion()

    const {
      graphDropdown,
      viewQuestionID,
      graphLoading,
      viewQuestion,
      viewQuestionLoading,
      viewQuestionModalVisible,
      tutorialModalVisible,
    } = this.props.insightsTopic
    const { tagsLoading, tagList } = this.props.tags
    const { quizLoading, quizzes } = this.props.quizMain

    return (
      <SideBar activeTab='insights/topic' title="Topic Insights" subtitle="Identify the most troublesome topics for students">

        {/* Quiz Question Modal */}
        <Modal
          title="View Question"
          visible={viewQuestionModalVisible}
          footer={null}
          onCancel={this.closeModal}
        >
          {viewQuestion.answerList &&
            <div>
              <Title level={4}>{viewQuestion.questionText}</Title>
              {viewQuestion.answerList.map(option => (
                <Card
                  key={option.answerID}
                  size='small'
                  bodyStyle={{backgroundColor: option.isCorrect? green[1] : '#d9d9d9'}}>
                  {/* change to disabled color */}
                  <Text style={{color: option.isCorrect? 'rgba(0,0,0,0.65)': 'rgba(0,0,0,0.25)'}}>{option.answerText}</Text>
                </Card>
              ))}
            </div>
          }
        </Modal>
        {/* Start Tutorial Modal */}
        <Modal
          title='Introduction to Topic Insights - Misunderstood Topics'
          visible={tutorialModalVisible}
          onCancel={this.closeTutorialModal}
          footer={[
            <Paragraph key='para' style={{ textAlign: 'center' }}>Proceed to the next step to see how you can analyse this insight.</Paragraph>,
            <Row key='buttons' justify="space-between">
            <Col>
              <Button key="back" onClick={this.closeTutorialModal}>
                End Tutorial
              </Button>
            </Col>
            <Col>
              <Button key="submit" type="primary" onClick={this.openTutorial}>
                Proceed &rarr;
              </Button>
            </Col>
            </Row>,
          ]}
        >
          <div>
            <Paragraph>Curious to find out which topics are the most misunderstood?</Paragraph>
            <Paragraph>This page provides insights of percentage of incorrect 1st attempts.</Paragraph>
            <Paragraph>Topics with higher percentage of incorrect 1st attempts indicate misunderstanding.</Paragraph>
          </div>
        </Modal>
        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Title level={3}>
              Misunderstood Topics & Questions&nbsp;&nbsp;
              <Button onClick={this.openTutorialModal} icon={<PlayCircleOutlined/>}>
                Tutorial
              </Button>
            </Title>
            <Text>by percentage of incorrect 1st attempts</Text>
          </Col>
        </Row>
        <Row gutter={[15, 15]} justify="end" style={{ marginTop: 20, marginRight: 20 }}>
          <Col md={12} xs={24}>
            <span style={{ float: 'right', marginTop: 5 }}>Showing Results For:</span>
          </Col>
          <Col md={8} xs={24}>
            <Select disabled={quizLoading} value={graphDropdown} onChange={this.changeGraphDropdown} style={{ width: '100%', paddingLeft: 20 }}>
              <Option value="all">All Quizzes</Option>
              {quizzes.map(quiz => (
                <Option key={quiz.quizID} value={quiz.quizID}>{quiz.title}</Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }}>


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
            <Spin spinning={graphLoading && tagsLoading}>
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
            <Table columns={this.columns} dataSource={tableData} bordered />
          </Col>
        </Row>
      </SideBar>
    )
  }
}
