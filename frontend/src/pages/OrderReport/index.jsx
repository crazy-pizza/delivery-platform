import React, { useState, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import { Space, Button, Row, Col, Select, DatePicker, message } from 'antd'
import { axiosFetch } from '@utils'
import moment from 'moment'
import OrderReportTable from './OrderReportTable'

const { RangePicker } = DatePicker;
const OrderReport = () => {
    const [orderList, setOrderList] = useState([])

    const [beginTime, setBeginTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [timeDigit, setTimeDigit] = useState(8)

    const merchantID = useMappedState($$state => $$state.user.userID)

    const search = () => {
        queryOrderList(1)
    }

    const queryOrderList = () => {
        if (!beginTime || !endTime) {
            message.warning('请选择日期')
            return
        }

        const f = timeDigit === 6 ? 'YYYYMMDD' : 'YYYYMM'
        let bt = beginTime.format(f)
        let et = endTime.format(f)

        bt = bt.length === 8 ? bt + '000000' : bt + '00000000'
        et = et.length === 8 ? et + '999999' : et + '99999999'

        axiosFetch({
            api: '/order/report',
            params: {
                merchantID,
                beginTime: bt,
                endTime: et,
                timeDigit,
            },
        }).then((res) => {
            setOrderList(res)
        })
    }

    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>订单报表</h1>
                    </div>
                </div>
                <div className="layoutsLine"></div>
                <div className="layoutsSearch">
                        <Row>
                            <Space>
                                <Col>
                                    <Select
                                        onChange={(v) => {
                                            setTimeDigit(v)
                                        }}
                                        defaultValue={8}
                                    >
                                        <Select.Option value={8}>天</Select.Option>
                                        <Select.Option value={6}>月</Select.Option>
                                    </Select>
                                </Col>
                                <Col>
                                    {
                                        <Space>
                                            <DatePicker
                                                value={beginTime}
                                                onChange={(v) => { setBeginTime(v) }}
                                            />
                                            <span>—</span>
                                            <DatePicker
                                                value={endTime}
                                                onChange={(v) => { setEndTime(v) }}
                                            />
                                        </Space>
                                    }
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={search}>查询</Button>
                                </Col>
                            </Space>
                        </Row>
             
                </div>
            </Col>
            <Col span={24} className="layoutsLineBlock"></Col>
            <Col span={24}></Col>
            <Col span={24} className="layoutsContent">
                <OrderReportTable
                    dataSource={orderList}
                />
            </Col>
        </Row>
    )
}

export default OrderReport