import React, { useState } from 'react'
import { Upload, Avatar, message } from 'antd'
import { axiosFetch, getSrc } from '@utils'
import { Icon } from '@components'
import { useMappedState, useDispatch } from 'redux-react-hook'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('你只能上传JPG/PNG类型的图片!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片文件最大不能超过 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const UploadAvatar = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const userInfo = useMappedState($$state => $$state.user)
  const dispatch = useDispatch()


  const handleChange = info => {
    const formData = new FormData()
    formData.append('file', info.file.originFileObj)

    setLoading(true)
    axiosFetch({
      api: '/file/upload',
      formData,
    }).then((imgurl) => {
      axiosFetch({
        api: '/user/update',
        params: { userID: userInfo.userID, headImage: imgurl },
      }).then((res) => {
        dispatch({
          type: 'setUserInfo',
          payload: { headImage: imgurl },
        })

        message.success('修改成功')
        getBase64(info.file.originFileObj, imageUrl => {
          setLoading(false)
          setImageUrl(imageUrl)
        })
      }).catch(() => { setLoading(false) })

    }).catch(() => { setLoading(false) })
  }

  const uploadButton = () => {
    if (userInfo.headImage) {
      return <img src={getSrc(userInfo.headImage)} alt="avatar" style={{ width: '100%' }} />
    }
    return (
      <div>
        {loading ? <Icon name="LoadingOutlined" /> : <Icon name="PlusOutlined" />}
        <div className="ant-upload-text">修改图片</div>
      </div>
    )
  }

  return (
    <div style={{width: '104px', margin: '0 auto'}}>
      <Upload
        name="file"
        // fileList={[]}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="/file/upload"
        customRequest={() => {}}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton()}
      </Upload>
    </div>
  )
}

export default UploadAvatar

