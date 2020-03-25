import React from 'react'
import { Button, Tabs, Modal, Row, Col, Typography, Input, InputNumber, DatePicker, Checkbox, Switch, Select, Radio, Card } from 'antd'
import { blue, green, red } from '@ant-design/colors';
import { Link } from 'react-router-dom'
import SideBar from '../components/SideBar'
import CommonPhrases from '../phrases/CommonPhrases'
import QuizPhrases from '../phrases/QuizPhrases'

import {
  BulbOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { TabPane } = Tabs

export default class QuizCreation extends React.Component {

  changeTab = (tab) => this.props.changeTab(tab)
  openPreview = () => this.props.openPreview()
  closePreview = () => this.props.closePreview()

  render() {
    const {
      currentTab,
      quizPreviewVisible,
    } = this.props.quizCreation

    const { TextArea } = Input;
    const { Title, Text } = Typography;
    const { RangePicker } = DatePicker;
    const { Option } = Select;

    const tags = ["Deontology", "Rights", "Virtues", "Fair Use Doctrine", "Utilitarianism"];
    const tags_options = [];
    for (let i = 0; i < tags.length; i++) {
      tags_options.push(<Option key={tags[i]}>{tags[i]}</Option>);
    }

    const radioStyle = {
      display: 'block',
      height: 'auto',
      width: '100%',
      lineHeight: '30px',
      marginTop: 10
    };

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
        <Tabs activeKey={currentTab} tabPosition='left' onChange={this.changeTab}>
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
              <Col md={8} xs={21} style={{ marginLeft: 20 }}>
                <Input placeholder="Title"></Input>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.QUIZ_DATES}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={8} xs={21} style={{ marginLeft: 20 }}>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  style={{ width: '100%' }}
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
                {QuizPhrases.TIME_LIMIT}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={3} xs={12} style={{ marginLeft: 20 }}>
                <InputNumber min={1} defaultValue={1} style={{ width: '100%' }} />
              </Col>
              <Col md={2} xs={8}>
                {QuizPhrases.TIME_MINUTES}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={6} xs={12} style={{ marginLeft: 20 }}>
                <Checkbox>{QuizPhrases.NO_TIME_LIMIT}</Checkbox>
              </Col>
            </Row>

            <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
              <Col md={20} sm={21} xs={21}>
                {QuizPhrases.ATTEMPTS_LIMIT}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={3} xs={12} style={{ marginLeft: 20 }}>
                <InputNumber min={1} defaultValue={1} style={{ width: '100%' }} />
              </Col>
              <Col md={2} xs={8}>
                {QuizPhrases.ATTEMPTS}
              </Col>
            </Row>
            <Row gutter={[30, 30]}>
              <Col md={6} xs={21} style={{ marginLeft: 20 }}>
                <Checkbox>{QuizPhrases.NO_ATTEMPTS_LIMIT}</Checkbox>
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
                <Switch defaultChecked />
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

            <div id="appendNewQuestion">
              <Row style={{ marginTop: 20, marginLeft: 20 }}>
                <Col md={16} xs={21}>

                  <Card title={QuizPhrases.BUILD_QUESTION + " " + 1}>

                    <Row gutter={[5, 5]}>
                      <Col md={24} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                        <Text strong>Title</Text>
                      </Col>
                    </Row>
                    <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
                      <Col md={12} xs={21}>
                        <TextArea placeholder="Question Title" autoSize />
                      </Col>
                    </Row>

                    <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 40 }}>
                      <Col md={20} xs={21}>
                        <Text strong>{QuizPhrases.BUILD_SELECT_CORRECT_OPTION}</Text>
                      </Col>
                    </Row>
                    <Row gutter={[5, 5]} style={{ marginLeft: 40 }}>
                      <Col md={12} xs={21}>
                        <Radio.Group style={{ width: '80%' }}>
                          <Radio style={radioStyle} value={1}>
                            <TextArea autoSize />
                          </Radio>
                          <Radio style={radioStyle} value={2}>
                            <TextArea autoSize />
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                    <Col md={20} xs={21} style={{ marginTop: 20, marginLeft: 40 }}>
                      <Button type="dashed" style={{ borderColor: green[5] }}>
                        <Text style={{ color: green[5] }}>{QuizPhrases.BUILD_ADD_OPTION}</Text>
                      </Button>
                    </Col>

                    <Row gutter={[5, 5]} style={{ marginTop: 20, marginLeft: 20 }}>
                      <Col md={20} xs={21}>
                        <Text strong>{QuizPhrases.BUILD_QUESTION_TAGS}</Text>
                      </Col>
                    </Row>
                    <Row gutter={[5, 5]} style={{ marginLeft: 20 }}>
                      <Col md={12} xs={21}>
                        <Select mode="tags" style={{ width: '100%' }} placeholder="Question Tags">
                          {tags_options}
                        </Select>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={22} xs={21} style={{ marginTop: 40, marginLeft: 20 }}>
                        <Button type="dashed" size={"large"} style={{ float: 'right', borderColor: red[5] }}>
                          <Text style={{ color: red[5] }}>{QuizPhrases.BUILD_REMOVE_QUESTION}</Text>
                        </Button>
                        <Button type="dashed" size={"large"} style={{ float: 'left', borderColor: blue[5] }}>
                          <Text style={{ color: blue[5] }}>{QuizPhrases.BUILD_SAVE}</Text>
                        </Button>
                      </Col>
                    </Row>

                  </Card>

                </Col>
              </Row>
            </div>

            <Row gutter={[30, 30]}>
              <Col md={20} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
                <Button type="dashed" size={"large"} style={{ width: "100%", borderColor: blue[5] }}>
                  <Text style={{ color: blue[5] }}>{QuizPhrases.BUILD_ADD_QUESTION}</Text>
                </Button>
              </Col>
            </Row>

          </TabPane>
        </Tabs>

        <Row>
          <Col md={20} sm={21} xs={21} style={{ marginTop: 20, marginLeft: 20 }}>
            <Link to='#'>
              <Button type='primary' style={{ float: 'left' }}>
                Create Quiz
            </Button>
            </Link>
          </Col>
        </Row>

      </SideBar>
    )
  }
}
