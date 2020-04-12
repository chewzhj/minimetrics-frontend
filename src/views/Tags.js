import React from 'react'
import SideBar from '../components/SideBar'
import {
  Table,
  Typography
} from 'antd';
import TopicPhrases from '../phrases/TopicPhrases'

const { Paragraph } = Typography;

export default class TagsMain extends React.Component {

  componentDidMount() {
    this.props.getTags()
  }

  // Topic Table Config
  columns = [
    {
      title: (<b>Topic</b>),
      dataIndex: 'tagName',
    },
  ];

  render() {
    const { tagList, tagsLoading } = this.props.tags

    return (
      <SideBar activeTab='Topic' title='Topic' subtitle='View topics'>

        <Paragraph>
          {TopicPhrases.TOPIC_PAGE_DESC}
        </Paragraph>
        <Paragraph>
          {TopicPhrases.TOPIC_PAGE_SUGGEST_ADD_TOPIC}
        </Paragraph>

        {/* Topic table */}
        <Table
          rowKey='tagID'
          loading={tagsLoading}
          dataSource={tagList}
          columns={this.columns}
          bordered
          size='small'
        />
      </SideBar>
    )
  }
}
