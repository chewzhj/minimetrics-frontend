import React from 'react'
import SideBar from '../components/SideBar'
import {Table, Tag, Button} from 'antd'
import {EditOutlined} from '@ant-design/icons'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Creation Date',
    dataIndex: 'creation',
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
        <Button shape='circle' icon={<EditOutlined/>}/>
      )
    }
  }
];

export default class QuizMain extends React.Component {

  generateTableData = () => {
    const tableData = []

    for (let i = 0; i < 20; i++) {
      let name = `Mission ${i+1} Quiz`
      let status = i<5 ? "Closed" : "Active"

      const rowData = {
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
    const tableData = this.generateTableData()
    return (
      <SideBar activeTab='quiz'>
        Quizzes
        <Table columns={columns} dataSource={tableData} bordered={true}/>
      </SideBar>
    )
  }
}
