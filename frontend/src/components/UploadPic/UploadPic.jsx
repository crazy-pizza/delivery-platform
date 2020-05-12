import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { axiosFetch, getSrc } from '@utils'
import { Icon } from '@components'

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

const UploadPic = ({ food = {}, callback }) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = info => {
    const formData = new FormData()
    formData.append('file', info.file.originFileObj)

    setLoading(true)
    axiosFetch({
      api: '/file/upload',
      formData,
    }).then((imgurl) => {
      if (food.foodID) {
        axiosFetch({
          api: '/food/update',
          params: { foodID: food.foodID, imagePath: imgurl },
        }).then(() => {
          message.success('修改成功')
          getBase64(info.file.originFileObj, imageUrl => {
            setLoading(false)
            setImageUrl(imageUrl)
          })
          callback && callback()
        }).catch(() => { setLoading(false) })
      } else {
        getBase64(info.file.originFileObj, imageUrl => {
          setLoading(false)
          setImageUrl(imageUrl)
        })
        callback && callback(imgurl)
      }

    }).catch(() => { setLoading(false) })
  }

  const uploadButton = () => {
    if (food.imagePath) {
      return <img src={getSrc(food.imagePath)} alt="avatar" style={{ width: '100%' }} />
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

export default UploadPic

