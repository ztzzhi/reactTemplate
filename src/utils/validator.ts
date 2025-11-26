import { FormInstance } from 'antd'
import dayjs from 'dayjs'

export const loginPasswordVerify = (_: any, value: number | string) => {
  if (!value) {
    return Promise.resolve()
  } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value + '')) {
    return Promise.reject(new Error('密码必须包含大小写字母和数字，最少8位数！'))
  } else {
    return Promise.resolve()
  }
}

export const loginPasswordConfirmVerify = (_: any, value: number | string, password: string) => {
  if (!value || password === value) {
    return Promise.resolve()
  } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(value + '')) {
    return Promise.reject(new Error('密码必须包含大小写字母和数字，最少8位数！'))
  } else if (password !== value) {
    return Promise.reject(new Error('您输入的新密码不匹配！'))
  } else {
    return Promise.resolve()
  }
}

export const phoneVerify = (_: any, value: number | string) => {
  if (!value) {
    return Promise.resolve()
  } else if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value + '')) {
    return Promise.reject(new Error('手机号格式不正确'))
  } else {
    return Promise.resolve()
  }
}
export const TwoDateVerify = (
  _: any,
  __: any,
  first: string,
  second: string,
  errorText = '上市日期需要小于过季日期',
) => {
  if (!first || !second) return Promise.resolve()
  const firstDate = first && dayjs(first).startOf('day').valueOf()
  const secondDate = second && dayjs(second).startOf('day').valueOf()
  if (firstDate < secondDate) {
    return Promise.resolve()
  } else {
    return Promise.reject(errorText)
  }
}
export const TwoDateVerifyCanEqual = (
  _: any,
  __: any,
  first: string,
  second: string,
  errorText = '上市日期需要小于过季日期',
) => {
  if (!first || !second) return Promise.resolve()
  const firstDate = first && dayjs(first).startOf('day').valueOf()
  const secondDate = second && dayjs(second).startOf('day').valueOf()
  if (firstDate <= secondDate) {
    return Promise.resolve()
  } else {
    return Promise.reject(errorText)
  }
}

export const AreaVerify = (_: any, value: number | string) => {
  if (!value) {
    return Promise.resolve()
  } else if (Array.isArray(value) && value.length !== 3) {
    return Promise.reject(new Error('区域请选择到区级'))
  } else {
    return Promise.resolve()
  }
}

export const validateOutPackageNum = (_: any, inPackageNum: number, outPackageNum: number) => {
  if (!inPackageNum && !outPackageNum) {
    return Promise.resolve()
  }
  if ((inPackageNum && !outPackageNum) || (!inPackageNum && outPackageNum) || outPackageNum % inPackageNum != 0) {
    return Promise.reject(new Error('外箱数必须是内箱数的整数倍'))
  }
  return Promise.resolve()
}

export const validatePackageNum = (_: any, inPackageNum: number, outPackageNum: number) => {
  if (!inPackageNum || !outPackageNum) {
    return Promise.resolve()
  }
  if ((inPackageNum && !outPackageNum) || (!inPackageNum && outPackageNum) || outPackageNum % inPackageNum != 0) {
    return Promise.reject(new Error('外箱数必须是内箱数的整数倍'))
  }
  return Promise.resolve()
}

export const validateVolumeOrWeight = (form: FormInstance) => {
  const volume = form.getFieldValue('volume')
  const weight = form.getFieldValue('weight')
  if (!volume && !weight) {
    return Promise.reject(new Error('请至少填写方数或重量'))
  }
  return Promise.resolve()
}

export const validateIsPureDigital = (_: any, value: number | string) => {
  if (!value) {
    return Promise.resolve()
  } else if (!/^\d+$/.test(value + '')) {
    return Promise.reject(new Error('联系人电话格式不正确'))
  } else {
    return Promise.resolve()
  }
}

/**
 * 验证表单中至少有一个指定的字段被填写
 * @param form FormInstance 表单实例
 * @param fields string[] 需要检查的字段名数组
 * @param errorMessage string 可选的错误消息
 * @returns Promise
 */
export const validateAtLeastOneField = (form: FormInstance, fields: string[], errorMessage = '请至少填写一项') => {
  const values = fields.map((field) => form.getFieldValue(field))
  if (values.every((value) => !value)) {
    return Promise.reject(new Error(errorMessage))
  }

  return Promise.resolve()
}
