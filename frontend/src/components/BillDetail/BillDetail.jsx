import React, { useState } from "react"
import { Modal, Button } from "antd"
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
            title: '菜品图片',
            dataIndex: 'imagePath',
            render: (text) => (
                <img style={{ height: '100px', maxWidth: '180px' }} src={getSrc(text)} alt={text} />
            )
        }
    ]

    const getSrc = (filename) => {
        return filename ? `http://wcpay.ictry.com:5050/file/download?fileName=${filename}` : ''
    }

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