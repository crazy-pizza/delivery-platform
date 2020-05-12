import React, { useState, useEffect, useRef } from 'react'
import { Space, Button, Row, Col, message, Modal, Input } from 'antd'
import { axiosFetch } from '@utils'
import { Icon } from '@components'
import UserManagementTable from './Table-UserManagement'
import ModalAddEdit from './Modal-Edit'

const UserManagement = () => {
    const searchKey = useRef('')
    const [UserList, setUserList] = useState([])
    const [editModalVisiable, setEditModalVisiable] = useState(false)
    const [current, setCurrent] = useState(1)
    const [size, setSize] = useState(20)
    const [total, setTotal] = useState(0)
    const [currentUser, setCurrentUser] = useState({})

    const searchKeyChange = (v) => {
        searchKey.current = v
    }

    const saveUser = (values) => {
        axiosFetch({
            api: '/user/update',
            params: { userID: currentUser, ...values },
        }).then(() => {
            message.success('用户更新成功')
            setCurrentUser({})
            queryUserList()
            setEditModalVisiable(false)

        }).catch(() => {
            setEditModalVisiable(false)
        })
    }

    const editRecord = (record) => {
        setCurrentUser(record)
        setEditModalVisiable(true)
    }

    const auditRecord = (text, record) => {
        Modal.confirm({
            title: text,
            content: `是否确定要${text}？`,
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                console.log(record)
                axiosFetch({
                    api: '/user/update',
                    params: { userID: record.userID ,isActive: text === '启用' ? 1 : 2 },
                }).then(() => {
                    queryUserList()
                })
            }
        })
    }

    const deleteRecord = (record) => {
        Modal.confirm({
            title: '删除',
            content: '是否确定要删除用户？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: '/user/delete',
                    params: { userID: record.userID },
                }).then(() => {
                    queryUserList()
                })
            }
        })
    }

    const updatePage = (current, pageSize) => {
        setCurrent(current)
        setSize(pageSize)
        queryUserList(current, pageSize)
    }

    const search = () => {
        queryUserList(1)
        setCurrent(1)
    }

    const queryUserList = ($current = current, $size = size) => {
        const uname = searchKey.current.trim() ? searchKey.current : undefined
        axiosFetch({
            api: 'user/select',
            params: {
                userName: uname,
                pageNo: $current,
                pageSize: $size,
            },
        }).then((res) => {
            setUserList(res.records)
            setTotal(res.total)
        })
    }

    useEffect(() => {
        search()
    }, [])

    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>用户管理</h1>
                    </div>
                </div>
                <div className="layoutsLine"></div>
                <div className="layoutsSearch">
                    <Space>
                        <Input
                            placeholder="请输入用户名称"
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
                <UserManagementTable
                    current={current}
                    size={size}
                    total={total}
                    dataSource={UserList}
                    editRecord={editRecord}
                    auditRecord={auditRecord}
                    deleteRecord={deleteRecord}
                    updatePage={updatePage}
                />
            </Col>
            {
                editModalVisiable && (
                    <ModalAddEdit
                        currentUser={currentUser}
                        saveUser={saveUser}
                        handleCancel={() => {
                            setCurrentUser({})
                            setEditModalVisiable(false)
                        }}
                    />
                )
            }
        </Row>
    )
}

export default UserManagement