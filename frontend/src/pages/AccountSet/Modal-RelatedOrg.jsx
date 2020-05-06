import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { throttle } from 'lodash'
import { SelectOrg, SCAntdTable } from '@components'
import { useEffect } from 'react'
// import { OmitProps } from 'antd/lib/transfer/renderListBody'

const ConnectOrgsModal = ({ dataSource, onCancel, saveAccountOrg}) => {
    const [orgData, setOrgData] = useState(dataSource)

    const createRow = () => ({
        orgID: '',
        orgName: '',
        orgCode: '',
    })

    useEffect(() => {
        if (orgData.length === 0) {
            setOrgData([ ...orgData, createRow()])
        }
    }, [orgData])

    const handleCancel = () => {
        onCancel()
    }

    const addRecord = () => {
        setOrgData([ ...orgData, createRow()])
    }

    const removeRecord = (index) => {
        orgData.splice(index, 1)
        setOrgData([ ...orgData ])
    }

    const updateRecord = ({ orgID, orgName, orgCode }, index) => {
        orgData[index] = { orgID, orgName, orgCode }
        setOrgData([ ...orgData ])
    }

    const onSubmit = throttle(() => {
        const vaildOrgData = orgData.filter(o => o.orgID) // filter out empty data
        saveAccountOrg(vaildOrgData)
        return
    }, 600, { trailing: false })

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
            width: 80,
            align: 'center',
            render: (text, record, index) => <>
                <button className="link-button" onClick={(e) => { addRecord() }}>添加</button>&nbsp;&nbsp;
                <button className="link-button" onClick={(e) => { removeRecord(index) }}>删除</button>
            </>,
        }, {
            title: '组织编码',
            dataIndex: 'orgCode',
            width: 120,
        }, {
            title: '组织名称',
            dataIndex: 'orgName',
            render: (text, record, index) => {
                return (
                    <SelectOrg
                        defaultValue={record.orgID}
                        onChange={(res) => { updateRecord(res, index) }}
                    />
                )
            }
        }
    ]
    return (
        <div>
            <Modal
                width='640px'
                visible={true}
                title={'关联组织'}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        保存
                    </Button>,
                ]}
            >
                <SCAntdTable
                    rowKey="orgID"
                    scroll={{ y: 400 }}
                    columns={columns}
                    dataSource={orgData}
                    pagination={false}
                />
            </Modal>
        </div>
    )
}
export default ConnectOrgsModal
