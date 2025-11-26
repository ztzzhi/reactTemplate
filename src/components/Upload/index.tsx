import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Upload, message, Image } from 'antd'
import './index.less'
const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const UploadComponent = (props: any) => {
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  useEffect(() => {
    if (props.value && typeof props.value === 'string') {
      setFileList(props.value.split(',')?.map((item: string) => ({ url: item })))
    } else {
      setFileList([])
    }
  }, [props.value])

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = (info: any) => {
    const { fileList: newFileList } = info
    setFileList(newFileList)
    if (info?.file?.response?.code === 402) {
      message.error(info?.file?.response?.message)
      setTimeout(() => {
        setFileList(newFileList.slice(0, newFileList.length - 1))
      }, 500)
    } else {
      if (info.file.status === 'done') {
        setFileList(newFileList)
        const url = newFileList?.map((item: any) => item?.response?.data?.linkUrl || item?.url).join(',')
        props.onChange(url)
      }
    }
  }

  const handleOnRemove = (file: any) => {
    const newFileList = fileList?.filter((item: any) => item.uid !== file.uid)
    setFileList(newFileList)
    const url = newFileList?.map((item: any) => item?.response?.data?.linkUrl || item?.url).join(',')
    props.onChange(url)
  }

  const uploadButton = (
    <div>
      <PlusOutlined style={{ color: '#999' }} />
      <div
        style={{
          marginTop: 8,
          color: '#999',
        }}
      >
        图片上传
      </div>
    </div>
  )
  return (
    <div className="custom_upload_wrap">
      <div>
        <Upload
          action={`/api/sop/sop/file/upload`}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={handleOnRemove}
          disabled={!!props.disabled}
          accept={props.accept ? props.accept : 'image/*'}
          maxCount={props.max || 1}
        >
          {props.disabled ? null : props.max ? (fileList.length >= props.max ? null : uploadButton) : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: 'none',
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
        {props.disabled && fileList.length === 0 ? <div style={{ color: '#999' }}>暂无图片</div> : ''}
      </div>
    </div>
  )
}

export default UploadComponent
