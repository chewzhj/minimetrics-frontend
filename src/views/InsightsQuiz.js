import React from 'react'
import { Statistic, Card, Row, Col, Typography } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import SideBar from '../components/SideBar'

const { Title, Text } = Typography;

export default class InsightsQuiz extends React.Component {


  render() {
    return (
      <SideBar activeTab='insights/quiz' title="Insights" subtitle="Quiz Insights">
        <Row>
          <Card title="Mission 1 Quiz" extra={<a href="#">More</a>} style={{ width: '100%' }}>
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <Statistic
                  title="Mean"
                  value={8.95}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Highest Mark"
                  value={10}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Lowest Mark"
                  value={0}
                  precision={2}
                  valueStyle={{ color: '#a8071a' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Median"
                  value={7.95}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
            </Row>
          </Card>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Card title="Mission 2 Quiz" extra={<a href="#">More</a>} style={{ width: '100%' }}>
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <Statistic
                  title="Mean"
                  value={3.94}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Highest Mark"
                  value={10}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Lowest Mark"
                  value={0}
                  precision={2}
                  valueStyle={{ color: '#a8071a' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Median"
                  value={3}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
            </Row>
          </Card>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Card title="Mission 3 Quiz" extra={<a href="#">More</a>} style={{ width: '100%' }}>
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <Statistic
                  title="Mean"
                  value={9.94}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Highest Mark"
                  value={10}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Lowest Mark"
                  value={0}
                  precision={2}
                  valueStyle={{ color: '#a8071a' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Median"
                  value={9}
                  precision={2}
                  valueStyle={{ color: '#237804' }}
                  prefix={""}
                  suffix="/ 10"
                />
              </Col>
            </Row>
          </Card>
        </Row>


      </SideBar>
    )
  }
}
