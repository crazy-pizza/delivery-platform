import React from 'react'
import { Modal, Button, Form, Input } from 'antd'

const ACCOUNT_PRICE = '菜品价格'
const ACCOUNT_NAME = '菜品名称'
const ACCOUNT_DESC = '菜品描述'

const AddEditModal  = (props) => {
    const [thisFrom] = Form.useForm();
    const { saveFood, currentFood = {}, handleCancel, title } = props
    const onCancel = () => {
        handleCancel()
    }

    const onSubmit = (e) => {
        e.preventDefault() // 阻止默认提交
        thisFrom.validateFields().then(res => {
            saveFood(res)
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
            title={title}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>取消</Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>保存</Button>,
            ]}
        >
            <Form
                {...layout}
                form={thisFrom}
                initialValues={currentFood}
            >
                <Form.Item
                    label={ACCOUNT_NAME}
                    name='foodName'
                    rules={[{ required: true, message: `请输入${ACCOUNT_NAME}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_NAME}`} />
                </Form.Item>
                <Form.Item
                    label={ACCOUNT_PRICE}
                    name='foodPrice'
                    rules={[{ required: true, message: `请输入${ACCOUNT_PRICE}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_PRICE}`} />
                </Form.Item>
                <Form.Item
                    label={ACCOUNT_DESC}
                    name='foodDesc'
                    rules={[{ message: `请输入${ACCOUNT_DESC}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_DESC}`} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddEditModal
