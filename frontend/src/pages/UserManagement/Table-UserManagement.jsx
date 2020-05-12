import React, { useState } from 'react'
import { Space } from 'antd'
import styles from './foodSet.module.css'
import { SCAntdTable } from '@components'

const UserManagementTable = ({
    size,
    total,
    current,
    dataSource,
    updatePage,
    // editRecord,
    auditRecord, 
    deleteRecord,
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
                    {
                        record.isActive === 2 && (
                            <button
                                className="link-button"
                                onClick={(e) => { auditRecord('启用', record) }}
                            >启用</button>
                        )
                    }
                    {
                        record.isActive === 1 && (
                            <button
                                className="link-button"
                                onClick={(e) => { auditRecord('禁用', record) }}
                            >禁用</button>
                        )
                    }
                    {/* <button
                        className="link-button"
                        onClick={(e) => { editRecord(record) }}
                    >编辑</button> */}
                    <button
                        className="link-button"
                        onClick={(e) => { deleteRecord(record) }}
                    >删除</button>
                </Space>
            ),
        }, {
            title: '用户ID',
            dataIndex: 'userID',
            width: 100,
            ellipsis: true,
        }, {
            title: '用户名',
            dataIndex: 'userName',
            width: 100,
        }, {
            title: '店铺名称',
            dataIndex: 'shopName',
            width: 180,
        }, {
            title: '用户类型',
            dataIndex: 'role',
            width: 90,
            render: (text) => {
                switch (text) {
                    case '1':
                        return '超级管理员'
                    case '2':
                        return '商家'
                    case '3':
                        return '个人'
                    default:
                        return ''
                }
            },
        }, {
            title: '店铺描述',
            dataIndex: 'shopDesc',
            width: 200,
            ellipsis: true,
        }, {
            title: '启用状态',
            dataIndex: 'isActive',
            render: (text) => (
                text === 1 ? '已启用' : <span style={{ color: '#f66' }}>已禁用</span>
            )
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
                    rowKey="userID"
                    scroll={{ y: 360 }}
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

export default UserManagementTable