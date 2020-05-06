import React from 'react'
import { Modal, Button, Form, Input } from 'antd'

const ACCOUNT_CODE = '账套编码'
const ACCOUNT_NAME = '账套名称'
const ACCOUNT_ID = '账务系统账套ID'

const AddEditModal  = (props) => {
    const [thisFrom] = Form.useForm();
    const { saveAccount, currentAccount = {}, handleCancel, title } = props
    const onCancel = () => {
        handleCancel()
    }

    const onSubmit = (e) => {
        e.preventDefault() // 阻止默认提交
        thisFrom.validateFields().then(res => {
            saveAccount(res)
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
                <Button key="back" onClick={onCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>
                    保存
                </Button>,
            ]}
        >
            <Form
                {...layout}
                form={thisFrom}
                initialValues={currentAccount}
            >
                <Form.Item
                    label={ACCOUNT_CODE}
                    name='accountCode'
                    rules={[{ required: true, message: `请输入${ACCOUNT_CODE}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_CODE}`} />
                </Form.Item>
                <Form.Item
                    label={ACCOUNT_NAME}
                    name='accountName'
                    rules={[{ required: true, message: `请输入${ACCOUNT_NAME}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_NAME}`} />
                </Form.Item>
                <Form.Item
                    label={ACCOUNT_ID}
                    name='thirdAccountID'
                    rules={[{ required: true, message: `请输入${ACCOUNT_ID}` }]}
                >
                    <Input placeholder={`请输入${ACCOUNT_ID}`} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddEditModal
