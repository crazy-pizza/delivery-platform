import React, { useState } from 'react'
import { Space } from 'antd'
import styles from './myOrder.module.css'
import { SCAntdTable } from '@components'

const statusList = {
    '1': '商家未接单',
    '2': '商家已发货',
    '3': '已收货',
}

const OrderTable = ({
    size,
    total,
    current,
    dataSource,
    updatePage,
    auditRecord,
    lookDetail,
}) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 60,
        }, {
            title: '操作',
            dataIndex: 'action',
            width: 120,
            align: 'center',
            render: (text, record) => (
                <Space>
                    <button
                        className="link-button"
                        onClick={(e) => { lookDetail(record) }}
                    >查看详情</button>
                    {
                        record.orderStatus === 1 && (
                            <button
                                className="link-button"
                                onClick={(e) => { auditRecord(record) }}
                            >接单</button>
                        )
                    }
                </Space>
            ),
        }, {
            title: '订单号',
            dataIndex: 'orderNo',
            width: 160,
            ellipsis: true,
        }, {
            title: '订单状态',
            dataIndex: 'orderStatus',
            width: 160,
            render: (text) => statusList[text],
        }, {
            title: '订单备注',
            dataIndex: 'remark',
            width: 180,
            ellipsis: true,
        }, {
            title: '订单地址',
            dataIndex: 'userAddress',
        }
    ]

    const pageSizeChange = (current, size) => {
        updatePage(current, size)
    }

    const currentChange = (current, size) => {
        updatePage(current, size)
    }

    return (
        <div>
            <div style={{ width: '1000px' }}>
                <SCAntdTable
                    rowKey="orderID"
                    scroll={{ x: 870, y: 260 }}
                    columns={columns}
                    dataSource={dataSource}
                    pageSize={size}
                    total={total}
                    current={current}
                    pageSizeChange={pageSizeChange}
                    currentChange={currentChange}
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
            </div>
        </div>
    )
}

export default OrderTable