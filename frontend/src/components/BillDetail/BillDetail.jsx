import React, { useState } from "react"
import { getSrc } from '@utils'
import { Modal, Button, Avatar } from "antd"
import { SCAntdTable } from '@components'

const BillDetail = ({
    dataSource,
    onCancel,
}) => {
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
            title: '菜品数量',
            dataIndex: 'foodNum',
            width: 100,
            ellipsis: true,
        }, {
            title: '菜品图片',
            dataIndex: 'imagePath',
            render: (text) => (
                <Avatar
                    shape="square"
                    size="large"
                    src={getSrc(text)}
                />
            )
        }
    ]

    return (
        <Modal
            width="870px"
            visible={true}
            maskClosable={false}
            title="订单明细"
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>关闭</Button>,
            ]}
        >
            <SCAntdTable
                rowKey="foodID"
                scroll={{ x: 800, y: 260 }}
                columns={columns}
                dataSource={dataSource}
                isPagination={false}
            />
        </Modal>
    )
}

export default BillDetail