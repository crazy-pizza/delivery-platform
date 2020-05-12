import React from 'react'
import { Modal, Button, Form, Input, InputNumber } from 'antd'
import { UploadPic } from '@components'

const FOOD_PRICE = '菜品价格'
const FOOD_NAME = '菜品名称'
const FOOD_DESC = '菜品描述'
const FOOD_STOCK = '菜品库存数量'

const AddEditModal  = (props) => {
    const [thisFrom] = Form.useForm();
    const { saveFood, currentFood = {}, handleCancel, title, searchList } = props
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
                    label={FOOD_NAME}
                    name='foodName'
                    rules={[{ required: true, message: `请输入${FOOD_NAME}` }]}
                >
                    <Input placeholder={`请输入${FOOD_NAME}`} />
                </Form.Item>
                <Form.Item
                    label={FOOD_PRICE}
                    name='foodPrice'
                    rules={[{ required: true, message: `请输入${FOOD_PRICE}` }]}
                >
                    <InputNumber style={{ width: '100%' }} defaultValue={0} placeholder={`请输入${FOOD_PRICE}`}/>
                </Form.Item>
                <Form.Item
                    label={FOOD_DESC}
                    name='foodDesc'
                    rules={[{ message: `请输入${FOOD_DESC}` }]}
                >
                    <Input placeholder={`请输入${FOOD_DESC}`} />
                </Form.Item>

                <Form.Item
                    label={FOOD_STOCK}
                    name='balance'
                    rules={[{ required: true, message: `请输入${FOOD_STOCK}` }]}
                >
                    <InputNumber style={{ width: '100%' }} defaultValue={0} placeholder={`请输入${FOOD_STOCK}`} />
                </Form.Item>

                <UploadPic callback={searchList} food={currentFood} />
            </Form>
        </Modal>
    )
}
export default AddEditModal
