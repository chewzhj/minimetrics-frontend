import React from 'react'
import {
  Button,
  Input,
  Checkbox,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import LoginPhrases from '../phrases/LoginPhrases'
import {Link} from 'react-router-dom'
import background from '../assets/img/Login_Background_Elements.png'
import MMLogo from '../assets/img/MiniMetrics_Full_Logo.png'

export default class Login extends React.Component {

  onChangeEmail = (e) => this.props.onChangeEmail(e.target.value)
  onChangePassword = (e) => this.props.onChangePassword(e.target.value)
  onCheckRememberMe = (e) => {
    this.props.onChangeRmbme(e.target.checked)
  }

  render() {
    const {email, password, rmbme} = this.props.login

    return (
      <div style={{width: '100%', backgroundImage:`url(${background})`}}>
        <div style={{width: 368, margin:'0px auto', textAlign: 'center', display:'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '12vh'}}>
          <img src={MMLogo} alt='MiniMetrics' style={{height: 157, width: 368, margin: '20px 0px'}}/>
          <div style={{marginBottom: 50}}>
            <span style={{color: 'rgb(0,0,0,0.45)', fontSize: 14}}>{LoginPhrases.APP_SUBTITLE}</span>
          </div>
          <Input
            placeholder={LoginPhrases.INPUT_EMAIL_PLACEHOLDER}
            prefix={<UserOutlined />}
            style={{margin: '8px 0'}}
            onChange={this.onChangeEmail}
            value={email}
          />
          <Input.Password
            placeholder={LoginPhrases.INPUT_PASSWORD_PLACEHOLDER}
            prefix={<LockOutlined />}
            style={{margin: '8px 0'}}
            onChange={this.onChangePassword}
            value={password}
          />
          <div style={{width: '100%', margin: '8px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Checkbox onChange={this.onCheckRememberMe} checked={rmbme}>{LoginPhrases.INPUT_RMBME}</Checkbox>
            <Link to='#'>{LoginPhrases.LINK_FORGOT_PW}</Link>
          </div>
          <Link to='/dashboard'>
            <Button type='primary' style={{width: '100%', margin: '8px 0'}}>
              {LoginPhrases.BUTTON_LOGIN}
            </Button>
          </Link>
          <div style={{width: '100%', margin: '8px 0', display: 'flex', justifyContent: 'flex-end'}}>
            <Link to='/#'>{LoginPhrases.LINK_NUSNET_LOGIN}</Link>
          </div>

          <div style={{marginTop: 100}}>
            <span style={{color: 'rgb(0,0,0,0.45)'}}>Copyright &copy; 2020 MiniMetrics</span>
          </div>
        </div>
      </div>
    )
  }
}
