import React from 'react'
import { Input, Checkbox } from 'antd'
import { SCAntdTable } from '@components'
import { VOUCHER_TYPE_MAP } from '@constants'

const SummarySetTable = (props) => {
    const { dataSource = [], onRecordChange } = props

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 50,
        }, {
            title: '单据类型',
            dataIndex: 'voucherType',
            width: 80,
            render: text => VOUCHER_TYPE_MAP[String(text)]
        }, {
            title: '摘要头',
            dataIndex: 'header',
            ellipsis: true,
            width: 220,
            render: (text, record, index) => (
                <Input
                    defaultValue={text}
                    onBlur={({ target }) => { updateRecord(index, 'header', target.value) }}
                />
            )
        }, {
            title: '仓位',
            dataIndex: 'house',
            ellipsis: true,
            align: 'center',
            width: 80,
            render: (text, record, index) => (
                <Checkbox
                    defaultChecked={text === '1'}
                    onChange={({ target }) => { updateRecord(index, 'house', target.checked ? '1' : '2') }}
                />
            )
        }, {
            title: '领用仓位',
            dataIndex: 'allot',
            ellipsis: true,
            align: 'center',
            width: 80,
            render: (text, record, index) => (
                <Checkbox
                    defaultChecked={text === '1'}
                    onChange={({ target }) => { updateRecord(index, 'allot', target.checked ? '1' : '2') }}
                />
            )
        }, {
            title: '供应商',
            dataIndex: 'supplier',
            ellipsis: true,
            align: 'center',
            width: 80,
            render: (text, record, index) => (
                <Checkbox
                    defaultChecked={text === '1'}
                    onChange={({ target }) => { updateRecord(index, 'supplier', target.checked ? '1' : '2') }}
                />
            )
        }, {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            align: 'center',
            width: 80,
            render: (text, record, index) => (
                <Checkbox
                    defaultChecked={text === '1'}
                    onChange={({ target }) => { updateRecord(index, 'remark', target.checked ? '1' : '2') }}
                />
            )
        }, {
            title: '摘要尾',
            dataIndex: 'tail',
            ellipsis: true,
            render: (text, record, index) => (
                <Input
                    defaultValue={text}
                    onBlur={({ target }) => { updateRecord(index, 'tail', target.value) }}
                />
            )
        }
    ]

    const updateRecord = (index, key, value) => {
        onRecordChange(index, key, value)
    }

    return (
        <div style={{ width: '906px' }}>
            <SCAntdTable
                rowKey="voucherType"
                scroll={{ y: 400 }}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </div>
    )
}

export default SummarySetTable