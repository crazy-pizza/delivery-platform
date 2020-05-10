import React, { useState, useEffect, useRef } from 'react'
import { useMappedState } from 'redux-react-hook'
import { Space, Button, Row, Col, message, Modal, Input } from 'antd'
import { axiosFetch } from '@utils'
import { Icon } from '@components'
import { serviceUrl } from '@constants'
import FoodTable from './Table-FoodSet'
import ModalAddEdit from './Modal-Edit'

const FoodSet = () => {
    const searchKey = useRef('')
    const userID = useMappedState($$state => $$state.user.userID)
    const [FoodList, setFoodList] = useState([])
    const [currentFood, setCurrentFood] = useState({}) // 当前选中的
    const [editModalVisiable, setEditModalVisiable] = useState(false)
    const [current, setCurrent] = useState(1)
    const [size, setSize] = useState(20)
    const [total, setTotal] = useState(0)


    const searchKeyChange = (v) => {
        searchKey.current = v
    }

    const saveFood = (values) => {
        let api = serviceUrl.foodAdd
        let params = values

        if (currentFood.foodID) {
            api = serviceUrl.foodUpdate
            params = { ...values, foodID: currentFood.foodID }
        }

        axiosFetch({
            api,
            params,
        }).then((res) => {
            message.success('菜品更新成功')
            setEditModalVisiable(false)
            setCurrentFood({})
            queryFoodList()
        })
    }

    const editRecord = (record) => {
        setCurrentFood(record)
        setEditModalVisiable(true)
    }

    const deleteRecord = (record) => {
        Modal.confirm({
            title: '删除',
            content: '是否确定要删除菜品？',
            icon: <Icon name="ExclamationCircleOutlined" />,
            onOk: () => {
                axiosFetch({
                    api: serviceUrl.foodDelete,
                    params: { foodID: record.foodID },
                }).then(() => {
                    queryFoodList()
                })
            }
        })
    }

    const updatePage = (current, pageSize) => {
        setCurrent(current)
        setSize(pageSize)
        queryFoodList(current, pageSize)
    }

    const search = () => {
        queryFoodList(1)
        setCurrent(1)
    }

    const queryFoodList = ($current = current, $size = size) => {
        const fname = searchKey.current.trim() ? searchKey.current : undefined
        axiosFetch({
            api: serviceUrl.foodSelect,
            params: {
                userID,
                foodName: fname,
                pageNo: $current,
                pageSize: $size,
            },
        }).then((res) => {
            setFoodList(res.records)
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
                        <h1>菜品管理</h1>
                    </div>
                    <div className="layoutsToolRight">
                        <Space>
                            <Button onClick={() => { setEditModalVisiable(true) }} type="primary">新增菜品</Button>
                        </Space>
                    </div>
                </div>
                <div className="layoutsLine"></div>
                <div className="layoutsSearch">
                    <Space>
                        <Input
                            placeholder="请输入菜品名称"
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
                <FoodTable
                    current={current}
                    size={size}
                    total={total}
                    dataSource={FoodList}
                    editRecord={editRecord}
                    deleteRecord={deleteRecord}
                    updatePage={updatePage}
                />
            </Col>
            {
                editModalVisiable && (
                    <ModalAddEdit
                        title={currentFood.foodID ? '编辑菜品' : '新增菜品'}
                        currentFood={currentFood}
                        saveFood={saveFood}
                        handleCancel={() => {
                            setCurrentFood({})
                            setEditModalVisiable(false)
                        }}
                    />
                )
            }
        </Row>
    )
}

export default FoodSet