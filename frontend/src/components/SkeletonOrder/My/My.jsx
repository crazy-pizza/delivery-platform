import React, { useState, useRef } from 'react'
import { message, Modal, Input, Button } from 'antd'
import styles from './my.module.css'
import { Icon, UploadAvatar } from '@components'
import { axiosFetch } from '@utils'
import { withRouter } from 'react-router-dom'
import { useMappedState, useDispatch } from 'redux-react-hook'

export const My = (props) => {
    const [addressVis, setAddressVis] = useState()
    const userInfo = useMappedState($$state => $$state.user)
    const dispatch = useDispatch()
    const addressVal = useRef('')

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

    const onSave = () => {
        debugger
        axiosFetch({
            api: '/user/update',
            params: { userID: userInfo.userID, address: addressVal.current },
        }).then(() => {
            message.success('保存地址成功')
            dispatch({
                type: 'setUserInfo',
                payload: { address: addressVal.current },
            })
            setAddressVis(false)
        }).catch(() => {
            setAddressVis(false)
        })
    }

    return (
        <ul className={styles.ulContainer}>
            <UploadAvatar />
            {/* <li>我的收藏</li> */}
            <li onClick={() => { setAddressVis(true) }}>我的地址</li>
            {/* <li>我的积分</li> */}
            <li onClick={logout}>退出登陆</li>
            {
                addressVis && (
                    <Modal
                        width="400px"
                        visible={true}
                        maskClosable={false}
                        title="我的地址"
                        onCancel={() => { setAddressVis(false) }}
                        footer={[
                            <Button key="back" onClick={() => { setAddressVis(false) }}>关闭</Button>,
                            <Button key="save" onClick={onSave}>保存</Button>,
                        ]}
                    >
                        <Input onChange={(e) => { addressVal.current = e.target.value }} defaultValue={userInfo.address} />
                    </Modal>
                )
            }
        </ul>
    )
}
export default withRouter(My)