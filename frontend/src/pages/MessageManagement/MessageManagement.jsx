import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Col, Card, List, Avatar, Row, Icon } from 'antd'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { axiosFetch, getSrc } from '@utils'
import Talk from './Talk'

const MessageManagement  = () => {
    const userInfo = useMappedState($$state => $$state.user)
    const [dataSource, setDataSource] = useState([])
    const [tableVisible, setTalkVisible] = useState(false)
    const [currentUserID, setCurrentUserID] = useState('')

    const getList = () => {
        axiosFetch({
            api: '/memcon/whoCallMe',
            params: { from: userInfo.userID }
        }).then(res => {
            setDataSource(res)
        })
    }

    useEffect(() => {
        getList()
    }, [])

    const callUser = (id) => {
        setTalkVisible(true)
        setCurrentUserID(id)
    }

    return (
        <Row>
            {
                dataSource.map((item, index) => (
                    <Col key={item.userID} style={{ margin: '20px 10px' }} flex={'350px'}>
                        <Card
                            actions={[
                                <Button
                                    onClick={() => { callUser(item.userID) }}
                                    icon={<Icon name="CommentOutlined" />}
                                >联系用户</Button>
                            ]}
                        >
                            <Row>
                                <Col>
                                    <Avatar
                                        shape="square"
                                        size={80}
                                        src={getSrc(item.headImage)}
                                    />
                                </Col>
                                <Col style={{ padding: '20px 0 0 10px' }}>
                                    <p>用户名：{item.userName}</p>
                                    <p>地址：{item.address}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))
            }
            {
                tableVisible && <Talk currentUserID={currentUserID} onCancel={() => { setTalkVisible(false) }}/>
            }
        </Row>
    )
}
export default MessageManagement
