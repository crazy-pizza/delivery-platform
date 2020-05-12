import React from 'react'
import { Modal, Button, Form, Input, InputNumber } from 'antd'

const AddEditModal  = (props) => {
    const [thisFrom] = Form.useForm();
    const { saveUser, currentUser = {}, handleCancel } = props
    const onCancel = () => {
        handleCancel()
    }

    const onSubmit = (e) => {
        e.preventDefault() // 阻止默认提交
        thisFrom.validateFields().then(res => {
            saveUser(res)
        }).catch(err => {})
    }

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 17,
        }
    }

    return (
        <Modal
            visible={true}
            maskClosable={false}
            title="编辑用户"
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>保存</Button>,
            ]}
        >
            <Form
                {...layout}
                form={thisFrom}
                initialValues={currentUser}
            >
                <Form.Item
                    label="用户ID"
                    name='userID'
                    rules={[{ required: true, message: "请输入用户ID" }]}
                >
                    <Input
                        min={1}
                        max={3}
                        style={{ width: '100%' }}
                        defaultValue={0}
                        placeholder="请输入用户ID"
                    />
                </Form.Item>

                <Form.Item
                    label="用户名"
                    name='userName'
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    label="用户类型"
                    name='role'
                    rules={[{ required: true, message: "请输入用户类型" }]}
                >
                    <InputNumber
                        min={1}
                        max={3}
                        style={{ width: '100%' }}
                        defaultValue={0}
                        placeholder="请输入用户类型"
                    />
                </Form.Item>

                <Form.Item
                    label="店铺名称"
                    name='shopName'
                    rules={[{ message: "请输入店铺名称" }]}
                >
                    <Input placeholder="请输入店铺名称" />
                </Form.Item>

                <Form.Item
                    label="店铺描述"
                    name='shopDesc'
                    rules={[{ message: '请输入店铺描述' }]}
                >
                    <Input placeholder="请输入店铺描述" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddEditModal
