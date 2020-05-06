import React, { useState } from 'react'
import { Space } from 'antd'
import styles from './accountSet.module.css'
import { SCAntdTable } from '@components'

const AccountSetTable = (props) => {
    const [current, setCurrent] = useState(1)
    const [size, setSize] = useState(20)
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
            width: 160,
            align: 'center',
            render: (text, record) => (
                <Space>
                    <button
                        className="link-button"
                        onClick={(e) => { e.stopPropagation(); props.editRecordOrg(record) }}
                    >关联组织</button>
                    <button
                        className="link-button"
                        onClick={(e) => { props.editRecord(record) }}
                    >编辑</button>
                    <button
                        className="link-button"
                        onClick={(e) => { props.deleteRecord(record) }}
                    >删除</button>
                </Space>
            ),
        }, {
            title: '帐套编码',
            dataIndex: 'accountCode',
            width: 160,
        }, {
            title: '帐套名称',
            dataIndex: 'accountName',
            width: 160,
            ellipsis: true,
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 120,
        }, {
            title: '创建人',
            dataIndex: 'createBy',
            width: 120,
            ellipsis: true,
        }, {
            title: '对应组织架构',
            dataIndex: 'orgNum',
            render: text => Number(text) ? `${text}个` : ''
        }
    ]

    const pageSizeChange = (current, size) => {
        setCurrent(current)
        setSize(size)
    }

    const currentChange = (current, size) => {
        setCurrent(current)
        setSize(size)
    }

    const { dataSource, onClickRow } = props

    return (
        <div>
            <div className={styles['list-prefix']}>帐套信息</div>
            <div style={{ width: '940px' }}>
                <SCAntdTable
                    rowKey="id"
                    scroll={{ x: 870, y: 260 }}
                    columns={columns}
                    dataSource={dataSource}
                    pageSize={size}
                    total={dataSource.length}
                    current={current}
                    pageSizeChange={pageSizeChange}
                    currentChange={currentChange}
                    onRow={(record, index) => {
                        return {
                            onClick: (e) => {
                                setSelectedRowIndex(index)
                                onClickRow(record, index)
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

export default AccountSetTable