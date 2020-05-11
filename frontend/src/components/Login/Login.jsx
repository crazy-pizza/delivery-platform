import React from 'react'
import { Input, Alert, message } from 'antd'
import { useState, useRef } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from "react-router-dom"
import classnames from 'classnames'
import { axiosFetch } from '@utils'
import style from './login.module.css'

const SUB = '用户名'
const PWD = '密码'

const Login = (props) => {
    const dispatch = useDispatch()
    const [warning, setWarning] = useState()
    const [userName, setUserId] = useState()
    const [password, setPassword] = useState()
    const node = useRef(null)

    const onOK = () => {
        const formItems = [userName, password]
        const validateTipInfo = [SUB, PWD]
        const index = formItems.findIndex(item => item === undefined)
        if (index > -1) {
            setWarning(`请求输入${validateTipInfo[index]}`)
            return
        }
        setWarning(null)
        axiosFetch({
            api: '/user/login',
            params: {
                userName: userName,
                password,
            },
        }).then(({ userName, userID, role }) => {
            dispatch({
                type: 'setUserInfo',
                payload: {
                    userName,
                    userID,
                },
            })
            message.success('登陆成功')
            if (role === '1') {
                props.history.replace('/index/home')
            } else if (role === '2') {
                props.history.replace('/index/home')
            } else if(role === '3') {
                props.history.replace('/order/order')
            }
        })
    }

    const submitClass = classnames({
        [`${style.AccSubmit}`]: true,
        tc: true
    })
    return (
        <section className={style['login-section']}>
            <div>
                <h1 data-i18nid="account-title" className={style['login-title']}>帐号登录</h1>
                <div className={style['login-err']}>
                    { warning && <Alert message={warning} type="warning" showIcon /> }
                </div>
                <form>
                    <ul className="login-accountForm form">
                        <li>
                            <Input
                                autoFocus
                                className={style['login-input']}
                                size="large"
                                type="text"
                                name="userName"
                                data-reg="/[\w\W]+/"
                                placeholder={`请输入${SUB}`}
                                value={userName}
                                onKeyDown={({ keyCode }) => {
                                    if (keyCode === 13) node.current.select()
                                }}
                                onChange={(e) => { setUserId(e.target.value) }}
                            />
                        </li>
                        <li>
                            <Input
                                ref={node}
                                className={style['login-input']}
                                size="large"
                                type="password"
                                name="password"
                                data-reg="/[\w\W]+/"
                                placeholder={`请输入${PWD}`}
                                value={password}
                                onKeyDown={({ keyCode }) => {
                                    if (keyCode === 13) { onOK() }
                                }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </li>
                        <li>
                            <a onClick={onOK} className={submitClass} block>登录</a>
                        </li>
                    </ul>
                </form>
                <p><a href="javascript:void(0)" onClick={props.goRegister}>注册账户 &gt;</a></p>
                <div className={style['login-footer']}>

                </div>
            </div>
        </section>
    )
}

export default withRouter(Login)
