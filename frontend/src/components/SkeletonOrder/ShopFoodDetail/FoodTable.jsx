import React, { useState, useRef } from 'react'
import { Space, Button, Row, Col, message, Modal, Input, Avatar } from 'antd'
import { SCAntdTable, Icon } from '@components'
import { withRouter } from "react-router-dom"
import Decimal from 'decimal.js'
import { axiosFetch, getSrc } from '@utils'
import styles from './foodDetail.module.css'

const FoodTable = ({
    dataSource,
    updateNum,
    history,
}) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const [remark, setRemark] = useState('')
    const validData = dataSource.filter(i => i.foodNum)

    const total = validData.reduce((sum, food) => {
        const amount = new Decimal(food.foodPrice).mul(food.foodNum)
        sum = sum.add(amount)
        return sum
    }, new Decimal(0))

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 60,
        }, {
            title: '菜品名称',
            dataIndex: 'foodName',
            width: 160,
            ellipsis: true,
        }, {
            title: '菜品描述',
            dataIndex: 'foodDesc',
            width: 160,
        }, {
            title: '菜品价格',
            dataIndex: 'foodPrice',
            width: 100,
            ellipsis: true,
        }, {
            title: '菜品图片',
            width: 160,
            dataIndex: 'imagePath',
            render: (text) => (
                <Avatar
                    shape="square"
                    size="large"
                    src={getSrc(text)}
                />
            )
        }, {
            title: '购买数量',
            dataIndex: 'foodNum',
            align: 'center',
            render: (text, record, index) => (
                <Space>
                    <Button
                        onClick={() => { updateNum('add', index) }}
                        shape="circle"
                        icon={<Icon name="PlusOutlined" />}
                    />
                    <span>{text}</span>
                    <Button
                        onClick={() => { updateNum('min', index) }}
                        shape="circle"
                        icon={<Icon name="MinusOutlined" />}
                    />
                </Space>
            )
        }
    ]
    const addOrder = () => {
        if (validData.length === 0) {
            message.warning('请选择菜品')
            return
        }

        const txt = (
            <div>
                是否下单以下菜品？
                {
                    validData.map(i => (
                        <li>
                            <Space>
                                <span>{i.foodName}</span>
                                <span>x</span>
                                <span>{i.foodNum}</span>
                            </Space>
                        </li>
                    ))
                }
            </div>
        )

        Modal.confirm({
            title: '下单',
            content: txt,
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: '/order/add',
                    params: {
                        detailList: validData.map(i => ({
                            foodID: i.foodID,
                            foodNum: i.foodNum,
                        })),
                        remark,
                    },
                }).then(() => {
                    message.success('下单成功，正在前往查看订单...')
                    setTimeout(() => {
                        history.replace(`/order/bill`)
                    }, 3000)
                })
            }
        })
    }
    return (
        <div style={{ width: '900px', margin: '0 auto' }}>
            <Row>
                <SCAntdTable
                    rowKey="foodID"
                    scroll={{ x: 870, y: 260 }}
                    columns={columns}
                    dataSource={dataSource}
                    isPagination={false}
                    onRow={(record, index) => {
                        return {
                            onClick: (e) => {
                                setSelectedRowIndex(index)
                                // onClickRow(record, index)
                            },
                        }
                    }}
                    rowClassName={(record, index) => {
                        return index === selectedRowIndex ? styles.rowSelectedBg : ''
                    }}
                />
            </Row>
            <Row style={{ paddingTop: '20px' }}>
                <Col className={styles.colLineHeight} flex="70px">订单备注：</Col>
                <Col flex="350px">
                    <Input
                        placeholder="请填写订单备注"
                        onChange={(e) => { setRemark(e.target.value) }}
                        type="text"
                    />
                </Col>
                <Col flex="auto" className={styles.totalContaner}>
                    总金额：<span className={styles.priceSpan}>{total.toFixed(2)}</span> 元
                </Col>
            </Row>
            <Row style={{ paddingTop: '20px' }}>
                <Button
                    onClick={addOrder}
                    size="large" style={{ margin: '0 auto' }} type="primary">
                    下单
                </Button>
            </Row>
        </div>
    )
}

export default withRouter(FoodTable)