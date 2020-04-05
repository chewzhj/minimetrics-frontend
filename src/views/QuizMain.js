import React from 'react'
import SideBar from '../components/SideBar'
import {Table, Tag, Button} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {getAllQuizAPI} from '../api/QuizAPI' // move to actions

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Opening Date',
    dataIndex: 'opening',
  },
  {
    title: 'Closing Date',
    dataIndex: 'closing',
  },
  {
    title: 'No. of Students Attempted',
    dataIndex: 'attempted',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status, rec, index) => {
      let color = 'error'
      if (status === 'Active') { color = 'success' }
      else if (status === 'Pending') { color = 'warning' }

      return (
        <Tag color='success'>
          {/* {status} */}
          Active
        </Tag>
      )
    }
  },
  {
    title: 'Edit',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EditOutlined/>}/>
      )
    }
  }
];

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
    dataIndex: 'status',
    render: (status, rec, index) => {
      let color = 'error'
      if (status === 'Active') { color = 'success' }
      else if (status === 'Pending') { color = 'warning' }

      return (
        <Tag color='success'>
          {/* {status} */}
          Active
        </Tag>
      )
    }
  },
  {
    title: 'Edit',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EditOutlined/>}/>
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
        {/* <Table
          rowSelection = {{
            type: 'checkbox',
            ...rowSelection
          }}
          columns={columns}
          dataSource={tableData}
          bordered={true}
        /> */}
      </SideBar>
    )
  }
}
