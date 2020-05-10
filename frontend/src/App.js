import React, { useEffect } from 'react'
import { useDispatch } from 'redux-react-hook'
import { Route, Redirect, Switch, useHistory } from "react-router-dom"
import { Skeleton, Login, SkeletonOrder } from '@components'
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
      api: '/user/checkStatus',
      params: {},
      showError: false,
    }).then(res => {
        dispatch({
          type: 'setUserInfo',
          payload: {
            userName: res.userName,
            userID: res.userID,
          },
        })
        if (res.role === '3') {
          history.replace('/order/order')
        }

        message.success('欢迎回来')
    }).catch(err => {
        dispatch({
          type: 'setUserInfo',
          payload: {},
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

            <Route path="/order/:code"><SkeletonOrder /></Route>

            <Route path="*"><Redirect to="/index/home" /></Route>
          </Switch>
      </ConfigProvider>
    </div>
  )
}

export default App
