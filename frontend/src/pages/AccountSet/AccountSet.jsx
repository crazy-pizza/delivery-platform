import React, { useState, useEffect } from 'react'
import { Space, Button, Row, Col, message, Modal } from 'antd'
import { axiosFetch } from '@utils'
import { Icon } from '@components'
import { serviceUrl } from '@constants'
import AccountSetTable from './Table-AccountSet'
import RelatedOrg from './Table-RelatedOrg'
import ModalAddEdit from './Modal-Edit'
import ConnectOrgsModal from './Modal-RelatedOrg'
const AccountSet = () => {
    const [orgs, setOrgs] = useState([]) // 下方关联组织数据源
    const [accountList, setAccountList] = useState([]) // 上方帐套数据源
    const [currentSelectAccount, setCurrentSelectAcount] = useState({}) // 当前选中的
    const [editModalVisiable, setEditModalVisiable] = useState(false)
    const [orgModalVisiable, setOrgConnectVisiable] = useState(false)

    useEffect(() => {
        queryAccounts()
    }, [])

    const saveAccount = (values) => {
        let api = serviceUrl.insertFinanceAccount
        let params = values

        if (currentSelectAccount.id) {
            api = serviceUrl.updateFinanceAccount
            params = { ...values, id: currentSelectAccount.id }
        }

        axiosFetch({
            api,
            params,
        }).then((res) => {
            setEditModalVisiable(false)
            setCurrentSelectAcount({})
            queryAccounts()
        })
    }

    const saveAccountOrg = (orgData) => {
        axiosFetch({
            api: serviceUrl.addFinanceAccountOrg,
            params: { accountID: currentSelectAccount.id, data: orgData }
        }).then(res => {
            message.success('已添加关联组织')
            setOrgConnectVisiable(false)
            setCurrentSelectAcount({})
            queryAccounts()
        })
    }

    const editRecord = (record) => {
        setCurrentSelectAcount(record)
        setEditModalVisiable(true)
    }

    const deleteRecord = (record) => {
        Modal.confirm({
            title: '删除',
            content: '是否确定要删除帐套？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: serviceUrl.deleteFinanceAccount,
                    params: { ids: record.id },
                }).then(() => {
                    queryAccounts()
                })
            }
        })
    }

    const editRecordOrg = (record) => {
        queryOrgs(record.id, () => {
            setCurrentSelectAcount(record)
            setOrgConnectVisiable(true)
        })
    }    

    const queryAccounts = () => {
        axiosFetch({
            api: serviceUrl.queryFinanceAccountGroupID,
            params: {},
        }).then((res) => {
            setAccountList(res)
        })
    }

    const queryOrgs = (accountID, callback) => {
        axiosFetch({
            api: serviceUrl.queryFinanceAccountOrgByAccountID,
            params: {
                accountID,
            },
        }).then((res) => {
            setOrgs(res || [])
            callback && callback()
        })
    }

    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>帐套管理</h1>
                    </div>
                    <div className="layoutsToolRight">
                        <Space>
                            <Button onClick={() => { setEditModalVisiable(true) }} type="primary">新增帐套</Button>
                        </Space>
                    </div>
                </div>
            </Col>
            <Col span={24} className="layoutsLineBlock"></Col>
            <Col span={24}></Col>
            <Col span={24} className="layoutsContent">
                <AccountSetTable
                    dataSource={accountList}
                    editRecord={editRecord}
                    editRecordOrg={editRecordOrg}
                    deleteRecord={deleteRecord}
                    onClickRow={(record) => { queryOrgs(record.id) }}
                />
                <RelatedOrg dataSource={orgs} />
            </Col>
            {
                editModalVisiable && (
                    <ModalAddEdit
                        title={currentSelectAccount.id ? '编辑帐套' : '新增帐套'}
                        currentAccount={currentSelectAccount}
                        saveAccount={saveAccount}
                        handleCancel={() => {
                            setCurrentSelectAcount({})
                            setEditModalVisiable(false)
                        }}
                    />
                )
            }
            {
                orgModalVisiable && (
                    <ConnectOrgsModal
                        dataSource={orgs}
                        saveAccountOrg={saveAccountOrg}
                        onCancel={() => {
                            setCurrentSelectAcount({})
                            setOrgConnectVisiable(false)
                        }}
                    />
                )
            }
        </Row>
    )
}

export default AccountSet