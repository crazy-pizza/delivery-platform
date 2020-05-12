import React, { useState } from 'react'
import { Space } from 'antd'
import styles from './bill.module.css'
import { SCAntdTable } from '@components'
import AddComment from './AddComment'

const statusList = {
    '1': '商家未接单',
    '2': '商家已发货',
    '3': '已收货',
}

const BillTable = ({
    dataSource,
    auditRecord,
    lookDetail,
}) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const [currentRecord, setCurrentRecord] = useState({})
    const [vis, setVis] = useState(false)
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
                    >查看</button>
                    {
                        record.orderStatus === 2 && (
                            <button
                                className="link-button"
                                onClick={(e) => { auditRecord(record) }}
                            >确认收货</button>
                        )
                    }
                    {
                        // record.orderStatus === 3 && (
                            <button
                                className="link-button"
                                onClick={(e) => { toComment(record) }}
                            >评价</button>
                        // )
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
        },
    ]

    const toComment = (data) => {
        setCurrentRecord(data)
        setVis(true)
    }

    return (
        <div>
            <div style={{ width: '940px' }}>
                <SCAntdTable
                    rowKey="orderID"
                    scroll={{ x: 870, y: 260 }}
                    columns={columns}
                    dataSource={dataSource}
                    isPagination={false}
                    onRow={(record, index) => {
                        return {
                            onClick: (e) => {
                                setSelectedRowIndex(index)
                            },
                        }
                    }}
                    rowClassName={(record, index) => {
                        return index === selectedRowIndex ? styles.rowSelectedBg : ''
                    }}
                />
                {
                    vis && ( <AddComment record={currentRecord} onCancel={() => { setVis(false) }} />)
                }
            </div>
        </div>
    )
}

export default BillTable