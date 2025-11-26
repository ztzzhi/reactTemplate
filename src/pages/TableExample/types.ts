/**
 * 用户数据接口
 */
export interface UserData {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 姓名
   */
  name: string
  /**
   * 年龄
   */
  age: number
  /**
   * 地址
   */
  address: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 电话
   */
  phone?: string
  /**
   * 标签
   */
  tags: string[]
  /**
   * 状态 0-禁用 1-启用
   */
  status: number
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 更新时间
   */
  updateTime?: string
}

/**
 * 用户列表查询参数
 */
export interface UserListParams {
  current?: number
  size?: number
  name?: string
  status?: number
  tags?: string[]
  createTimeStart?: string[]
}

/**
 * 用户列表响应
 */
export interface UserListResponse {
  code: number
  message: string
  data: {
    records: UserData[]
    total: number
    current: number
    size: number
  }
}
