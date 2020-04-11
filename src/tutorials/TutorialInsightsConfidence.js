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
  Popover,
} from 'antd';
import {
  MailOutlined,
  CopyOutlined,
  QuestionCircleFilled,
  SmileTwoTone,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  PlayCircleOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import CommonPhrases from '../phrases/CommonPhrases'
import InsightsPhrases from '../phrases/InsightsPhrases'
import { Bar } from 'react-chartjs-2';
import { ChartDataLabels } from 'chartjs-plugin-datalabels';
import InsightsConfidenceData from '../variables/InsightsConfidenceData'
import Confidence_Quadrants from '../assets/img/confidence_quadrants.jpg'
import Part2CountGroups from '../assets/img/tutorials/confidenceInsights/part2countgroups.png'
import 'chartjs-plugin-style';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const pageSize = 1;

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];

export default class InsightsConfidence extends React.Component {

  state = {
    step: 3,
    data: [],
    selectedGroup: 0,
    exportGroupModalVisible: false,
  }

  selectedTableRef = null
  clickGroup = (value) => {
    this.setState({selectedGroup: value})
    this.scrollToTable()
  }
  changeStep = (value) => this.setState({step: value})
  openExportModal = () => this.setState({exportGroupModalVisible: true})
  closeExportModal = () => this.setState({exportGroupModalVisible: false})
  clickBar = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }

    this.clickGroup(index+1)
  }
  scrollToTable = () => this.selectedTableRef.scrollIntoView({behavior: 'smooth'})
  endTutorial = () => this.props.history.push('/insights/confidence')

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
    const { selectedGroup } = this.state
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
    const { selectedGroup } = this.state
    const labels = ["Misinformed", "Uninformed", "Almost There", "Knowledgeable"]
    return labels[selectedGroup-1]
  }
  generateSelectedTableColumns = () => {
    const { selectedGroup } = this.state
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
  generateStudentEmailList = (studentList) => {
    let output = ""
    studentList.forEach(student => {
      output += student.studentEmail + "; "
    })
    return output
  }

  render() {
    const {
      step,
      exportGroupModalVisible,
    } = this.state

    const processedStudentData = this.processStudentData(InsightsConfidenceData.studentConfidenceData)
    const aggregated = this.aggregateChartData(processedStudentData)
    const chartData = this.generateChartData(aggregated)
    const tableData = this.filterStudents(processedStudentData)
    const emailList = this.generateStudentEmailList(tableData)
    const legendTableData = this.generateLegendTableData()
    const selectedTableColumns = this.generateSelectedTableColumns()
    const selectedLabel = this.generateSelectedLabel()

    return (
      <SideBar activeTab='insights/confidence' title="Students Insights" subtitle="Identify students who are at risk" disabled>

        {/* Export Student Email Modal */}
        <Modal
          visible={exportGroupModalVisible}
          footer={null}
          onCancel={this.closeExportModal}
          title={`Export ${selectedLabel} Students' Emails`}>

          {/* <Button icon={<CopyOutlined/>}>Copy to Clipboard</Button> */}
          <Paragraph copyable={{text: emailList}} strong>
            Copy Emails to Clipboard
          </Paragraph>

          {tableData.map(student => (
            <p key={student.studentID}>{student.studentEmail}</p>
          ))}
        </Modal>

        {/* Tutorial Part 1a (step 1) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_1A_HEADER}
          visible={step===1}
          closable={false}
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={()=>this.changeStep(2)}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>
            Based on the <b>answer accuracy</b> and <b>chosen confidence level</b>, students are classified into one of these 4 groups.
          </Paragraph>
          <img src={Confidence_Quadrants} alt="Confidence Quadrants" style={{ height: 346, width: 480 }} />
        </Modal>

        {/* Tutorial Part 2 (step 3) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_2_HEADER}
          visible={step===3}
          closable={false}
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>this.changeStep(2)}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={()=>this.changeStep(4)} style={{ marginLeft: 10 }}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>
            This categorization will happen for <u>each quiz question attempted by the student</u>.
            As such, one student will have different frequency counts in each of the 4 groups.
          </Paragraph>
          <Paragraph>
            In this example, Student A has answered 30 questions across all quizzes.
            14 questions were <b>answered incorrectly</b> with '<b>No Confidence</b>' selected.
            Hence there are <b>14 occurrences</b> in the '<b>Misinformed</b>' category for Student A.
            This reasoning can be extended to the other 3 categories.
          </Paragraph>
          <img src={Part2CountGroups} alt="Student Confidence Groups" style={{ width: '100%'}} />
        </Modal>

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 20, marginLeft: 20, paddingRight: 20 }}>
            <Title level={3}>
              {InsightsPhrases.CONFIDENCE_INSIGHTS_HEADER}
              &nbsp;&nbsp;
              <Popover
                title='Confidence Level Categories'
                content={
                  <div style={{width: 480}}>
                    <img src={Confidence_Quadrants} alt="Confidence Quadrants" style={{ height: 346, width: 480 }} />
                    <Paragraph>{InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_1}</Paragraph>
                    <Paragraph>{InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_2}</Paragraph>
                    <Paragraph>{InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_PARA_3}</Paragraph>
                  </div>
                }><Button icon={<QuestionOutlined />} shape='circle'/>
              </Popover>
              &nbsp;&nbsp;
              <Button onClick={this.endTutorial}>End Tutorial</Button>
            </Title>
            <Text>{InsightsPhrases.CONFIDENCE_INSIGHTS_SUBHEADER}</Text>
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

            {/* Tutorial Part 1b (step 2) Modal */}
            <Popover
              visible={step === 2}
              // placement='top'
              title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_1B_HEADER}
              content={
                <Step2PopoverContent
                  endTutorial={this.endTutorial}
                  changeStep={this.changeStep}
                />
              }
              >
              <Table
                title={() => <div style={{ marginTop: 20 }} align='center'><Text strong>Legend</Text></div>}
                columns={this.legendTableColumns}
                rowClassName={(record) => record.color.replace('#', '')}
                dataSource={legendTableData}
                rowKey='groupTitle'
                pagination={chartData.length > pageSize && { pageSize }}
                size="middle"
              />
            </Popover>
          </Col>
        </Row>

        <Row>
          <Col md={24} xs={24} style={{ marginTop: 40, marginLeft: 20, paddingRight: 20 }}>
            <Title level={3}>Students in selected group
            </Title>
            <Button disabled={tableData.length === 0} onClick={this.openExportModal} icon={<MailOutlined/>}>Export Emails</Button>
            <br/>
            <Text>This table will represent the students in the selected group from the chart above.</Text>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
          <Col lg={12} md={18} xs={24}>
            <div ref={(table) => this.selectedTableRef = table}>
              <Table
                columns={selectedTableColumns}
                dataSource={tableData}
                rowKey='studentID'
                bordered
                size='small'
              />
            </div>
          </Col>
        </Row>
      </SideBar>
    )
  }
}

const Step2PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>{InsightsPhrases.CONFIDENCE_TUTORIAL_PART_1B_DESC}</Paragraph>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>props.changeStep(1)}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>props.changeStep(3)}>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
