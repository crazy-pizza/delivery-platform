import React from 'react'
import { Input, Alert, message, Radio } from 'antd'
import { useState, useRef } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from "react-router-dom"
import classnames from 'classnames'
import { axiosFetch } from '@utils'
import style from './login.module.css'

const SUB = '用户名'
const PWD = '密码'

const Register = (props) => {
    const dispatch = useDispatch()
    const [warning, setWarning] = useState()
    const [userName, setUserId] = useState()
    const [type, setType] = useState(3)
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const node1 = useRef(null)
    const node2 = useRef(null)

    const onChangeType = (e) => {
        setType(e.target.value)
    }

    const onOK = () => {
        const formItems = [userName, password]
        const validateTipInfo = [SUB, PWD]
        const index = formItems.findIndex(item => item === undefined)
        if (index > -1) {
            setWarning(`请求输入${validateTipInfo[index]}`)
            return
        }

        if (password !== password2) {
            setWarning(`两次密码输入不一致，请检查后重新输入`)
            return
        }

        setWarning(null)
        axiosFetch({
            api: '/user/add',
            params: {
                userName: userName,
                role: type,
                password,
            },
        }).then(() => {
            message.success('注册成功, 正在登陆...')
            setTimeout(() => { toLogin(userName, password) }, 3000)
        })
    }

    const toLogin = (userName, password) => {
        axiosFetch({
            api: '/user/login',
            params: {
                userName,
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
                props.history.replace('/order')
            }
        })
    }

    const submitClass = classnames({
        [`${style.AccSubmit}`]: true,
        tc: true
    })

    return (
        <section className={style['register-section']}>
            <div>
                <h1 data-i18nid="account-title" className={style['login-title']}>注册</h1>
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
                                    if (keyCode === 13) node1.current.select()
                                }}
                                onChange={(e) => { setUserId(e.target.value) }}
                            />
                        </li>
                        <li>
                            <Input
                                ref={node1}
                                className={style['login-input']}
                                size="large"
                                type="password"
                                name="password"
                                data-reg="/[\w\W]+/"
                                placeholder={`请输入${PWD}`}
                                value={password}
                                onKeyDown={({ keyCode }) => {
                                    if (keyCode === 13) node2.current.select()
                                }}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </li>
                        <li>
                            <Input
                                ref={node2}
                                className={style['login-input']}
                                size="large"
                                type="password"
                                name="password2"
                                data-reg="/[\w\W]+/"
                                placeholder={`请再次输入${PWD}`}
                                value={password2}
                                onKeyDown={({ keyCode }) => {
                                    if (keyCode === 13) { onOK() }
                                }}
                                onChange={(e) => { setPassword2(e.target.value) }}
                            />
                        </li>
                        <li>
                            <Radio.Group onChange={onChangeType} name="radiogroup" defaultValue={3}>
                                <Radio value={3}>注册个人用户</Radio>
                                <Radio value={2}>注册商家用户</Radio>
                            </Radio.Group>
                        </li>
                        <li>
                            <a onClick={onOK} className={submitClass} block>注册</a>
                        </li>
                    </ul>
                </form>
                <p><a href="javascript:void(0)" onClick={props.goLogin}>已有账号？返回登陆 &gt;</a></p>
                <div className={style['login-footer']}>

                </div>
            </div>
        </section>
    )
}

export default withRouter(Register)
