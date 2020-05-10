import React, { useState, useEffect, useRef } from 'react'
import { useMappedState } from 'redux-react-hook'
import { Space, Button, Row, Col, message, Modal, Input } from 'antd'
import { axiosFetch } from '@utils'
import { Icon, BillDetail } from '@components'
import { serviceUrl } from '@constants'
import OrderTable from './Table-MyOrder'

const MyOrder = () => {
    const searchKey = useRef('')
    const [orderList, setOrderList] = useState([])
    const [current, setCurrent] = useState(1)
    const [size, setSize] = useState(20)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [currentBillDetail, setCurrentBillDetail] = useState([])

    const userID = useMappedState($$state => $$state.user.userID)

    const searchKeyChange = (v) => {
        searchKey.current = v
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

    const auditRecord = (record) => {
        Modal.confirm({
            title: '接收订单',
            content: '是否确定要接收订单？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: '/order/send',
                    params: { orderID: record.orderID },
                }).then(() => {
                    message.success('接单成功')
                    queryOrderList()
                })
            }
        })
    }

    const updatePage = (current, pageSize) => {
        setCurrent(current)
        setSize(pageSize)
        queryOrderList(current, pageSize)
    }

    const search = () => {
        queryOrderList(1)
        setCurrent(1)
    }

    const queryOrderList = ($current = current, $size = size) => {
        const orderNo = searchKey.current.trim() ? searchKey.current : undefined
        axiosFetch({
            api: serviceUrl.orderHistoryOrder,
            params: {
                merchantID: userID,
                foodName: orderNo,
                pageNo: $current,
                pageSize: $size,
            },
        }).then((res) => {
            setOrderList(res.records)
            setTotal(res.total)
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
                        <h1>订单管理</h1>
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
                <OrderTable
                    current={current}
                    size={size}
                    total={total}
                    updatePage={updatePage}
                    dataSource={orderList}
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

export default MyOrder