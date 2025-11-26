import dayjs from 'dayjs'

/**
 * 格式化日期
 */
export const formatDate = (date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format)
}

/**
 * 格式化金额
 */
export const formatMoney = (amount: number, decimals = 2) => {
  return `¥${amount.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

/**
 * 格式化手机号
 */
export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

/**
 * vite图片处理
 */
export function getImageByUrl(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
