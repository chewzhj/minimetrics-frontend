import React from 'react'
import SideBar from '../components/SideBar'
import {
  Row,
  Col,
  Table,
  Button,
  Typography,
  Tooltip,
  Divider,
  Modal,
  Popover,
  Result,
} from 'antd';
import {
  MailOutlined,
  QuestionCircleFilled,
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons'
import InsightsPhrases from '../phrases/InsightsPhrases'
import { Bar } from 'react-chartjs-2';
import InsightsConfidenceData from '../variables/tutorialData/InsightsConfidenceData'

import Confidence_Quadrants from '../assets/img/confidence_quadrants.jpg'
import Part2CountGroups from '../assets/img/tutorials/confidenceInsights/part2countgroups.png'
import Part3Scenario1 from '../assets/img/tutorials/confidenceInsights/part3scenario1.png'
import Part3Scenario2 from '../assets/img/tutorials/confidenceInsights/part3scenario2.png'
import Part5ClickBar from '../assets/img/tutorials/confidenceInsights/part5clickbar.gif'
import Part5ClickView from '../assets/img/tutorials/confidenceInsights/part5clickview.gif'
import Part7ExportEmails from '../assets/img/tutorials/confidenceInsights/part7exportemails.gif'
import Part8CopyClipboard from '../assets/img/tutorials/confidenceInsights/part8copyclipboard.gif'
import Part9PasteInEmail from '../assets/img/tutorials/confidenceInsights/part9pasteinemail.gif'
import 'chartjs-plugin-style';

const { Title, Text, Paragraph } = Typography;

const pageSize = 1;

const chartColors = ['#f79992', '#f78e3d', '#ffdd76', '#76d0a3'];

export default class InsightsConfidence extends React.Component {

  state = {
    step: 1,
    data: [],
    selectedGroup: 0,
  }

  selectedTableRef = null
  clickGroup = (value) => {
    if (this.state.step === 7) {
      this.changeStep(8)
      this.setState({selectedGroup: value})
      this.scrollToTable()
    }
  }
  changeStep = (value) => this.setState({step: value})
  clickBar = (arr) => {
    let index = -1
    if (arr && arr.length > 0) {
      index = arr[0]._index
    } else {
      return
    }

    this.clickGroup(index+1)
  }
  changeStepTo7 = () => {
    this.setState({step: 7})
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
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
    layout: {
      padding: {
        top: 30
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
    events: ['mousemove','click'],
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
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
        if (text === "Misinformed") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_MIS
        } else if (text === "Uninformed") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_UNI
        } else if (text === "Almost There") {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_ALM
        } else {
          title = InsightsPhrases.CONFIDENCE_INSIGHTS_EXPLN_GRP_KNO
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
          <Button disabled={this.state.step !== 7} onClick={() => this.clickGroup(index+1)}>View</Button>
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

        {/* Export Student Email Modal (Part 8/step 10)*/}
        <Modal
          visible={step === 10}
          footer={null}
          onCancel={this.closeExportModal}
          title={`Export ${selectedLabel} Students' Emails`}>

          {/* <Button icon={<CopyOutlined/>}>Copy to Clipboard</Button> */}
          <b>Copy Emails to Clipboard</b>

          {/* Tutorial Part 8 (step 10) Popover */}
          <Popover
            visible={step === 10}
            placement='bottom'
            title={
              <div style={{width: 350}}>
                {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_8_HEADER}
              </div>
            }
            content={
              <Step10PopoverContent
                endTutorial={this.endTutorial}
                changeStep={this.changeStep}
              />
            }
          >
            <Text copyable={{text: emailList}} />
          </Popover>

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
          width={600}
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
          <img src={Part2CountGroups} alt="Student Confidence Groups" style={{ width: '100%'}} />
          <Paragraph>
            In this example, Student A has answered 30 questions across all quizzes.
            14 questions were <b>answered incorrectly</b> with '<b>No Confidence</b>' selected.
            Hence there are <b>14 occurrences</b> in the '<b>Misinformed</b>' category for Student A.
            This reasoning can be extended to the other 3 categories.
          </Paragraph>
        </Modal>

        {/* Tutorial Part 3 (step 4) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_3_HEADER}
          visible={step===4}
          closable={false}
          width={600}
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>this.changeStep(3)}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={()=>this.changeStep(5)} style={{ marginLeft: 10 }}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>
            Each student will be assigned to an overall category.
            There are 2 scenarios on how the overall category is assigned.
          </Paragraph>
          <Paragraph>
            <b>Scenario 1</b>: The highest frequency of occurrence for Student A is <u>distinct</u> and it is for '<b>Misinformed</b>'.
            Student A would be classified as '<b>Misinformed</b>'.
          </Paragraph>
          <img src={Part3Scenario1} alt="Student A Classification" style={{ width: '100%'}} />
          <Paragraph>
            <b>Scenario 2</b>: The highest frequency of occurrence for Student B is <u>not distinct</u> and it associated with both '<b>Misinformed</b>' and '<b>Uninformed</b>'.
            Student B will be assigned to the <b>category with higher risk</b>. In this case it would be '<b>Misinformed</b>'.
          </Paragraph>
          <img src={Part3Scenario2} alt="Student B Classification" style={{ width: '100%'}} />
        </Modal>

        {/* Tutorial Part 5a (step 6) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_5A_HEADER}
          visible={step===6}
          closable={false}
          width={600}
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>this.changeStep(5)}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={this.changeStepTo7} style={{ marginLeft: 10 }}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>
            {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_5A_DESC}
          </Paragraph>
          <Paragraph>
            <b>1st Method</b>: Click on the <b>bar</b> of the <b>chart</b>.
          </Paragraph>
          <img src={Part5ClickBar} alt="Get Details from Click Bar" style={{ width: '100%'}} />
          <Divider/>
          <Paragraph>
            <b>2nd Method</b>: Click on the <b>View</b> button in the <b>legend</b>.
          </Paragraph>
          <img src={Part5ClickView} alt="Get Details from Click View" style={{ width: '100%'}} />
          <Paragraph>
            The key group of students would be the '<b>Misinformed</b>' group,
            as they have the highest risk of failing this module.
          </Paragraph>
        </Modal>

        {/* Tutorial Part 9 (step 11) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_9_HEADER}
          visible={step===11}
          closable={false}
          width={600}
          footer={
            <div>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.endTutorial}>
                    End Tutorial
                  </Button>
                </Col>
                <Col>
                  <Button onClick={()=>this.changeStep(10)}>
                    &larr; Back
                  </Button>
                  <Button type="primary" onClick={()=>this.changeStep(12)} style={{ marginLeft: 10 }}>
                    Proceed &rarr;
                  </Button>
                </Col>
              </Row>
            </div>
          }
        >
          <Paragraph>
            {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_9_DESC}
          </Paragraph>
          <Paragraph>
            To <b>email</b> students in the selected group,
            you can <b>paste the copied emails</b> into the <b>To/Bcc</b> field in a new email message.
          </Paragraph>
          <img src={Part9PasteInEmail} alt="Get Details from Click Bar" style={{ width: '100%'}} />
        </Modal>

        {/* Success (step 12) Modal */}
        <Modal
          title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_10_HEADER}
          visible={step===12}
          closable={false}
          footer={null}
        >
          <Result
            status="success"
            title={InsightsPhrases.CONFIDENCE_TUTORIAL_PART_10_CONGRATS}
          />
          <Paragraph style={{ textAlign: 'center' }}>
            {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_10_PARA_1}
          </Paragraph>
          <Paragraph style={{ textAlign: 'center' }}>
            {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_10_PARA_2}
          </Paragraph>
          <Row justify="center">
            <Col>
              <Button type="primary" style={{ marginTop: 20 }} onClick={this.endTutorial}>
                End Tutorial
              </Button>
            </Col>
          </Row>
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

            {/* Tutorial Part 5b (step 7) Popover */}
            <Popover
              visible={step === 7}
              // placement='top'
              title={
                <div style={{width: 350}}>
                  Part 5b: Click on a <b>bar</b> or <b>View</b> to identify students
                </div>
              }
              content={
                <Step7PopoverContent
                  endTutorial={this.endTutorial}
                  changeStep={this.changeStep}
                />
              }
            >
              <Text>{InsightsPhrases.CONFIDENCE_INSIGHTS_SUBHEADER}</Text>
            </Popover>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={24} xs={24} style={{ paddingLeft: 20, paddingRight: 20 }}>

            {/* Tutorial Part 4 (step 5) Popover */}
            <Popover
              visible={step === 5}
              // placement='top'
              title={
                <div style={{width: 350}}>
                  {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_4_HEADER}
                </div>
              }
              content={
                <Step5PopoverContent
                  endTutorial={this.endTutorial}
                  changeStep={this.changeStep}
                />
              }
            >
              <Bar
                data={chartData}
                width={100}
                height={400}
                options={this.chartOptions}
              />
            </Popover>
          </Col>
          <Col lg={12} md={24} xs={24}>

            {/* Tutorial Part 1b (step 2) Popover */}
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
            <div ref={(table) => this.selectedTableRef = table}>
              <Title level={3}>
                Students in selected group
                {/* Tutorial Part 7 (step 9) Popover */}
                <Popover
                  visible={step === 9}
                  placement='bottomRight'
                  title={
                    <div style={{width: 350}}>
                      {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_7_HEADER}
                    </div>
                  }
                  content={
                    <Step9PopoverContent
                      endTutorial={this.endTutorial}
                      changeStep={this.changeStep}
                    />
                  }
                >
                  <Button
                    disabled={tableData.length === 0 && step !== 9}
                    onClick={()=>this.changeStep(10)}
                    style={{marginLeft: 10}}
                    icon={<MailOutlined/>}>
                    Export Emails
                  </Button>
                </Popover>
              </Title>
            </div>
            <Text>This table will represent the students in the selected group from the chart above.</Text>
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
          <Col lg={12} md={18} xs={24}>
            {/* Tutorial Part 6 (step 8) Popover */}
            <Popover
              visible={step === 8}
              title={
                <div style={{width: 350}}>
                  {InsightsPhrases.CONFIDENCE_TUTORIAL_PART_6_HEADER}
                </div>
              }
              content={
                <Step8PopoverContent
                  endTutorial={this.endTutorial}
                  changeStep={this.changeStep}
                  changeStepTo7={this.changeStepTo7}
                />
              }
            >
              <Table
                columns={selectedTableColumns}
                dataSource={tableData}
                rowKey='studentID'
                bordered
                size='small'
              />
            </Popover>
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
const Step5PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>{InsightsPhrases.CONFIDENCE_TUTORIAL_PART_4_DESC}</Paragraph>
      <Paragraph>
        There are <b>18</b> students who are <b>Misinformed</b>,&nbsp;
        <b>28</b> students who are <b>Uninformed</b>,&nbsp;
        <b>29</b> students who are <b>Almost There</b>,&nbsp;
        <b>25</b> students who are <b>Knowledgeable</b>.
      </Paragraph>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>props.changeStep(4)}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>props.changeStep(6)}>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
const Step7PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>
        To <b>proceed</b>, click on the <b>Misinformed bar</b> or the <b>View</b> button of <b>Misinformed</b> on the legend.
      </Paragraph>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>props.changeStep(6)}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} disabled>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
const Step8PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>
        If you had selected the '<b>Misinformed</b>' group in the previous step,
        the names of the students in the '<b>Misinformed</b>' and
        their <b>frequency of occurence</b> of '<b>Misinformed</b>' attempts are shown in the table.
      </Paragraph>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={props.changeStepTo7}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>props.changeStep(9)}>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
const Step9PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>
        To facilitate communication with students in a particular group, click on '<b>Export Emails</b>'.
      </Paragraph>
      <img src={Part7ExportEmails} alt="Export Emails GIF" style={{ width: '100%'}} />
      <Paragraph>
        To <b>proceed</b>, click on '<b>Export Emails</b>'
      </Paragraph>
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>props.changeStep(8)}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} disabled>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
const Step10PopoverContent = (props) => {
  return (
    <div style={{ width: 350 }}>
      <Paragraph>
        Click on the icon next to <b>Copy Emails to Clipboard</b> to copy all the emails.
      </Paragraph>
      <img src={Part8CopyClipboard} alt="Copy to Clipboard GIF" style={{ width: '100%'}} />
      <Divider/>
      <Row justify="space-between">
        <Col>
          <Button onClick={props.endTutorial}>
            End Tutorial
          </Button>
        </Col>
        <Col>
          <Button onClick={()=>props.changeStep(9)}>
            &larr; Back
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={()=>props.changeStep(11)}>
            Proceed &rarr;
          </Button>
        </Col>
      </Row>
    </div>
  )
}
