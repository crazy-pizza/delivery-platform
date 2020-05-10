import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import style from './login.module.css'

const LoginAndRegister = (props) => {
    const [registerShow, setRegisterShow] = useState(false)

    const goRegister = () => {
        setRegisterShow(true)
    }

    const goLogin = () => {
        setRegisterShow(false)
    }

    return (
        <div className={style['login-container']}>
            <div className={style['login-background']}>
                <div className={style['login-banner']}></div>
                {
                    registerShow ? <Register goLogin={goLogin} /> : <Login goRegister={goRegister} />
                }
            </div>
        </div>
    )
}

export default LoginAndRegister