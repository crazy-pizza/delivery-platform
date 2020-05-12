import React, { useEffect, useState } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from "react-router-dom"
import moment from 'moment'
import { List, Avatar, Button, Card, Row, Col, Modal, Comment, Tooltip, Rate } from 'antd'
import { throttle } from 'lodash'
import { axiosFetch, getSrc } from '@utils'
import { serviceUrl } from '@constants'

export const Order = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [commentData, setCommentData] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        axiosFetch({
            api: serviceUrl.userSelect,
            params: { role: '2', pageSize: '500', pageNo: '1' },
        }).then((res) => {
            setDataSource(res.records)
        })
    }, [])

    const jumpShop = (id) => {
        dispatch({
            type: 'setUserInfo',
            payload: {
                currentShopUserID: id
            },
        })
        props.history.replace(`/order/detail`)
    }

    const lookCommit = throttle((id, index) => {
        axiosFetch({
            api: '/comment/list',
            params: { merchantID: id, pageSize: '500', pageNo: '1' },
        }).then((res) => {
            setModalVisible(true)
            setCommentData(res.records)
        })
    }, 1000, { trailing: false })

    return (
        <Row>
            {
                dataSource.map((item, index) => (
                    <Col key={item.userID} style={{ margin: '20px 10px' }} flex={'400px'}>
                        <Card
                            onClick={() => { jumpShop(item.userID) }}
                            title={item.shopName || '未命名'}
                            actions={[
                                item.commit ?
                                    <div>

                                    </div>
                                    :
                                    <Button onClick={(e) => { e.stopPropagation(); lookCommit(item.userID, index) }} type="link" block>
                                        查看评价
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        shape="square"
                                        size={80}
                                        src={getSrc(item.headImage)}
                                    />
                                }
                                description={
                                    <div>
                                        <p style={{ fontSize: '17px' }}>{item.shopDesc || '该商家暂无描述'}</p>
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))
            }
            {
                modalVisible && (
                    <Modal
                        visible={true}
                        maskClosable={false}
                        title="查看评价"
                        onOk={() => { setModalVisible(false) }}
                        onCancel={() => { setModalVisible(false) }}
                        footer={[
                            <Button key="back" onClick={() => { setModalVisible(false) }}>
                                知道了
                            </Button>,
                        ]}
                    >
                        {
                            commentData.map((item) => (
                                <Comment
                                    key={item.commentID}
                                    author={`${item.user.userName}`}
                                    avatar={
                                        <Avatar
                                            src={getSrc(item.user.headImage)}
                                        />
                                    }
                                    content={
                                        <div>
                                            <p><Rate style={{ paddingBottom: '10px', fontSize: '14px' }} disabled defaultValue={item.star} /></p>
                                            <p style={{ paddingBottom: '10px' }}>{item.content}</p>
                                            <Avatar shape="square" src={getSrc(item.imagePath)} />
                                        </div>
                                    }
                                    datetime={
                                        <Tooltip title={moment(item.createTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.createTime, 'YYYYMMDDHHmmss').fromNow()}</span>
                                        </Tooltip>
                                    }
                                />
                            ))
                        }
                    </Modal>
                )
            }
        </Row>
    )
}

export default withRouter(Order)
