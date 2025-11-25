import request from '@/utils/request'

/**
 * 用户登录
 */
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/user/info',
    method: 'GET',
  })
}

/**
 * 用户登出
 */
export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST',
  })
}

/**
 * 获取用户列表
 */
export const getUserList = (params: any) => {
  return request({
    url: '/user/list',
    method: 'GET',
    params,
  })
}

/**
 * 创建用户
 */
export const createUser = (data: any) => {
  return request({
    url: '/user/create',
    method: 'POST',
    data,
  })
}

/**
 * 更新用户
 */
export const updateUser = (id: string, data: any) => {
  return request({
    url: `/user/${id}`,
    method: 'PUT',
    data,
  })
}

/**
 * 删除用户
 */
export const deleteUser = (id: string) => {
  return request({
    url: `/user/${id}`,
    method: 'DELETE',
  })
}
