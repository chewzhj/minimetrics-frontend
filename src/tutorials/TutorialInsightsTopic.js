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
  Popover,
  Spin,
  Modal,
  Card,
  Result,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import { green } from '@ant-design/colors'
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-style';
import InsightsTopicData from '../variables/tutorialData/InsightsTopicData'

import Part2ChartDiagram from '../assets/img/tutorials/topicInsights/part2chartdiagram.jpg'
import Part3FilterQuizzes from '../assets/img/tutorials/topicInsights/part3filterquizzes.gif'
import Part5ClickBar from '../assets/img/tutorials/topicInsights/part5clickbar.gif'
import Part6BarSelection from '../assets/img/tutorials/topicInsights/part6barselection.jpg'
import Part7TableData from '../assets/img/tutorials/topicInsights/part7tabledata.jpg'
import Part8ViewQuiz from '../assets/img/tutorials/topicInsights/part8viewquiz.gif'

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

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
    viewportWidth: window.innerWidth,
  }

  /*

  GRAPH CONFIGURATION FUNCTIONS

  */
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
        hoverBackgroundColor: 'rgba(158, 158, 158, 0.7)',
        hoverBorderColor: 'rgba(158, 158, 158, 0.7)',
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
          suggestedMax: 100,
          stepSize: 5
        }
      }]
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    events: ['mousemove','click'],
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    onClick: (e,arr) => this.clickBar(arr),
  }

  /*

  TABLE OF QUESTIONS CONFIGURATION FUNCTIONS

  */
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
            disabled={this.state.step !== 8}
            shape='circle'
            icon={<EyeOutlined />}
            onClick={() => this.clickViewQuestion(record.key)}
          />
        )
      }
    }
  ];

  clickBar = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }
    const graphData = this.cleanGraphData()
    const quiz = this.state.graphDropdown
    const tag = graphData[index].tag

    this.setState({selectedTag: tag, selectedQuiz: quiz})

    if (this.state.step === 6) {
      this.changeStep(7)
    }
  }


  /*

  MODAL CONFIGURATION FUNCTIONS

  */
 clickViewQuestion = (questionID) => {
    this.setState({viewQuestion: questionID})

    if (this.state.step === 8) {
      this.changeStep(9)
    }
  }
  changeStep = (step) => this.setState({step})
  setViewport = (viewportWidth) => this.setState({viewportWidth})
  changeGraphDropdown = (value) => this.setState({graphDropdown: value})
  closeModal = () => {
    if (this.state.step !== 9) {
      this.setState({viewQuestion: ''})
    }
  }
  closeAndBack = () => {
    if (this.state.step === 9) {
      this.setState({viewQuestion: ''})
      this.changeStep(8)
    }
  }
  closeAndForward = () => {
    if (this.state.step === 9) {
      this.setState({viewQuestion: ''})
      this.changeStep(10)
    }
  }
  endTutorial = () => this.props.history.push('/insights/topic')
  showEndTutorialButton = () => {
    if (this.state.step === 9) {
      return (
        <Row justify="end">
        <Col>
          <Button onClick={this.closeAndBack}>
           &larr; Back
          </Button>
          <Button type="primary" onClick={this.closeAndForward}>
            Proceed &rarr;
          </Button>
        </Col>
        </Row>
      )
    } else {
      return null
    }
  }

  render() {
    const tableData = this.generateTableData()
    const graphData = this.cleanGraphData()
    const chartData = this.generateChartData(graphData)
    const modalQuestion = InsightsTopicData.defaultQuestion

    const { graphDropdown, viewQuestion, step, viewportWidth } = this.state

    console.log(viewportWidth)

    return (
      <SideBar activeTab='insights/topic' title="Topic Insights (Tutorial)" subtitle="Identify the most troublesome topics for students" disabled>

        {/* Quiz Question Modal */}
        <Modal
          title={modalQuestion ? `View ${modalQuestion.quizTitle} Question ${modalQuestion.questionNumber}`: "View Question"}
          visible={viewQuestion !== ''}
          footer={this.showEndTutorialButton()}
          closable={this.state.step !== 9}
          onCancel={this.closeModal}
        >
          {modalQuestion &&
            <div>
              <Title level={4}>{modalQuestion.questionTitle}</Title>
              {modalQuestion.options.map(option => (
                <Card
                  key={option.optionNumber}
                  size='small'
                  bodyStyle={{backgroundColor: option.optionNumber === modalQuestion.correctOption ? green[1] : '#d9d9d9'}}>
                  <Text style={{color: option.optionNumber === modalQuestion.correctOption ? 'rgba(0,0,0,0.65)': 'rgba(0,0,0,0.25)'}}>
                    {option.title}
                  </Text>
                </Card>
              ))}
            </div>
          }
        </Modal>

        {/* Part 3 Modal */}
        <Modal
          title="Part 3: Introduction to Topic Insights – Misunderstood Questions"
          visible={step===4}
          closable={false}
          footer={
            <div>
              <Paragraph style={{ textAlign: 'center' }}>Proceed to the next step to find out how to get deeper insights.</Paragraph>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>{this.changeStep(3)}}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={()=>{this.changeStep(5)}}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>Given that ’<b>Deontology</b>’ had the highest number of incorrect 1st attempts, we know that it is the <b>most misunderstood topic</b> at the present.</Paragraph>
          <Paragraph>But why is that so?</Paragraph>
        </Modal>

        {/* Part 4 Modal */}
        <Modal
          title="Part 4: Understanding how to identify misunderstood questions in a topic"
          visible={step===5}
          closable={ false }
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>{this.changeStep(4)}}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={()=>{this.changeStep(6)}}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>To find out what exactly is causing the high rate of misunderstanding for ‘Deontology’, mouse-over the bar and click on it.</Paragraph>
          <img src={ Part5ClickBar } alt='Click Bar GIF' style={{ width: '100%' }}></img>
        </Modal>

        {/* Part 8 Modal */}
        <Modal
          title="Part 8: Conclusion for Topic Insights"
          visible={step===10}
          closable={ false }
          footer={null}
        >
          <Result
            status="success"
            title="Congratulations on completing the tutorial!"
          />
          <Paragraph style={{ textAlign: 'center' }}>We have covered how to identify the most misunderstood topic and what has caused it.</Paragraph>
          <Paragraph style={{ textAlign: 'center' }}>Now you are able to analyse the insights for misunderstood topics and misunderstood questions on your own.</Paragraph>
          <Row justify="center">
            <Col>
              <Button type="primary" style={{ marginTop: 20 }} onClick={this.endTutorial}>
                End Tutorial
              </Button>
            </Col>
          </Row>
        </Modal>

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Title level={3}>
              Misunderstood Topics & Questions&nbsp;&nbsp;
              <Button onClick={this.endTutorial}>End Tutorial</Button>
            </Title>
            <Text>by percentage of incorrect 1st attempts</Text>
          </Col>
        </Row>

        <Row gutter={[15, 15]} justify="end" style={{ marginTop: 10, marginRight: 20 }}>
          <Col md={6} xs={24}>
            <span style={{ float: 'right', marginTop: 5 }}>Showing Results For:</span>
          </Col>

          {/* Part 2 Popover */}
          <Popover
            visible={step===3}
            placement="bottom"
            title={
              <div style={{ width: viewportWidth>700 ? 500 : "100%"}}>
                "Part 2: Understanding how to drill down to specific quizzes"
              </div>
              }
            content={
              <div style={{ width: viewportWidth>700 ? 500 : "100%"}}>
                  <Paragraph>To drill down to the specific quizzes, change the filter that is found on the right side of the page.</Paragraph>
                  <img src={Part3FilterQuizzes} alt='Filter Quizzes' style={{width: '100%'}}></img>
                  <Divider/>
                  <Row justify="space-between">
                    <Col>
                      <Button onClick={this.endTutorial}>
                        End Tutorial
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={()=>{this.changeStep(1)}}>
                        &larr; Back
                      </Button>
                      <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>{this.changeStep(4)}}>
                        Proceed &rarr;
                      </Button>
                    </Col>
                  </Row>
              </div>
            }>
            <Col md={8} xs={24}>
              <Select value={graphDropdown} onChange={this.changeGraphDropdown} style={{ width: '100%', paddingLeft: 20 }}>
                <Option value="all">All Quizzes</Option>
                <Option value={1}>Mission 1 Quiz</Option>
                <Option value={2}>Mission 2 Quiz</Option>
              </Select>
            </Col>
          </Popover>
        </Row>

        {/* Topic Bar Chart */}
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

            {/* Part 1 and 5 Popover */}
            <Popover
              visible={step===1 || step===6}
              placement="top"
              title={
                <div style={{ width: viewportWidth>700 ? 500 : "100%"}}>
                    {
                      step === 1 ?
                        "Part 1: Understanding how to identify percentage of incorrect 1st attempts"
                      : step === 6 ?
                        "Part 5: Understanding how to analyse misunderstood questions"
                      : null
                    }
                </div>
              }
              content={
                step >= 1 && step <= 2 ?
                  <Step1PopoverContent
                    viewportWidth = {viewportWidth}
                    changeStep={this.changeStep}
                    endTutorial={this.endTutorial}
                  />
                : step >= 5 && step <= 7 ?
                  <Step6PopoverContent
                    viewportWidth = {viewportWidth}
                    changeStep={this.changeStep}
                    endTutorial={this.endTutorial}
                  />
                : null
              }>

                <Spin spinning={false}>
                  <HorizontalBar
                    data={chartData}
                    width={100}
                    height={400}
                    options={this.chartOptions}
                  />
                </Spin>
              </Popover>
          </Col>

          {/* Part 6 Popover */}
          <Popover
            visible={step===7}
            placement={viewportWidth>700 ? "left" : "top"}
            title={
              <div style={{ width: viewportWidth>700 ? 350 : "100%"}}>
              Part 6: Understanding how to analyse misunderstood questions
              </div>
              }
            content={
              <div style={{ width: viewportWidth>700 ? 350 : "100%"}}>
                <Paragraph>We can now see that the ‘Table of Questions is populated’ with the topic's questions.</Paragraph>
                <Paragraph> It shows us the different questions in the different quizzes that were labelled as ‘Deontology’.</Paragraph>
                <img src={Part7TableData} alt='Table Data' style={{width: '100%'}}></img>
                <Paragraph style={{ marginTop: 20 }}>If you selected '<b>Deontology</b>', <b>Question 1 from Mission 1 Quiz</b> was incorrectly answered <b>83.3%</b> in all first attempts by students.</Paragraph>
                <Paragraph>It could be that this is the most misunderstood question by students or that the question was phrased wrongly.</Paragraph>
                <Divider/>
                <Row justify="space-between">
                  <Col>
                    <Button onClick={this.endTutorial}>
                      End Tutorial
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={()=>{this.changeStep(6)}}>
                      &larr; Back
                    </Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>{this.changeStep(8)}}>
                      Proceed &rarr;
                    </Button>
                  </Col>
                </Row>
              </div>
            }>
          <Col lg={12} md={24} xs={24} style={{ marginTop: 20, paddingLeft: 10, paddingRight: 20 }}>
            <Col>
              <div align="center">
                <Text strong>Table of Questions</Text>
              </div>
              <div align="center" style={{ marginTop: 10, marginBottom: 20 }}>
                <Text>This table will populate with questions from the topics selected.</Text>
              </div>
            </Col>

              {/* Part 7 Popover */}
              <Popover
              visible={step===8}
              placement={viewportWidth>700 ? "left" : "top"}
              title={
                <div style={{ width: viewportWidth>700 ? 350 : "100%"}}>
                  Part 7: Understanding how to analyse misunderstood questions
                </div>
                }
              content={
                <div style={{ width: viewportWidth>700 ? 350 : "100%"}}>
                <Paragraph>Fret not if you are unable to recall the question details at the top of your mind!</Paragraph>
                <img src={Part8ViewQuiz} alt='View Quiz' style={{width: '100%'}}></img>
                <Paragraph style={{ marginTop: 20 }}>To <b>proceed</b> and find out the question details, click on the eye icon.</Paragraph>
                <Divider/>
                <Row justify="space-between">
                  <Col>
                    <Button onClick={this.endTutorial}>
                      End Tutorial
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={()=>{this.changeStep(7)}}>
                      &larr; Back
                    </Button>
                    <Button disabled type="primary" style={{ marginLeft: 10 }} onClick={()=>{this.changeStep(8)}}>
                    Proceed &rarr;
                    </Button>
                  </Col>
                </Row>
                </div>
              }>
                <Table columns={this.columns} dataSource={tableData} bordered/>
              </Popover>
          </Col>
          </Popover>

        </Row>
      </SideBar>
    )
  }
}

// Part 1 Popover
const Step1PopoverContent = (props) => {
  return (
    <div style={{ width: props.viewportWidth>700 ? 500 : "100%"}}>
        <Paragraph>The graph here shows the relative percentages of incorrect 1st attempts for each topic that was used in the module.</Paragraph>
        <div style={{ textAlign: 'center' }}><img src={Part2ChartDiagram} alt='Chart Diagram' style={{ width: '75%'}}></img></div>
        <Paragraph style={{ marginTop: 20 }}>Observe that questions from the topic '<b>Deontology</b>' were incorrectly answered <b>68%</b> of the time in students' first attempts.</Paragraph>
        <Paragraph>This means that '<b>Deontology</b>' is currently the most misunderstood topic amongst students.</Paragraph>
        <Divider/>
        <Row justify="space-between">
          <Col>
            <Button onClick={props.endTutorial}>
              End Tutorial
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={()=>{props.changeStep(3)}}>
              Proceed &rarr;
            </Button>
          </Col>
        </Row>
    </div>
  )
}

// Part 5 Popover
const Step6PopoverContent = (props) => {
  return (
    <div style={{ width: props.viewportWidth>500 ? 500 : "100%"}}>
      <Paragraph>To <b>proceed</b>, click on the '<b>Deontology</b>' topic (represented by a bar) in the chart to view questions related to it.</Paragraph>
      <div style={{ textAlign: 'center' }}>
        <img src={Part6BarSelection} alt="Bar Selection GIF" style={{ width: '40%' }}/>
      </div>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>{props.changeStep(5)}}>
            &larr; Back
          </Button>
          <Button disabled type="primary" style={{ marginLeft: 10 }} onClick={()=>{props.changeStep(8)}}>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
