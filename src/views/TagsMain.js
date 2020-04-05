import React from 'react'
import SideBar from '../components/SideBar'
import {
  Tabs,
  Row,
  Col,
  Select,
  Table,
  Button
} from 'antd';
import { EyeOutlined } from '@ant-design/icons'

const columns = [
  {
    title: 'Tag',
    dataIndex: 'tag',
  },
  {
    title: 'Percentage / %',
    dataIndex: 'percentage',
  },
  {
    title: 'View',
    render: (text, record, index) => {
      return (
        <Button shape='circle' icon={<EyeOutlined />} />
      )
    }
  }
];

const { TabPane } = Tabs;
const { Option } = Select;

export default class TagsMain extends React.Component {

  render() {
   
    return (
      <SideBar activeTab='tags' title='Tags' subtitle='This is the tags page'>
        Tags
      </SideBar>
    )
  }
}
