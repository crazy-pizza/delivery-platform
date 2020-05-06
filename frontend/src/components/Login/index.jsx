import React from 'react'
import { Input, Alert, message } from 'antd'
import { useState, useRef } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from "react-router-dom"
import classnames from 'classnames'
import { axiosFetch } from '@utils'
// import { useKeyPress } from '@hooks'
import style from './login.module.css'

const MAIN = '企业账号'
const SUB = '个人账号'
const PWD = '密码'

const Login = (props) => {
    const dispatch = useDispatch()
    const [warning, setWarning] = useState()
    const [groupName, setGroupId] = useState()
    const [userName, setUserId] = useState()
    const [password, setPassword] = useState()
    const node2 = useRef(null)
    const node3 = useRef(null)

    // const [enterPressed, target] = useKeyPress(13)
    // useEffect(() => {
    //     if (enterPressed && target) {
    //     }
    // }, [enterPressed, target])

    const onOK = () => {
        const formItems = [groupName, userName, password]
        const validateTipInfo = [MAIN, SUB, PWD]
        const index = formItems.findIndex(item => item === undefined)
        if (index > -1) {
            setWarning(`请求输入${validateTipInfo[index]}`)
            return
        }
        setWarning(null)
        axiosFetch({
            api: '/login',
            params: {
                groupName: groupName,
                userName: userName,
                password,
            },
        }).then((res) => {
            const nickName = res && res.userName
            dispatch({
                type: 'setUserName',
                payload: nickName,
            })
            message.success('登陆成功')
            props.history.replace('/index/home')
        })
    }

    const submitClass = classnames({
        [`${style.AccSubmit}`]: true,
        tc: true
    })

    return (
        <div className={style['login-container']}>
            <div className={style['login-background']}>
                <div className={style['login-banner']}>
                   
                </div>
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
                                        className={style['login-input']}
                                        autoFocus
                                        size="large"
                                        type="text"
                                        name="groupName"
                                        data-reg="/[\w\W]+/"
                                        placeholder={`请输入${MAIN}`}
                                        value={groupName}
                                        onKeyDown={({ keyCode }) => {
                                            if (keyCode === 13) node2.current.select()
                                        }}
                                        onChange={(e) => { setGroupId(e.target.value) }}
                                    />
                                </li>
                                <li>
                                    <Input
                                        ref={node2}
                                        className={style['login-input']}
                                        size="large"
                                        type="text"
                                        name="userName"
                                        data-reg="/[\w\W]+/"
                                        placeholder={`请输入${SUB}`}
                                        value={userName}
                                        onKeyDown={({ keyCode }) => {
                                            if (keyCode === 13) node3.current.select()
                                        }}
                                        onChange={(e) => { setUserId(e.target.value) }}
                                    />
                                </li>
                                <li>
                                    <Input
                                        ref={node3}
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
                        <div className={style['login-footer']}>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default withRouter(Login)