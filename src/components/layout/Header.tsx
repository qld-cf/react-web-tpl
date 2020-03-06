import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
// import apis from '@api/'
// import { connect } from 'react-redux'
// import moment from 'moment'
import $cookie from 'js-cookie'
import { Button } from 'antd'
import '@css/common/header.scss';

const MyHeader = (props: any) => {
  const history = useHistory()
  const [modalData, setModalData] = useState({} as any)
  const formChange = (e, key) => {
    const value = e.target ? e.target.value : e
    modalData[key] = value
    setModalData(modalData)
  }
  const loginOut = () => {
    $cookie.set('token', '')
    history.push('/login')
  }
  return (
    <div className='header'>
      <div className='logo'>logo</div>
      <Button onClick={loginOut} type='primary' >退出</Button>
    </div>
  )
}

export default withRouter(MyHeader)
