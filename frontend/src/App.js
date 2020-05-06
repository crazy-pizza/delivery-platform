import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { Route, Redirect, Switch, useHistory } from "react-router-dom"
import { Skeleton, Login } from '@components'
import { axiosFetch } from '@utils'

import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import 'moment/locale/zh-cn'
import './asset/css/index.css'
import './asset/css/override.antd.css'
import './asset/css/common.css'

function App() {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    axiosFetch({
      api: '/checkStatus',
      params: {},
      showError: false,
    }).then(res => {
        const nickName = res && res.userName
        dispatch({
          type: 'setUserName',
          payload: nickName,
        })
        message.success('欢迎回来')
    }).catch(err => {
        dispatch({
          type: 'setUserName',
          payload: null,
        })
        history.replace('/login')
    })
  }, [])

  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
          <Switch>
            <Route exact path="/"><Redirect to="/index/home" /></Route>

            <Route exact path="/login"><Login /></Route>

            <Route path="/index/:code"><Skeleton /></Route>

            <Route path="*"><Redirect to="/index/home" /></Route>
          </Switch>
      </ConfigProvider>
    </div>
  )
}

export default App
