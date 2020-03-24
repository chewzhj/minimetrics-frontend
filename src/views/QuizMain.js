import React from 'react'
import SideBar from '../components/SideBar'
import {Table, Tag, Button} from 'antd'
import {Link} from 'react-router-dom'
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'

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
          rowSelection = {{
            type: 'checkbox',
            ...rowSelection
          }}
          columns={columns}
          dataSource={tableData}
          bordered={true}
        />
      </SideBar>
    )
  }
}
