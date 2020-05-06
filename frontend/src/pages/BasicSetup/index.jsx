import React from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Radio,
    Select,
} from 'antd'
class BasicSetup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            systemOption: '',
            url: '',
            userName: '',
            dateType: 'a',
        }
    }
    onFinish = (values) => {
        console.log('Success:', values);
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    render = () => {
        const { systemOption = '', url = '', userName = '', dateType = 'a'} = this.state
        const layout = {
            labelCol: {
                md: {
                    span: 4,
                }
            },
            wrapperCol: {
                md: {
                    span: 7,
                }
            },
        }
        const tailLayout = {
            wrapperCol: {
                offset: 4,
                span: 7,
            },
        }
        return (
            <Row className="layoutsContainer">
                <Col span={24} className="layoutsHeader">
                    <div className="layoutsTool">
                        <div className="layoutsToolLeft">
                            <h1>系统设置</h1>
                        </div>
                    </div>
                </Col>
                <Col span={24} className="layoutsLineBlock"></Col>
                <Col span={24} className="layoutsContent">
                    <div>
                        <Form
                            {...layout}
                            layout="horizontal"
                            size="middle"
                            initialValues={
                                {
                                    systemOption,
                                    url,
                                    userName,
                                    dateType,
                                }
                            }
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                label="第三方财务系统"
                                name="systemOption"
                                rules={[{ required: true, message: '请求选择财务系统' }]}
                            >
                                <Select>
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="财务系统接口地址"
                                name="url"
                                rules={[{ required: true, message: '请输入接口地址' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="财务系统用户名"
                                name="userName"
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="财务系统密码"
                                name="userPwd"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="凭证日期"
                                name="dateType"
                                rules={[{ required: true, message: '请选择凭证日期' }]}
                            >
                                <Radio.Group>
                                    <Radio value="a">登录日期</Radio>
                                    <Radio value="b">单据日期</Radio>
                                    <Radio value="c">审核日期</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">保存</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        )
    }
}


export default BasicSetup
