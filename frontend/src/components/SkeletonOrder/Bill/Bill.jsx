import React, { useState, useEffect, useRef } from 'react'
import { Space, Button, Row, Col, message, Modal, Input } from 'antd'
import { useMappedState } from 'redux-react-hook'
import { axiosFetch } from '@utils'
import { Icon, BillDetail } from '@components'
import { serviceUrl } from '@constants'
import BillTable from './Table-Bill'

const Bill = () => {
    const searchKey = useRef('')
    const [billList, setBillList] = useState([])
    const [visible, setVisible] = useState(false)
    const [currentBillDetail, setCurrentBillDetail] = useState({})
    const userID = useMappedState($$state => $$state.user.userID)


    const searchKeyChange = (v) => {
        searchKey.current = v
    }

    const auditRecord = (record) => {
        Modal.confirm({
            title: '收货',
            content: '订单是否已送达？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: '/order/affirm',
                    params: { orderID: record.orderID },
                }).then(() => {
                    message.success('收货成功')
                    queryBillList()
                })
            }
        })
    }

    const lookDetail = (record) => {
        axiosFetch({
            api: '/order/showDetail',
            params: { orderID: record.orderID },
        }).then((res) => {
            setCurrentBillDetail(res)
            setVisible(true)
        })
    }

    const search = () => {
        queryBillList()
    }

    const queryBillList = () => {
        const orderNo = searchKey.current.trim() ? searchKey.current : undefined
        axiosFetch({
            api: serviceUrl.orderHistoryOrder,
            params: {
                orderNo,
                userID,
                pageNo: 1,
                pageSize: 500,
            },
        }).then((res) => {
            setBillList(res.records)
        })
    }

    useEffect(() => {
        setTimeout(() => { search() }, 1000)
    }, [])

    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>我的订单</h1>
                    </div>
                </div>
                <div className="layoutsLine"></div>
                <div className="layoutsSearch">
                    <Space>
                        <Input
                            placeholder="请输入订单编号"
                            style={{ width: '160px' }}
                            type="text"
                            onChange={(e) => { searchKeyChange(e.target.value) }}
                        />
                        <Button type="primary" onClick={search}>查询</Button>
                    </Space>
                </div>
            </Col>
            <Col span={24} className="layoutsLineBlock"></Col>
            <Col span={24}></Col>
            <Col span={24} className="layoutsContent">
                <BillTable
                    dataSource={billList}
                    lookDetail={lookDetail}
                    auditRecord={auditRecord}
                />
            </Col>
            {
                visible && (
                    <BillDetail onCancel={() => { setVisible(false) }} dataSource={currentBillDetail} />
                )
            }
        </Row>
    )
}

export default Bill