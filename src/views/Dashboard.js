import React from 'react'
import SideBar from '../components/SideBar'

export default class Dashboard extends React.Component {


  render() {
    return (
      <SideBar activeTab='dashboard'>
        Dashboard
      </SideBar>
    )
  }
}
