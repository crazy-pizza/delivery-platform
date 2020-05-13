import React from 'react'
import { message, Modal, Avatar } from 'antd'
import styles from './my.module.css'
import { Icon, UploadAvatar } from '@components'
import { axiosFetch } from '@utils'
import { withRouter } from 'react-router-dom'

export const My = (props) => {

    const logout = () => {
        Modal.confirm({
            title: '退出登陆',
            content: '是否退出登陆？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: '/user/logout',
                    params: {},
                }).then(() => {
                    message.success('已退出')
                    props.history.replace('/login')
                })
            }
        })
    }

    return (
        <ul className={styles.ulContainer}>
            <UploadAvatar />
            <li>我的收藏</li>
            <li>我的地址</li>
            <li>我的积分</li>
            <li onClick={logout}>退出登陆</li>
        </ul>
    )
}
export default withRouter(My)