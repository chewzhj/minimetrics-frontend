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
  Tooltip,
  Divider,
  Modal,
} from 'antd';
import {MailOutlined} from '@ant-design/icons'
import CommonPhrases from '../phrases/CommonPhrases'
import InsightsPhrases from '../phrases/InsightsPhrases'
import { QuestionCircleFilled, SmileTwoTone, CloseCircleTwoTone, CheckCircleTwoTone, EyeOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons'
import { Bar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import InsightsConfidenceData from '../variables/InsightsConfidenceData'
import 'chartjs-plugin-style';

const { Option } = Select;
const { Title, Text } = Typography;

const pageSize = 1;

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];


export default class InsightsConfidence extends React.Component {

  changeSelect = (value, option) => this.props.changeSelect(value)
  clickGroup = (value) => this.props.clickGroup(value)
  exportGroup = () => this.props.exportGroup()
  closeExportModal = () => this.props.closeExportModal()
  clickBar = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }

    this.clickGroup(index+1)
  }

  generateStudentData = () => {
    const names = InsightsConfidenceData.studentNames

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    function randZerotoFifty() {
      return getRandomInt(0,50)
    }

    const tableData = names.map((name, index) => {
      let email = name.replace(" ", "").toLowerCase()

      return {
        studentName: name,
        studentEmail: email+"@minimetrics.com",
        studentID: index+1,
        freqMisinformed: randZerotoFifty(),
        freqUninformed: randZerotoFifty(),
        freqAlmostThere: randZerotoFifty(),
        freqKnowledgeable: randZerotoFifty(),
      }
    })

    console.log(JSON.stringify(tableData));
  }
  processStudentData = (studentData) => {
    return studentData.map((student) => {
      const most = Math.max(student.freqMisinformed, student.freqUninformed, student.freqAlmostThere, student.freqKnowledgeable)
      let group = 0
      if (most === student.freqMisinformed) {
        group = 1
      } else if (most === student.freqUninformed) {
        group = 2
      } else if (most === student.freqAlmostThere) {
        group = 3
      } else {
        group = 4
      }

      return {
        ...student,
        group
      }
    })
  }
  aggregateChartData = (processedStudentData) => {
    const chartGroupData = [0,0,0,0]
    for (const student of processedStudentData) {
      chartGroupData[student.group - 1] += 1
    }
    return chartGroupData
  }
  generateChartData = (aggregatedData) => {
    return {
      labels: ['Misinformed', 'Uninformed', 'Almost There', 'Knowledgeable'],
      datasets: [{
        label: 'Students',
        backgroundColor: chartColors,
        borderColor: chartColors,
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(158, 158, 158, 0.7)',
        hoverBorderColor: 'rgba(158, 158, 158, 0.7)',
        data: aggregatedData,
        shadowOffsetX: 4,
        shadowOffsetY: 4,
        shadowBlur: 4,
        shadowColor: 'rgba(0, 0, 0, 0.4)'
      }]
    };
  }
  chartOptions = {
    title: {
      display: true,
      position: 'left',
      text: 'No. of students'
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: '#000',
        align: 'end',
        anchor: 'end'
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
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    onClick: (e,arr) => this.clickBar(arr),
  }
  filterStudents = (processedStudentData) => {
    const { selectedGroup } = this.props.insightsConfidence
    if (selectedGroup <= 0 || selectedGroup >= 5 ) {
      return []
    }
    const sortKeys = ["freqMisinformed", "freqUninformed", "freqAlmostThere", "freqKnowledgeable"]
    const sortKey = sortKeys[selectedGroup-1]
    const filtered = processedStudentData.filter(student => student.group === selectedGroup)
    const sorted = filtered.sort((s1, s2) => {
      if (s1[sortKey] !== s2[sortKey]) {
        return s2[sortKey] - s1[sortKey]
      } else {
        return s1.studentName.localeCompare(s2.studentName)
      }
    })

    return sorted
  }
  generateLegendTableData = () => {
    const legendTableData = [
      {
        groupTitle: 'Misinformed',
        confident: 1,
        correct: 0,
        color: '#fcdbd9'
      },
      {
        groupTitle: 'Uninformed',
        confident: 0,
        correct: 0,
        color: '#fccca7'
      },
      {
        groupTitle: 'Almost There',
        confident: 0,
        correct: 1,
        color: '#fff3cf'
      },
      {
        groupTitle: 'Knowledgeable',
        confident: 1,
        correct: 1,
        color: '#cfefdf'
      },
    ]

    return legendTableData
  }
  legendTableColumns = [
    {
      title: 'Group',
      dataIndex: 'groupTitle',
      align: 'center',
      render: text => {
        return (
          <Text strong>{ text }</Text>
        )
      }
    },
    {
      title: 'Info',
      align: 'center',
      dataIndex: 'groupTitle',
      render: text => {
        let title = ""
        let color = ""
        if (text === "Misinformed") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS
          color = '#fcdbd9'
        } else if (text === "Uninformed") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI
          color = '#fccca7'
        } else if (text === "Almost There") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM
          color = '#fff3cf'
        } else {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO
          color = '#cfefdf'
        }
        return (
          <Tooltip placement="topLeft" title={title} arrowPointAtCenter>
            <QuestionCircleFilled />
          </Tooltip>
        );
      }
    },
    {
      title: 'Confident',
      align: 'center',
      dataIndex: 'confident',
      render: text => {
        if (text === 1) {
          return (
            <Text><CheckOutlined/> Yes</Text>
          )
        } else {
          return (
            <Text><CloseOutlined/> No</Text>
          )
        }
      }
    },
    {
      title: 'Correct',
      align: 'center',
      dataIndex: 'correct',
      render: text => {
        if (text === 1) {
          return (
            <Text><CheckOutlined/> Yes</Text>
          )
        } else {
          return (
            <Text><CloseOutlined/> No</Text>
          )
        }
      }
    },
    {
      title: 'View Students',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Button onClick={() => this.clickGroup(index+1)}>View</Button>
        )
      }
    }
  ];
  generateSelectedLabel = () => {
    const { selectedGroup } = this.props.insightsConfidence
    const labels = ["Misinformed", "Uninformed", "Almost There", "Knowledgeable"]
    return labels[selectedGroup-1]
  }
  generateSelectedTableColumns = () => {
    const { selectedGroup } = this.props.insightsConfidence
    let label = 'Freq. in Group'
    let sortKey = 'freqMisinformed'
    if (selectedGroup > 0 && selectedGroup < 5 ) {
      const labels = ["Misinformed", "Uninformed", "Almost There", "Knowledgeable"]
      label = 'Freq. in ' + labels[selectedGroup-1]
      const sortKeys = ["freqMisinformed", "freqUninformed", "freqAlmostThere", "freqKnowledgeable"]
      sortKey = sortKeys[selectedGroup-1]
    }

    return [
      {
        title: 'Name',
        dataIndex: 'studentName',
      },
      {
        title: label,
        dataIndex: sortKey,
      },
    ];
  }

  render() {
    const {
      tagSelection,
      exportGroupModalVisible,
    } = this.props.insightsConfidence

    const processedStudentData = this.processStudentData(InsightsConfidenceData.studentConfidenceData)
    const aggregated = this.aggregateChartData(processedStudentData)
    const chartData = this.generateChartData(aggregated)
    const tableData = this.filterStudents(processedStudentData)
    const legendTableData = this.generateLegendTableData()
    const selectedTableColumns = this.generateSelectedTableColumns()
    const selectedLabel = this.generateSelectedLabel()

    return (
      <SideBar activeTab='insights/confidence' title="Students Insights" subtitle="Identify students who are at risk">

        <Modal
          visible={exportGroupModalVisible}
          footer={null}
          onCancel={this.closeExportModal}
          title={`Export ${selectedLabel} Students' Emails`}>
          {tableData.map(student => (
            <p key={student.studentID}>{student.studentEmail}</p>
          ))}
        </Modal>

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
            <Select mode="multiple" allowClear onChange={this.changeSelect} value={tagSelection} style={{ width: '100%', paddingLeft: 20 }}>
              {/* <Option value="allTags">All Tags</Option> */}
              <Option value="Deontology">Deontology</Option>
              <Option value="Fair Use Doctrine">Fair Use Doctrine</Option>
              <Option value="Values">Values</Option>
              <Option value="Rights">Rights</Option>
              <Option value="Utilitarianism">Utilitarianism</Option>
            </Select>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={24} xs={24} style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Bar
              data={chartData}
              width={100}
              height={400}
              options={this.chartOptions}
            />
          </Col>
          <Col lg={12} md={24} xs={24}>
            <Table
              title={() => <div style={{ marginTop: 20 }} align='center'><Text strong>Legend</Text></div>}
              columns={this.legendTableColumns}
              rowClassName={(record) => record.color.replace('#', '')}
              dataSource={legendTableData}
              rowKey='groupTitle'
              pagination={chartData.length > pageSize && { pageSize }}
              size="middle"
            />
          </Col>
        </Row>

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 40, marginLeft: 20, paddingRight: 20 }}>
            <Title level={3}>Students in selected group
            </Title>
            <Button disabled={tableData.length === 0} onClick={this.exportGroup} icon={<MailOutlined/>}>Export Emails</Button>
            <br/>
            <Text>This table will represent the students in the selected group from the chart above.</Text>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
          <Col lg={12} md={18} xs={24}>
            <Table
              columns={selectedTableColumns}
              dataSource={tableData}
              rowKey='studentID'
              bordered
              size='small'
            />
          </Col>
        </Row>
      </SideBar>
    )
  }
}
