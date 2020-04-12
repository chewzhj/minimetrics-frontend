import React from 'react'
import SideBar from '../components/SideBar'
import {Table, Tag, Button, Tooltip} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {getAllQuizAPI} from '../api/QuizAPI' // move to actions

const columns2 = [
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default class QuizMain extends React.Component {

  componentDidMount() {
    this.props.loadQuizzes()
  }

  generateTableData = () => {
    const tableData = []

    for (let i = 0; i < 20; i++) {
      let name = `Mission ${i+1} Quiz`
      let status = i<5 ? "Closed" : "Active"

      const rowData = {
        key: name,
        name: name,
        creation: '05/01/20 11:57pm',
        opening: '30/01/20 9:00am',
        closing: '09/02/20 9:00am',
        attempted: '66/504',
        status: status,
      }

      tableData.push(rowData)
    }

    return tableData
  }


  render() {
    const {quizzes, quizLoading} = this.props.quizMain

    const tableData = this.generateTableData()
    return (
      <SideBar activeTab='quiz' title='Quiz' subtitle='Create and Manage Quizzes'>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <div/>
          <Link to="/quiz/create">
            <Button type="primary" icon={<PlusCircleOutlined/>}>Create New Quiz</Button>
          </Link>
        </div>
        <Table
          columns={columns2}
          dataSource={quizzes}
          loading={quizLoading}
          rowKey='quizID'
          bordered
        />
      </SideBar>
    )
  }
}
