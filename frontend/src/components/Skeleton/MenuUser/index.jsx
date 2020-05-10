import React from 'react'
import { useMappedState } from 'redux-react-hook'
import { Dropdown, Menu, message } from 'antd'
import { Icon } from '@components'
import { withRouter } from "react-router-dom"
import { axiosFetch } from '@utils'
import classnames from 'classnames'
import styles from './menuUser.module.css'

const { Item } = Menu

const User = (props) => {
    const userName = useMappedState($$state => $$state.user.userName)
    const handleMenuClick = (type) => {
        axiosFetch({
            api: '/user/logout',
            params: {},
        }).then((res) => {
            message.success('已退出')
            props.history.replace('/login')
        })
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">退出</Menu.Item>
        </Menu>
    )

    const userContainer = classnames({
        [`${styles.userContainer}`]: true,
        userContainer: true
    })

    return (
        <div className={userContainer}>
            <Menu
                theme="dark"
                mode="inline"
                inlineCollapsed={true}
            >
                <Item key={'user'}>
                    <Dropdown overlay={menu}>
                        <span>
                            <Icon name='UserOutlined' />
                            <span>{userName}</span>
                        </span>
                    </Dropdown>
                </Item>
            </Menu>
        </div>
    )
}

export default withRouter(User)