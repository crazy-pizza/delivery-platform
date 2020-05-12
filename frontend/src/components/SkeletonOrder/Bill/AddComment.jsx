import React, { useState } from 'react'
import { Comment, Avatar, Form, Button, Input, message, Modal, Rate } from 'antd'
import { useMappedState } from 'redux-react-hook'
import { axiosFetch, getSrc } from '@utils'
import { UploadPic } from '@components'

const { TextArea } = Input


const AddComment = ({ onCancel, record }) => {
    const [submitting, setSubmitting] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [value, setValue] = useState('')
    const [star, setStar] = useState(0)
    const userInfo = useMappedState($$state => $$state.user)
  
    const handleSubmit = () => {
        if (!value) return
        setSubmitting(true)
        axiosFetch({
            api: '/comment/add',
            params: { orderID: record.orderID, imagePath: imgUrl, content: value, star },
        }).then((res) => {
            message.success('添加评论成功')
            setSubmitting(false)
            onCancel()
        }).catch(() => {
            setSubmitting(false)
            onCancel()
        })
    }

    const addPic = (res) => {
        setImgUrl(res)
    }

    const handleChange = e => {
        setValue(e.target.value)
    }

    return (
        <Modal
            visible={true}
            title="评价"
            onCancel={onCancel}
            maskClosable={false}
            footer={[
                <Button
                    onClick={onCancel}
                >取消</Button>,
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={handleSubmit}
                    type="primary"
                >添加评论</Button>
            ]}
        >
            <Comment
                avatar={
                    <Avatar
                        src={getSrc(userInfo.headImage)}
                        alt={userInfo.userName}
                    />
                }
                content={
                    <div>
                        <Form.Item>
                            <p><Rate style={{ paddingBottom: '10px', fontSize: '14px' }} onChange={(v) => { setStar(v) }} defaultValue={0} /></p>
                            <TextArea rows={4} onChange={handleChange} value={value} />
                            <div style={{ height: '10px' }}></div>
                            <UploadPic callback={addPic} noInit={true} />
                        </Form.Item>
                    </div>
                }
            />
        </Modal>
    )
}
export default AddComment
