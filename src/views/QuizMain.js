import React from 'react'
import SideBar from '../components/SideBar'
import {Row, Col, Table, Tag, Button, Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'

export default class QuizMain extends React.Component {

  componentDidMount() {
    this.props.loadQuizzes()
  }

  // table columns config
  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDateTime',
      render: (createdDateTime, record, index) => {
        if (!createdDateTime) return ""
        const datefmt = moment(createdDateTime).format("DD/MM/YY h:mmA")
        return datefmt
      }
    },
    {
      title: 'Opening Date',
      dataIndex: 'startDate',
      render: (startDate, record, index) => {
        if (!startDate) return ""
        const datefmt = moment(startDate).format("DD/MM/YY h:mmA")
        return datefmt
      }
    },
    {
      title: 'Closing Date',
      dataIndex: 'endDate',
      render: (endDate, record, index) => {
        if (!endDate) return ""
        const datefmt = moment(endDate).format("DD/MM/YY h:mmA")
        return datefmt
      }
    },
    {
      title: 'Status',
      render: (text, rec, index) => {
        const now = moment()
        const openDate = moment(rec.startDate)
        const closDate = moment(rec.endDate)
        let status = 'Pending'

        // if now > end, closed
        if (now.isSameOrAfter(closDate)) {
          status = 'Closed'
        } else if (rec.isPublished) {
          // if Published & start < now < end, active
          if (now.isSameOrAfter(openDate)) {
            status = 'Active'
          } else {
            // if Published & now < start, published
            status = 'Published'
          }
        }
        // if not published, now < end, pending
        // no more else

        let color = 'default'
        if (status === 'Active') { color = 'success' }
        else if (status === 'Pending') { color = 'warning' }
        else if (status === 'Closed') { color = 'error' }
        else if (status === 'Published') { color = 'processing' }

        return (
          <Tag color={color}>
            {status}
          </Tag>
        )
      }
    },
    {
      title: 'Edit',
      render: (text, record, index) => {
        return (
          <Tooltip title='Not implemented'>
            <Button shape='circle' disabled icon={<EditOutlined/>}/>
          </Tooltip>
        )
      }
    }
  ];

  render() {
    const {quizzes, quizLoading} = this.props.quizMain

    return (
      <SideBar activeTab='quiz' title='Quiz' subtitle='Create and Manage Quizzes'>
        {/* Create Quiz Button */}
        <Row gutter={[20, 20]} justify='end'>
          <Col>
            <Link to="/quiz/create">
              <Button type="primary" icon={<PlusCircleOutlined/>}>Create New Quiz</Button>
            </Link>
          </Col>
        </Row>

        {/* Table of Quizzes */}
        <Table
          columns={this.columns}
          dataSource={quizzes}
          loading={quizLoading}
          rowKey='quizID'
          bordered
        />
      </SideBar>
    )
  }
}
