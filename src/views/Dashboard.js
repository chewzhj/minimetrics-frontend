import React from 'react'
import { Link } from 'react-router-dom'
import { Statistic, Card, Col, Row, Typography, Spin } from 'antd';
import SideBar from '../components/SideBar'
import { HorizontalBar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-style';


const { Title, Text } = Typography;

/*

TOPIC CHART

*/

const quizChartData = {
  labels: ['Deontology', 'Virtues', 'Utilitarianism', 'Fair Use Doctrine', 'Rights'],
  datasets: [{
    label: 'Incorrect',
    backgroundColor: '#428bca',
    borderColor: '#428bca',
    borderWidth: 1,
    hoverBackgroundColor: '#428bca',
    hoverBorderColor: '#428bca',
    data: [85, 60, 30, 15]
  }, {
    hidden: true,
    label: 'Total',
    data: [60, 70, 90, 42, 30]
  }]
};

const misunderstoodTopicsOptions = {
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
        stepSize: 5
      }
    }]
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  }
}

/*

CONFIDENCE CHART

*/

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];

const data = {
  labels: ['Misinformed', 'Uninformed', 'Almost There', 'Knowledgeable'],
  datasets: [{
    label: 'Students',
    backgroundColor: chartColors,
    borderColor: chartColors,
    borderWidth: 1,
    hoverBackgroundColor: chartColors,
    hoverBorderColor: chartColors,
    data: [85, 60, 30, 15]
  }]
};

const confidenceChartOptions = {
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

export default class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getTagDashboard()
    this.props.loadQuizzes()
    this.props.loadChartData()
  }

  render() {
    const {tagDashboardLoading, tagDashboardData} = this.props.tags
    const {quizLoading, quizzes} = this.props.quizMain
    const {graphLoading, graphData} = this.props.tags
    const {totalTags, usedTags} = tagDashboardData

    return (
      <SideBar activeTab='dashboard' title='Dashboard' subtitle='Overview'>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="Quizzes" bordered={true} style={{ height: 160 }} extra={<Link to='/quiz'>More</Link>}>
              <Row type="flex" justify="space-between">
                <Col span={8}>
                  <Statistic
                    title="Published"
                    value={2}
                    precision={0}
                    valueStyle={{ color: '#000' }}
                    prefix={""}
                    suffix=""
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Closed"
                    value={5}
                    precision={0}
                    valueStyle={{ color: '#000' }}
                    prefix={""}
                    suffix=""
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Pending"
                    value={8}
                    precision={0}
                    valueStyle={{ color: '#000' }}
                    prefix={""}
                    suffix=""
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Spin spinning={tagDashboardLoading}>
              <Card title="Tags" bordered={true} style={{ height: 160 }} extra={<Link to='/tags'>More</Link>}>
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

        <Row gutter={[16, 16]}>
          <Col lg={12} md={24} sm={24} xs={24}>
            <Card title="Misunderstood Topics" bordered={true} style={{ height: 'auto' }} extra={<Link to='/insights/topic'>More</Link>}>
              <HorizontalBar
                data={quizChartData}
                width={'auto'}
                height={'250'}
                options={misunderstoodTopicsOptions}
              />
            </Card>
          </Col>

          <Col lg={12} md={24} sm={24} xs={24}>
            <Card title="Confidence Insights" bordered={true} style={{ height: 'auto' }} extra={<Link to='/insights/confidence'>More</Link>}>
              <Bar
                data={data}
                width={'auto'}
                height={'250'}
                options={confidenceChartOptions}
              />
            </Card>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
