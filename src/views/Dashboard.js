import React from 'react'
import { Link } from 'react-router-dom'
import { Statistic, Card, Col, Row, Spin } from 'antd';
import moment from 'moment';
import SideBar from '../components/SideBar'
import { HorizontalBar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-style';

// eslint-disable-next-line
import { ChartDataLabels } from 'chartjs-plugin-datalabels'; // needed for data labels

// number of bars shown in topic graph
const topicLimit = 5;

export default class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getTagDashboard()
    this.props.loadChartData()
    this.props.loadConfidenceInsightsData()
  }

  // Dashboard (Quiz): count quiz statuses
  aggregateQuizStatistics = (quizzes) => {
    const now = moment()
    const quizStatisticsObj = {
      'Pending': 0,
      'Published': 0,
      'Active': 0,
      'Closed': 0,
    }

    for (const record of quizzes) {
      let status = 'Pending'

      // if now > end, closed
      if (now.isSameOrAfter(record.endDate)) {
        status = 'Closed'
      } else if (record.isPublished) {
        // if Published & start < now < end, active
        if (now.isSameOrAfter(record.startDate)) {
          status = 'Active'
        } else {
          // if Published & now < start, published
          status = 'Published'
        }
      }
      // if not published, now < end, pending
      // no more else

      // add 1 to the correct index
      quizStatisticsObj[status] += 1
    }

    const quizStatistics = []
    for (const status in quizStatisticsObj) {
      quizStatistics.push({
        label: status,
        value: quizStatisticsObj[status]
      })
    }

    return quizStatistics
  }

  // Dashboard (Topic Insights): calculate percentages
  percentage1dp(number) {
    const thousandtimes = Math.round(number * 1000)
    return thousandtimes / 10
  }
  cleanInsightTopicGraphData = (apiData) => {
    const topicData = apiData

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
          percentage: this.percentage1dp(accumulateIncorrect[tag] / (accumulateIncorrect[tag]+accumulateCorrect[tag]))
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
    return graphData.slice(0, topicLimit)
  }
  generateTopicChartData = (topicData) => {
    const cleanedTopicData = this.cleanInsightTopicGraphData(topicData)
    return {
      labels: cleanedTopicData.map(line => line.tag),
      datasets: [{
        label: 'Incorrect',
        backgroundColor: '#428bca',
        borderColor: '#428bca',
        borderWidth: 1,
        hoverBackgroundColor: '#428bca',
        hoverBorderColor: '#428bca',
        data: cleanedTopicData.map(line => line.percentage),
      }]
    };
  }
  misunderstoodTopicsOptions = {
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
    tooltips: {
      enabled: false
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
          stepSize: 20,
        }
      }]
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  }

  // Dashboard (Student/Confidence Insights): count student groups
  quadToIndex(quadGroup) {
    const quadToIndex = {
      "MISINFORMED": 0,
      "UNINFORMED": 1,
      "ALMOST_THERE": 2,
      "KNOWLEDGEABLE": 3
    }
    return quadToIndex[quadGroup]
  }
  aggregateChartData = (apiData) => {
    const chartGroupData = [0,0,0,0]
    for (const student of apiData) {
      chartGroupData[this.quadToIndex(student.confidenceQuadrantGroup)] += 1
    }
    return chartGroupData
  }
  generateConfidenceChartData = (apiData) => {
    const aggregatedData = this.aggregateChartData(apiData)
    const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];
    return {
      labels: ['Misinformed', 'Uninformed', 'Almost There', 'Knowledgeable'],
      datasets: [{
        label: 'Students',
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 1,
        hoverBackgroundColor: chartColors,
        hoverBorderColor: chartColors,
        data: aggregatedData,
      }]
    };
  }
  confidenceChartOptions = {
    title: {
      display: 'true',
      position: 'left',
      text: 'No. of students'
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: '#000',
        align: 'end',
        anchor: 'end',
      }
    },
    layout: {
      padding: {
        top: 25,
        right: 25
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMin: 0,
          stepSize: 10
        }
      }]
    },
    tooltips: {
      enabled: false
    },
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  }

  render() {
    const {tagDashboardLoading, tagDashboardData} = this.props.tags
    const {quizLoading, quizzes} = this.props.quizMain
    const {graphLoading, graphData} = this.props.insightsTopic
    const {confidenceData, dataLoading} = this.props.insightsConfidence
    // Dashboard (Topics)
    const {totalTags, usedTags} = tagDashboardData
    // Dashboard (Quiz): count quiz statuses
    const quizStatistics = this.aggregateQuizStatistics(quizzes)
    // Dashboard (Topic Insights): calculate percentages
    const topicInsightsChartData = this.generateTopicChartData(graphData)
    // Dashboard (Student/Confidence Insights): count student groups
    const confidenceInsightsChartData = this.generateConfidenceChartData(confidenceData)

    return (
      <SideBar activeTab='dashboard' title='Dashboard' subtitle='Overview'>

        {/* Top Cards: Quiz and Topic Statistics */}
        <Row gutter={[16, 16]}>

          {/* Quiz Statistic Card */}
          <Col sm={15} xs={24}>
            <Spin spinning={quizLoading}>
              <Card title="Quizzes" bordered={true} style={{ height: 160 }} extra={<Link to='/quiz'>More</Link>}>
                <Row type="flex" justify="space-between">
                  {quizStatistics.map(stat => (
                    <QuizStatistic
                      {...stat}
                    />
                  ))}
                </Row>
              </Card>
            </Spin>
          </Col>

          {/* Topic Statistic Card */}
          <Col sm={9} xs={24}>
            <Spin spinning={tagDashboardLoading}>
              <Card title="Topics" bordered={true} style={{ height: 160 }} extra={<Link to='/tags'>More</Link>}>
                <Row type="flex" justify="space-between">
                  <Col span={8}>
                    <Statistic
                      title="Created"
                      value={totalTags}
                      precision={0}
                      valueStyle={{ color: '#000' }}
                      prefix={""}
                      suffix=""
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="In Use"
                      value={usedTags}
                      precision={0}
                      valueStyle={{ color: '#000' }}
                      prefix={""}
                      suffix=""
                    />
                  </Col>
                </Row>
              </Card>

            </Spin>
          </Col>
        </Row>

        {/* Insight Charts: Topic and Student Insights */}
        <Row gutter={[16, 16]}>

          {/* Topic Insights Chart */}
          <Col lg={12} md={24} sm={24} xs={24}>
            <Spin spinning={graphLoading}>
              <Card title={`Top ${topicLimit} Misunderstood Topics`} bordered={true} style={{ height: 'auto' }} extra={<Link to='/insights/topic'>More</Link>}>
              <HorizontalBar
                data={topicInsightsChartData}
                width={'auto'}
                height={'250'}
                options={this.misunderstoodTopicsOptions}
              />
            </Card>
            </Spin>
          </Col>

          {/* Student Insights Chart */}
          <Col lg={12} md={24} sm={24} xs={24}>
            <Spin spinning={dataLoading}>
              <Card title="Student Insights" bordered={true} style={{ height: 'auto' }} extra={<Link to='/insights/confidence'>More</Link>}>
                <Bar
                  data={confidenceInsightsChartData}
                  width={'auto'}
                  height={'250'}
                  options={this.confidenceChartOptions}
                />
              </Card>
            </Spin>
          </Col>
        </Row>
      </SideBar>
    )
  }
}

const QuizStatistic = props => {
  return (
    <Col span={6} key={props.label}>
      <Statistic
        title={props.label}
        value={props.value}
        precision={0}
        valueStyle={{ color: '#000' }}
        prefix={""}
        suffix=""
      />
    </Col>
  )
}
