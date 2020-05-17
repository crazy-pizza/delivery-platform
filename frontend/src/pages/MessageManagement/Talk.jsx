import React, { useEffect, useState } from 'react'
import { useMappedState } from 'redux-react-hook'
import moment from 'moment'
import { Button, Modal, Comment, Input, Form } from 'antd'
import { axiosFetch } from '@utils'
import styles from './talk.module.css'
import classnames from 'classnames'

const { TextArea } = Input

const Talk = ({ onCancel, currentUserID }) => {
    const [text, setText] = useState('')
    const [dataSource, setDataSource] = useState([])
    const userInfo = useMappedState($$state => $$state.user)

    const handleChangeText = (e) => {
        setText(e.target.value)
    }

    useEffect(() => {
        getMessage()      
    }, [])

    const getMessage = () => {
        axiosFetch({
            api: '/memcon/list',
            params: { to: currentUserID, pageSize: 500, pageNo: 1 },
        }).then(res => {
            setDataSource(res.records)
        })
    }

    const send = () => {
        if (!text) return
        axiosFetch({
            api: '/memcon/talk',
            params: { to: currentUserID, content: text },
        }).then(() => {
            setText('')
            getMessage()
        })
    }

    return (
        <Modal
            visible={true}
            maskClosable={false}
            title="联系用户"
            onOk={onCancel}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    关闭
                </Button>,
            ]}
        >

            <div className={styles.talkcontainer}>
                {
                    dataSource.map(record => {
                        const u = record.from === userInfo.userID
                        const submitClass = classnames({
                            [`${styles.metalk}`]: u,
                            [`${styles.shoptalk}`]: !u,
                        })

                        return (
                            <p style={{ textAlign: u ? 'right' : 'left' }} className={submitClass}>
                                <span className={styles.momentText}>{moment(record.createTime, 'YYYYMMDDHHmmss').fromNow()}</span>
                                <div className={styles.contentContainer}>
                                    <span>{record.content}</span>
                                </div>
                            </p>
                        )
                    })
                }
            </div>
            <Comment
                content={
                    <div>
                        <Form.Item>
                            <TextArea rows={4} value={text} onChange={handleChangeText} />
                            <div style={{ height: '10px' }}></div>
                            <Button onClick={send} type="primary">发送</Button>
                        </Form.Item>
                    </div>
                }
            />
        </Modal>
    )
}

export default Talk
