import React from 'react'
import { Link } from 'react-router-dom'
import { Statistic, Card, Col, Row, Typography } from 'antd';
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
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [85, 60, 30, 15]
  }, {
    hidden: true,
    label: 'Total',
    data: [60, 70, 90, 42, 30]
  }]
};

const misunderstoodTopicsOptions = {
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
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: [85, 60, 30, 15],
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 2,
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  }]
};

const confidenceChartOptions = {
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

export default class Dashboard extends React.Component {


  render() {
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
            <Card title="Tags" bordered={true} style={{ height: 160 }} extra={<Link to='/tags'>More</Link>}>
              <Row type="flex" justify="space-between">
                <Col span={8}>
                  <Statistic
                    title="Created"
                    value={8}
                    precision={0}
                    valueStyle={{ color: '#000' }}
                    prefix={""}
                    suffix=""
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="In Use"
                    value={7}
                    precision={0}
                    valueStyle={{ color: '#000' }}
                    prefix={""}
                    suffix=""
                  />
                </Col>
              </Row>
            </Card>
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
