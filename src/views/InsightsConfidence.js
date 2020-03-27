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
import { QuestionCircleFilled, SmileTwoTone, CloseCircleTwoTone, CheckCircleTwoTone, EyeOutlined } from '@ant-design/icons'
import { ResponsivePie } from '@nivo/pie'

const { Option } = Select;
const { Title, Text } = Typography;

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Freq. in Misinformed',
    dataIndex: 'freqMisinformed',
  },
  {
    title: 'Freq. in Uninformed',
    dataIndex: 'freqUninformed',
  },
  {
    title: 'Freq. in Almost There',
    dataIndex: 'freqAlmostThere',
  },
  {
    title: 'Freq. in Knowledgeable',
    dataIndex: 'freqKnowledgeable',
  },
  {
    title: 'View',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EyeOutlined />} />
      )
    }
  }
];

export default class InsightsConfidence extends React.Component {

  generateTableData = () => {
    const tableData = [
      {
        name: 'Robert Fischer',
        userId: 1,
        freqMisinformed: 33,
        freqUninformed: 33,
        freqAlmostThere: 32,
        freqKnowledgeable: 33
      },
      {
        name: 'Mitchell Robertson',
        userId: 2,
        freqMisinformed: 21,
        freqUninformed: 21,
        freqAlmostThere: 20,
        freqKnowledgeable: 11
      },
      {
        name: 'Ricardo Black',
        userId: 3,
        freqMisinformed: 20,
        freqUninformed: 20,
        freqAlmostThere: 20,
        freqKnowledgeable: 11
      },
      {
        name: 'Harold Edwards',
        userId: 4,
        freqMisinformed: 19,
        freqUninformed: 12,
        freqAlmostThere: 10,
        freqKnowledgeable: 13
      },
      {
        name: 'Jennie Warren',
        userId: 5,
        freqMisinformed: 16,
        freqUninformed: 11,
        freqAlmostThere: 13,
        freqKnowledgeable: 12
      },
      {
        name: 'Audrey Watson',
        userId: 6,
        freqMisinformed: 15,
        freqUninformed: 11,
        freqAlmostThere: 1,
        freqKnowledgeable: 3
      },
      {
        name: 'Judith Richards',
        userId: 7,
        freqMisinformed: 12,
        freqUninformed: 3,
        freqAlmostThere: 3,
        freqKnowledgeable: 11
      },
      {
        name: 'Soham Ngyuen',
        userId: 8,
        freqMisinformed: 11,
        freqUninformed: 4,
        freqAlmostThere: 2,
        freqKnowledgeable: 5
      },
      {
        name: 'Jacob Fox',
        userId: 9,
        freqMisinformed: 11,
        freqUninformed: 4,
        freqAlmostThere: 2,
        freqKnowledgeable: 3
      },
      {
        name: 'Freida Ignan',
        userId: 10,
        freqMisinformed: 7,
        freqUninformed: 3,
        freqAlmostThere: 3,
        freqKnowledgeable: 2
      }
    ]

    return tableData
  }

  render() {
    const tableData = this.generateTableData()

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

          <Col md={6} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fcdbd9' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 14 }}>Misinformed</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: 14, marginTop: 3 }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone twoToneColor="#f04134" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CloseCircleTwoTone twoToneColor="#f04134" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Incorrect</Text>
              </Row>
            </Card>
          </Col>

          <Col md={6} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fccca7' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 14 }}>Uninformed</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: 14, marginTop: 3 }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone rotate="180" twoToneColor="#faaf76" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Not Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CloseCircleTwoTone twoToneColor="#f04134" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Incorrect</Text>
              </Row>
            </Card>
          </Col>

          <Col md={6} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#fff3cf' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 14 }}>"Almost There"</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: 14, marginTop: 3 }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone rotate="180" twoToneColor="#faaf76" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Not Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Correct</Text>
              </Row>
            </Card>
          </Col>

          <Col md={6} sm={24} xs={24}>
            <Card style={{ width: '100%', borderRadius: 4, boxShadow: '2px 1px 4px 0px #bcbcbc', background: '#cfefdf' }}>
              <Row justify="space-between">
                <Text strong style={{ fontSize: 14 }}>Knowledgeable</Text>
                <Tooltip placement="topLeft" title={InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO} arrowPointAtCenter>
                  <QuestionCircleFilled style={{ fontSize: 14, marginTop: 3 }} />
                </Tooltip>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <SmileTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Confident</Text>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '20px' }} />
                <Text style={{ fontSize: 12, marginTop: 1 }}>&nbsp;&nbsp;Correct</Text>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
          <Col md={24} xs={24}>
            <Table columns={columns} dataSource={tableData} bordered={true} />
          </Col>
        </Row>
      </SideBar>
    )
  }
}
