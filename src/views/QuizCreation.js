import React from 'react'
import { Button, Tabs, Modal, Row, Col, Typography, Input, InputNumber, DatePicker, Checkbox, Switch, Select, Radio, Card } from 'antd'
import { blue, green, red } from '@ant-design/colors';
import { Link } from 'react-router-dom'
import moment from 'moment'
import SideBar from '../components/SideBar'
import CommonPhrases from '../phrases/CommonPhrases'
import QuizPhrases from '../phrases/QuizPhrases'

import {
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs
const { TextArea } = Input;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default class QuizCreation extends React.Component {

  changeTab = (tab) => this.props.changeTab(tab)
  openPreview = () => this.props.openPreview()
  closePreview = () => this.props.closePreview()
  changeTitle = (e) => this.props.changeTitle(e.target.value)
  changeDates = (t1, s1) => this.props.changeDates(t1)
  changeMaxAttempts = (value) => this.props.changeMaxAttempts(value)
  toggleAttemptLimit = (e) => this.props.toggleAttemptLimit(e.target.checked)
  toggleConfidence = (checked) => this.props.toggleConfidence(checked)
  changeQuestions = (value) => this.props.updateQuestions(value)

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

  submitQuiz = () => {
    const {
      currentTab,
      quizPreviewVisible,
      quizTitle,
      quizStartEnd,
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
        enableConfidence: qn.quizConfidenceEnabled,
        feedback: null, // not included
      }
    })

    const dtf = "YYYY-MM-DD HH:mm:ss"

    const quizObject = {
      "title": quizTitle,
      "module": "IS1103",
      "description": "4KIDSONLY", // not included
      "isPublished": true,
      "password": "", // not included
      "timeLimit": 60, // not included
      "isGraded": true, // not included
      "displayType": "ALL_AT_ONCE", // not included
      "attempts": quizAttemptUnlimited ? 0 : quizMaxAttempts, // 0 if unlimited?
      "startDate": quizStartEnd[0].format(dtf),
      "endDate": quizStartEnd[1].format(dtf),
      "displayStudentAnswers": false, // not included
      "displayCorrectAnswers": false, // not included
      "displayTotalMarks": false, // not included
      "displayMarksObtainedForEachQuestion": false, // not included
      "questionList": questionFormat
    }

    console.log(quizObject);
  }

  render() {
    const {
      currentTab,
      quizPreviewVisible,
      quizTitle,
      quizStartEnd,
      quizMaxAttempts,
      quizAttemptUnlimited,
      quizConfidenceEnabled,
      quizQuestions,
    } = this.props.quizCreation


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

        <Row>
          <Col md={24} sm={21} xs={24}>
            <Button onClick={this.openPreview} style={{ float: 'left' }}>
              Preview Quiz
            </Button>
          </Col>
          <Col md={24} sm={21} xs={24} style={{ marginTop: 20 }}>
            <Link to='/quiz'>
              <Button type='danger' style={{ float: 'right', marginRight: 10 }}>
                Discard Quiz
              </Button>
            </Link>
          </Col>
        </Row>

        <div style={{ height: 20, width: '100%', borderBottom: '1px solid #ddd', marginBottom: 8 }} />
        <Tabs activeKey={currentTab} tabPosition='top' onChange={this.changeTab}>
          <TabPane
            key='basic-settings'
            tab={
              <span>
                <BulbOutlined />
                Quiz Settings
              </span>
            }>
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
                {QuizPhrases.QUIZ_DATES}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={16} xs={21} style={{ marginLeft: 20 }}>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
                  onChange={this.changeDates}
                  value={quizStartEnd}
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
              <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Title level={4}>{QuizPhrases.CONFIDENCE_LEVEL}</Title>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.CONFIDENCE_LEVEL_SWITCH_LABEL}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={3} xs={12} style={{ marginLeft: 20 }}>
                <Switch checked={quizConfidenceEnabled} onChange={this.toggleConfidence} />
              </Col>
            </Row>

          </TabPane>

          <TabPane
            key='basic-questions'
            tab={
              <span>
                <SettingOutlined />
                Build Questions
              </span>
            }>

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

          </TabPane>
        </Tabs>

        <Row>
          <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
            <Link to='#'>
              <Button onClick={this.submitQuiz} type='primary' style={{ float: 'left' }}>
                Create Quiz
            </Button>
            </Link>
          </Col>
        </Row>

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

    let runningNumber = 1
    for (let option of updatedOptions) {
      if (props.question.correctOptionNumber === option.optionNumber) {
        onChange('correctOptionNumber', runningNumber)
      }

      option.optionNumber = runningNumber++
    }

    onChange('options', updatedOptions)
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
                  placeholder="Question Tags"
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
        <TextArea autoSize= {{ minRows: 4 }} style={{ width: '100%' }} value={props.option.optionText} onChange={onChangeOptionText} />
      </Col>

      <Col xs={20}>
        <Button onClick={props.onRemove} type="dashed" style={{ borderColor: red[5] }}>
          <Text style={{ color: red[5] }}>{QuizPhrases.BUILD_REMOVE_OPTION}</Text>
        </Button>
      </Col>

    </Radio>
  )
}
