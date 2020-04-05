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
import { getAllTagAPI } from '../api/TagApi'

const columns = [
  {
    title: 'Tag',
    dataIndex: 'tag',
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

  componentDidMount() {
    this.props.getTags()
  }

  render() {
    const { tagList, tagsLoading } = this.props.tags

    return (
      <SideBar activeTab='tags' title='Tags' subtitle='This is the tags page'>
        <Table
          rowKey='tag'
          loading={tagsLoading}
          dataSource={[{tag: 'Deontology'}]}
          columns={columns}
        />
      </SideBar>
    )
  }
}
