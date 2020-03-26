import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Select,
  Card,
  Table,
  Button,
  Typography,
  Tooltip
} from 'antd';
import CommonPhrases from '../phrases/CommonPhrases'
import InsightsPhrases from '../phrases/InsightsPhrases'
import { QuestionCircleFilled, SmileTwoTone, CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import { ResponsivePie } from '@nivo/pie'

const { Option } = Select;
const { Title, Text } = Typography;

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];

export default class InsightsConfidence extends React.Component {

  render() {
    return (
      <SideBar activeTab='insights/confidence' title="Insights" subtitle="Confidence Insights">

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, paddingRight: 20 }}>
            <Title level={3}>{InsightsPhrases.CONFIDENCE_INSIGHTS_HEADER}
            &nbsp;&nbsp;
              <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP} arrowPointAtCenter>
                <QuestionCircleFilled />
              </Tooltip>
            </Title>

            <Text>{InsightsPhrases.CONFIDENCE_INSIGHTS_SUBHEADER}</Text>
          </Col>
        </Row>
        <Row gutter={[15, 15]} justify="end" style={{ marginTop: 10, marginRight: 20 }}>
          <Col md={6} xs={24}>
            <span style={{ float: 'right', marginTop: 5 }}>{CommonPhrases.DROPDOWN_LABEL_SHOWING_RESULTS_FOR}</span>
          </Col>
          <Col md={8} xs={24}>
            <Select mode="multiple" defaultValue="allTags" style={{ width: '100%', paddingLeft: 20 }}>
              <Option value="allTags">All Tags</Option>
              <Option value="Deontology">Deontology</Option>
              <Option value="Fair Use Doctrine">Fair Use Doctrine</Option>
              <Option value="Values">Values</Option>
              <Option value="Rights">Rights</Option>
              <Option value="Utilitarianism">Utilitarianism</Option>
            </Select>
          </Col>
        </Row>

        <Row>

          <Col md={24} xs={24}>

            <div style={{ height: 400 }}>
              <ResponsivePie
                data={[
                  {
                    "id": "Misinformed",
                    "label": "Misinformed",
                    "value": 85
                  },
                  {
                    "id": "Uninformed",
                    "label": "Uninformed",
                    "value": 60
                  },
                  {
                    "id": "Almost There",
                    "label": "Almost There",
                    "value": 30
                  },
                  {
                    "id": "Knowledgeable",
                    "label": "Knowledgeable",
                    "value": 15
                  }
                ]}
                margin={{ top: 40, right: 80, bottom: 20, left: 80 }}
                innerRadius={0.25}
                padAngle={0.7}
                colors={ chartColors }
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={2}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor={{ from: 'color' }}
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                onClick={(data, event) => {
                  console.log(data);
                  alert("Filter " + data.label + " into table below.");
                }}
              />
            </div>

          </Col>

        </Row>

        <Row gutter={[15, 15]} style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>

          <Col md={12} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fcdbd9' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 16 }}>Misinformed</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: '24px' }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone twoToneColor="#f04134" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CloseCircleTwoTone twoToneColor="#f04134" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Incorrect</Text>
              </Row>
            </Card>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fccca7' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 16 }}>Uninformed</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: '24px' }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone rotate="180" twoToneColor="#faaf76" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Not Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CloseCircleTwoTone twoToneColor="#f04134" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Incorrect</Text>
              </Row>
            </Card>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fff3cf' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 16 }}>"Almost There"</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: '24px' }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone rotate="180" twoToneColor="#faaf76" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Not Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Correct</Text>
              </Row>
            </Card>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#cfefdf' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 16 }}>Knowledgeable</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: '24px' }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px', marginTop: 1 }} />
                <Text>&nbsp;&nbsp;Correct</Text>
              </Row>
            </Card>
          </Col>
        </Row>
      </SideBar>
    )
  }
}
