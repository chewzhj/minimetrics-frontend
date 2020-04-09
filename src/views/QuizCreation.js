import React from 'react'
import {
  Button,
  Modal,
  Row,
  Col,
  Typography,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Switch,
  Select,
  Radio,
  Card,
  notification,
  Steps,
  Popover,
  Popconfirm
} from 'antd'
import { blue, green, red } from '@ant-design/colors'
import SideBar from '../components/SideBar'
import CommonPhrases from '../phrases/CommonPhrases'
import QuizPhrases from '../phrases/QuizPhrases'
import GlobalConstants from '../variables/GlobalConstants'
import Tooltip_Image from '../assets/img/confidence_tooltip.jpg'

import {
  EyeOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

export default class QuizCreation extends React.Component {

  changeTab = (tab) => this.props.changeTab(tab)
  changeStep = (step) => this.props.changeStep(step)
  nextStep = () => {
    const currStep = this.props.quizCreation.currentStep
    this.changeStep(currStep + 1)
  }
  prevStep = () => {
    const currStep = this.props.quizCreation.currentStep
    this.changeStep(currStep - 1)
  }
  openPreview = () => this.props.openPreview()
  closePreview = () => this.props.closePreview()
  changeTitle = (e) => this.props.changeTitle(e.target.value)
  changeOpeningDate = (m, s) => this.props.changeOpeningDate(m)
  changeOpeningTime = (e) => this.props.changeOpeningTime(e.target.value)
  changeClosingDate = (m, s) => this.props.changeClosingDate(m)
  changeClosingTime = (e) => this.props.changeClosingTime(e.target.value)
  changeMaxAttempts = (value) => this.props.changeMaxAttempts(value)
  toggleAttemptLimit = (e) => this.props.toggleAttemptLimit(e.target.checked)
  toggleConfidence = (checked) => this.props.toggleConfidence(checked)
  changeQuestions = (value) => this.props.updateQuestions(value)
  discardQuizCreation = () => {
    this.props.discardQuizCreation()
    this.props.history.push('/quiz')
  }

  addQuestion = () => {
    const { quizQuestions } = this.props.quizCreation
    const updatedQuestions = quizQuestions.slice(0)
    let newQuestionNumber = quizQuestions.reduce((acc, cur) => Math.max(acc, cur.questionNumber), 0) + 1

    const newQuestion = {
      questionNumber: newQuestionNumber,
      title: '',
      correctOptionNumber: 1,
      options: [
        {
          optionNumber: 1,
          optionText: "",
        }
      ],
      tags: []
    }

    updatedQuestions.push(newQuestion)
    this.changeQuestions(updatedQuestions)
  }
  removeQuestion = (qnNumber) => {
    const { quizQuestions } = this.props.quizCreation
    let updatedQuestions = quizQuestions.filter(question => question.questionNumber !== qnNumber)
    updatedQuestions.sort((q1, q2) => q1.questionNumber - q2.questionNumber)

    let runningNumber = 1
    for (let question of updatedQuestions) {
      question.questionNumber = runningNumber++
    }

    this.changeQuestions(updatedQuestions)
  }
  onChangeQuestion = (qnNumber, qn) => {
    const { quizQuestions } = this.props.quizCreation
    let updatedQuestions = quizQuestions.filter(question => question.questionNumber !== qnNumber)

    updatedQuestions.push(qn)
    updatedQuestions.sort((q1, q2) => q1.questionNumber - q2.questionNumber)

    this.changeQuestions(updatedQuestions)
  }

  checkSubmit = () => {
    const checks = this.enableSubmit()
    let i = 0
    const outputs = []
    if (!checks[0]) {
      outputs.push(`${++i}. Quiz Title is empty`)
    }
    if (!checks[1]) {
      outputs.push(`\n${++i}. Quiz Opening Date is invalid`)
    }
    if (!checks[2]) {
      outputs.push(`\n${++i}. Quiz Opening Time is invalid`)
    }
    if (!checks[3]) {
      outputs.push(`\n${++i}. Quiz Closing Date is invalid`)
    }
    if (!checks[4]) {
      outputs.push(`\n${++i}. Quiz Closing Time is invalid`)
    }
    if (!checks[5]) {
      outputs.push(`\n${++i}. Maximum Attempts is invalid`)
    }
    if (!checks[6]) {
      outputs.push(`\n${++i}. Question or Options are invalid`)
    }

    const messageNodeBuilder = (errors) => {
      return (
        <div>
          There were errors in the following
          {errors.map((msg, idx) => (
            <div key={idx}>
              {msg}
            </div>
          ))}
        </div>
      )
    }

    if (i === 0) {
      this.submitQuiz()
    } else {
      notification.warning({
        message: 'Quiz Creation Error',
        description: messageNodeBuilder(outputs)
      })
    }
  }
  enableSubmit = () => {
    const {
      quizTitle,
      quizStartDate,
      quizStartTime,
      quizEndDate,
      quizEndTime,
      quizMaxAttempts,
      quizAttemptUnlimited,
      quizQuestions,
    } = this.props.quizCreation

    const checks = (new Array(7)).fill(false)
    if (quizTitle.trim() !== "") {
      checks[0] = true
    }
    if (quizStartDate) {
      checks[1] = true
    }
    if (quizStartTime) {
      checks[2] = true
    }
    if (quizEndDate) {
      checks[3] = true
    }
    if (quizEndTime) {
      checks[4] = true
    }
    if (quizAttemptUnlimited || quizMaxAttempts > 0) {
      checks[5] = true
    }
    // check questions
    let qnCheck = true
    if (quizQuestions.length === 0) {
      qnCheck = false
    } else {
      for (const quizQn of quizQuestions) {
        // check whether each question has a title
        if (quizQn.title.trim() === "") {
          qnCheck = false
          break
        }
        // check if there is a correct option picked
        if (quizQn.correctOptionNumber === 0 || quizQn.correctOptionNumber > quizQn.options.length) {
          qnCheck = false
          break
        }
        // check if there are options
        if (quizQn.options.length === 0) {
          qnCheck = false
          break
        } else {
          for (const op of quizQn.options) {
            // check if each option has text
            if (op.optionText.trim() === "") {
              qnCheck = false
              break
            }
          }
        }
      }
    }
    checks[6] = qnCheck

    return checks
  }
  submitQuiz = () => {
    const {
      quizTitle,
      quizStartDate,
      quizStartTime,
      quizEndDate,
      quizEndTime,
      quizMaxAttempts,
      quizAttemptUnlimited,
      quizConfidenceEnabled,
      quizQuestions,
    } = this.props.quizCreation

    let questionFormat = quizQuestions.map(qn => {
      let answerList = qn.options.map(op => {
        return {
          answerText: op.optionText,
          tagList: [],
          isCorrect: qn.correctOptionNumber === op.optionNumber,
        }
      })

      return {
        questionText: qn.title,
        tagList: qn.tags.map(tagText => ({ 'tagName': tagText })),
        points: 1, // not included
        answerList: answerList,
        enableConfidence: quizConfidenceEnabled,
        feedback: null, // not included
      }
    })

    const dateFormat = "YYYY-MM-DD"
    const startDateTime = quizStartDate.format(dateFormat) + " " + quizStartTime + ":00"
    const endDateTime = quizEndDate.format(dateFormat) + " " + quizEndTime + ":00"

    const quizObject = {
      "title": quizTitle,
      "moduleID": GlobalConstants.ModuleID,
      "description": "", // not included
      "isPublished": true,
      "password": "", // not included
      "timeLimit": 60, // not included
      "isGraded": true, // not included
      "displayType": "ALL_AT_ONCE", // not included
      "attempts": quizAttemptUnlimited ? 0 : quizMaxAttempts, // 0 if unlimited?
      "startDate": startDateTime,
      "endDate": endDateTime,
      "displayStudentAnswers": false, // not included
      "displayCorrectAnswers": false, // not included
      "displayTotalMarks": false, // not included
      "displayMarksObtainedForEachQuestion": false, // not included
      "questionList": questionFormat
    }

    console.log(JSON.stringify(quizObject));
    this.props.createQuiz(quizObject)
  }
  onNotification = (growlNotification) => {
    const { quizTitle } = this.props.quizCreation

    const alerts = {
      success: {
        message: `Created ${quizTitle}`,
        description: "Your quiz has been successfully created!"
      },
      error: {
        message: `Error`,
        description: "There has been an unexpected error!"
      }
    }

    const openNotificationWithIcon = type => {
      notification[type](alerts[type]);
    };

    openNotificationWithIcon(growlNotification)

    this.props.resetNotification()

    if (growlNotification === 'success') {
      this.props.history.push('/quiz')
    }
  }

  render() {
    const {
      currentStep,
      quizPreviewVisible,
      quizTitle,
      quizStartDate,
      quizStartTime,
      quizEndDate,
      quizEndTime,
      quizMaxAttempts,
      quizAttemptUnlimited,
      quizConfidenceEnabled,
      quizQuestions,
      submitting,
      growlNotification,
    } = this.props.quizCreation
    if (growlNotification) {
      this.onNotification(growlNotification)
    }

    return (
      <SideBar activeTab='quiz' title="Quiz" subtitle="Create New Quiz">
        {/* Quiz Preview Modal */}
        <Modal
          title="Basic Modal"
          visible={quizPreviewVisible}
          onOk={this.closePreview}
          onCancel={this.closePreview}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        <Row justify="space-between">
          <Col lg={8} md={8} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Popconfirm
              title="Are you sure you want to discard this quiz?"
              onConfirm={this.discardQuizCreation}
              okText="Yes"
              okType='danger'
              cancelText="No"
            >
              <Button type='danger' style={{ float: 'left', marginRight: 10 }}>
                Discard Quiz
              </Button>
            </Popconfirm>
          </Col>

          <Col lg={12} md={16} sm={24} xs={24} style={{ marginTop: 20 }}>
            <Button onClick={this.openPreview} disabled={currentStep === 0} style={{ float: 'right', marginTop: 10, marginLeft: 10 }}>
              Preview Quiz
            </Button>
            <Button onClick={this.checkSubmit} disabled={currentStep===0} loading={submitting} type='primary' style={{ float: 'right', marginTop: 10, marginLeft: 10}}>
              Create Quiz
            </Button>
            <Button onClick={this.nextStep} disabled={currentStep===1} type='primary' style={{ float: 'right', marginLeft: 10, marginTop: 10}}>
              Next
            </Button>
            <Button onClick={this.prevStep} disabled={currentStep === 0} style={{ float: 'right', marginLeft: 10, marginTop: 10 }}>
              Previous
            </Button>
          </Col>
        </Row>

        <Row gutter={[5, 5]} justify="center">
          <Col lg={16} md={16} sm={16} xs={24}>
            <Steps type='navigation' size="small" direction="horizontal" onChange={this.changeStep} current={currentStep} style={{ marginRight: 20, marginTop: 40 }} >
              <Step title="Quiz Settings" />
              <Step title="Build Questions" />
            </Steps>
          </Col>
        </Row>

        <div style={{ height: 20, width: '100%', borderBottom: '1px solid #ddd', marginBottom: 8 }} />
        {currentStep === 0 &&
          <div>
            <Row>
              <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Title level={4}>{CommonPhrases.General}</Title>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.QUIZ_TITLE}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={16} xs={21} style={{ marginLeft: 20 }}>
                <Input placeholder="Title" onChange={this.changeTitle} value={quizTitle} />
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.QUIZ_OPENING_DATES}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={8} sm={11} xs={21} style={{ marginLeft: 20 }}>
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{width: '100%'}}
                  onChange={this.changeOpeningDate}
                  value={quizStartDate}
                />
              </Col>
              <Col md={8} sm={10} xs={21}>
                <Input
                  type='time'
                  onChange={this.changeOpeningTime}
                  value={quizStartTime}
                />
              </Col>
            </Row>
            <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.QUIZ_CLOSING_DATES}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={8} sm={11} xs={21} style={{ marginLeft: 20 }}>
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{width: '100%'}}
                  onChange={this.changeClosingDate}
                  value={quizEndDate}
                />
              </Col>
              <Col md={8} sm={10} xs={21} >
                <Input
                  type='time'
                  onChange={this.changeClosingTime}
                  value={quizEndTime}
                />
              </Col>
            </Row>

            <Row>
              <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Title level={4}>{QuizPhrases.DISPLAY_SETTINGS}</Title>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.ATTEMPTS_LIMIT}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={6} xs={12} style={{ marginLeft: 20 }}>
                <InputNumber
                  min={1}
                  precision={0}
                  style={{ width: '100%' }}
                  value={quizMaxAttempts}
                  onChange={this.changeMaxAttempts}
                  disabled={quizAttemptUnlimited}
                />
              </Col>
              <Col md={2} xs={2}>
                {QuizPhrases.ATTEMPTS}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={6} sm={18} xs={18} style={{ marginLeft: 20 }}>
                <Checkbox onChange={this.toggleAttemptLimit} checked={quizAttemptUnlimited}>{QuizPhrases.NO_ATTEMPTS_LIMIT}</Checkbox>
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={8} sm={12} xs={12} style={{ marginTop: 20, marginLeft: 20 }}>
                <Title level={4}>{QuizPhrases.CONFIDENCE_LEVEL}</Title>
              </Col>
              <Col lg={2} md={2} sm={2} xs={2} style={{ marginTop: 20, marginLeft: 20 }}>
                <Popover
                  title='Preview'
                  // placement="topLeft"
                  content={
                    <img src={Tooltip_Image} alt="MiniMetrics" style={{ height: 270, width: 480 }} />
                  }>
                  <Button icon={<EyeOutlined />} shape='circle' />
                </Popover>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.CONFIDENCE_LEVEL_SWITCH_LABEL_LINE_1}
              </Col>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.CONFIDENCE_LEVEL_SWITCH_LABEL_LINE_2}
              </Col>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.CONFIDENCE_LEVEL_SWITCH_LABEL_LINE_3}<i>{QuizPhrases.CONFIDENCE_LEVEL_SWITCH_LABEL_ROUTE}</i>
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={3} xs={12} style={{ marginLeft: 20, marginTop: 10 }}>
                <Switch checked={quizConfidenceEnabled} onChange={this.toggleConfidence} />
              </Col>
            </Row>
          </div>
        }
        {currentStep === 1 &&
          <div>
            <Row>
              <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Title level={4}>{QuizPhrases.BUILD_QUESTIONS_TITLE}</Title>
              </Col>
            </Row>

            {quizQuestions.map((question, index) => (
              <QuestionCard
                key={question.questionNumber}
                question={question}
                index={index + 1}
                onChange={(qn) => this.onChangeQuestion(question.questionNumber, qn)}
                onRemove={() => this.removeQuestion(question.questionNumber)}
              />
            ))}

            <Row gutter={[30, 30]}>
              <Col md={20} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Button type="dashed" onClick={this.addQuestion} size={"large"} style={{ width: "100%", borderColor: blue[5] }}>
                  <Text style={{ color: blue[5] }}>{QuizPhrases.BUILD_ADD_QUESTION}</Text>
                </Button>
              </Col>
            </Row>
          </div>
        }

      </SideBar>
    )
  }
}

const QuestionCard = (props) => {

  const onChange = (field, value) => {
    let updatedQn = { ...props.question }
    updatedQn[field] = value
    props.onChange(updatedQn)
  }
  const onChangeMultiple = (changes) => {
    let updatedQn = { ...props.question }
    for (const field in changes) {
      updatedQn[field] = changes[field]
    }
    props.onChange(updatedQn)
  }
  const onChangeTitle = (e) => onChange('title', e.target.value)
  const onChangeTags = (options) => onChange('tags', options)
  const onChangeCorrect = (e) => onChange('correctOptionNumber', e.target.value)
  const addOption = () => {
    let updatedOptions = props.question.options.slice(0)
    let newOptionNumber = updatedOptions.reduce((acc, cur) => Math.max(acc, cur.optionNumber), 0) + 1

    const newOption = {
      optionNumber: newOptionNumber,
      optionText: "",
    }

    updatedOptions.push(newOption)
    onChange('options', updatedOptions)
  }
  const removeOption = (opNumber) => {
    let updatedOptions = props.question.options.filter(op => op.optionNumber !== opNumber)
    updatedOptions.sort((o1, o2) => o1.optionNumber - o2.optionNumber)

    let correctOptionNumber = props.question.correctOptionNumber
    if (correctOptionNumber === opNumber) {
      // if we remove the correct option, no correct option
      correctOptionNumber = 0
    } else if (correctOptionNumber > opNumber) {
      // if we dont remove the correct option leave it
      correctOptionNumber--
    } // if corr < remove, then its the same number

    if (updatedOptions.length === 1) {
      // if 1 option left, that is correct and disable removal
      correctOptionNumber = 1
    }

    let runningNumber = 1
    for (let option of updatedOptions) {
      option.optionNumber = runningNumber++
    }

    onChangeMultiple({
      'correctOptionNumber': correctOptionNumber,
      'options': updatedOptions
    })
  }
  const onChangeOption = (opNumber, option) => {
    let updatedOptions = props.question.options.filter(op => op.optionNumber !== opNumber)

    updatedOptions.push(option)
    updatedOptions.sort((o1, o2) => o1.optionNumber - o2.optionNumber)

    onChange('options', updatedOptions)
  }

  const tags = ["Deontology", "Rights", "Virtues", "Fair Use Doctrine", "Utilitarianism"];
  const tags_options = [];
  for (let i = 0; i < tags.length; i++) {
    tags_options.push(<Option key={tags[i]} value={tags[i]}>{tags[i]}</Option>);
  }

  return (
    <div id="appendNewQuestion">
      <Row style={{ marginTop: 20, marginLeft: 20 }}>
        <Col md={20} xs={21}>

          <Card title={QuizPhrases.BUILD_QUESTION + " " + props.index}>

            <Row gutter={[5, 5]}>
              <Col md={24} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Text strong>Title</Text>
              </Col>
            </Row>
            <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
              <Col md={18} xs={21}>
                <TextArea
                  placeholder="Question Title"
                  autoSize={{ minRows: 4 }}
                  value={props.question.title}
                  onChange={onChangeTitle}
                />
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 40 }}>
              <Col md={18} xs={21}>
                <Text strong>{QuizPhrases.BUILD_SELECT_CORRECT_OPTION}</Text>
              </Col>
            </Row>
            <Row gutter={[5, 5]} style={{ marginLeft: 40 }}>

              <Radio.Group style={{ width: '90%', paddingRight: 30 }} value={props.question.correctOptionNumber} onChange={onChangeCorrect}>
                {props.question.options.map((option) => (
                  <QuizQuestionOption
                    key={`option${option.optionNumber}`}
                    option={option}
                    onChange={(op) => onChangeOption(option.optionNumber, op)}
                    onRemove={() => removeOption(option.optionNumber)}
                    disableRemove={props.question.options.length <= 1}
                  />
                ))}
              </Radio.Group>

            </Row>
            <Row>
              <Col md={20} xs={21} style={{ marginTop: 20, marginLeft: 40 }}>
                <Button onClick={addOption} type="dashed" style={{ borderColor: green[5] }}>
                  <Text style={{ color: green[5] }}>{QuizPhrases.BUILD_ADD_OPTION}</Text>
                </Button>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} xs={21}>
                <Text strong>{QuizPhrases.BUILD_QUESTION_TAGS}</Text>
              </Col>
            </Row>
            <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
              <Col md={12} xs={21}>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Type to add a new tag or select from the list"
                  value={props.question.tags}
                  onChange={onChangeTags}>
                  {tags_options}
                </Select>
              </Col>
            </Row>

            <Row>
              <Col md={22} xs={21} style={{ marginTop: 40, marginLeft: 20 }}>
                <Button onClick={props.onRemove} type="dashed" size={"large"} style={{ float: 'right', borderColor: red[5] }}>
                  <Text style={{ color: red[5] }}>{QuizPhrases.BUILD_REMOVE_QUESTION}</Text>
                </Button>
              </Col>
            </Row>

          </Card>

        </Col>
      </Row>
    </div>
  )
}

const QuizQuestionOption = (props) => {

  const onChange = (field, value) => {
    let updatedOption = { ...props.option }
    updatedOption[field] = value
    props.onChange(updatedOption)
  }
  const onChangeOptionText = (e) => {
    onChange('optionText', e.target.value)
  }

  const radioStyle = {
    display: 'block',
    height: 'auto',
    width: '100%',
    lineHeight: '30px',
    marginTop: 10
  };

  return (
    <Radio style={radioStyle} value={props.option.optionNumber}>

      <Col xs={20}>
        <TextArea autoSize={{ minRows: 4 }} style={{ width: '100%' }} value={props.option.optionText} onChange={onChangeOptionText} />
      </Col>

      {props.disableRemove ||
        <Col xs={20}>
          <Button onClick={props.onRemove} type="dashed" style={{ borderColor: red[5] }}>
            <Text style={{ color: red[5] }}>{QuizPhrases.BUILD_REMOVE_OPTION}</Text>
          </Button>
        </Col>
      }

    </Radio>
  )
}
