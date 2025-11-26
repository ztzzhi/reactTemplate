import { UserListParams, UserData } from './types'

// 生成Mock数据的辅助函数
const generateMockUser = (index: number): UserData => {
  const surnames = [
    '张',
    '李',
    '王',
    '赵',
    '刘',
    '陈',
    '杨',
    '黄',
    '周',
    '吴',
    '徐',
    '孙',
    '马',
    '朱',
    '胡',
    '林',
    '郭',
    '何',
    '高',
    '罗',
  ]
  const names = [
    '伟',
    '芳',
    '娜',
    '秀英',
    '敏',
    '静',
    '丽',
    '强',
    '磊',
    '军',
    '洋',
    '勇',
    '艳',
    '杰',
    '涛',
    '明',
    '超',
    '秀兰',
    '霞',
    '平',
  ]
  const cities = [
    '北京市朝阳区',
    '上海市浦东新区',
    '广州市天河区',
    '深圳市南山区',
    '杭州市西湖区',
    '成都市锦江区',
    '武汉市洪山区',
    '西安市雁塔区',
    '南京市鼓楼区',
    '苏州市工业园区',
    '天津市和平区',
    '重庆市渝中区',
    '青岛市市南区',
    '大连市中山区',
    '厦门市思明区',
    '长沙市岳麓区',
    '郑州市金水区',
    '济南市历下区',
    '合肥市庐阳区',
    '福州市鼓楼区',
  ]
  const tagsOptions = [['管理员'], ['VIP'], ['普通用户'], ['管理员', 'VIP'], ['VIP', '普通用户']]

  const surname = surnames[index % surnames.length]
  const name = names[Math.floor(index / surnames.length) % names.length]
  const fullName = surname + name + (index > 20 ? index.toString().slice(-1) : '')
  const age = 20 + (index % 40)
  const cityIndex = index % cities.length
  const address = cities[cityIndex] + `${100 + (index % 900)}号`
  const email = `user${index}@example.com`
  const phone = `138${String(10000000 + index).padStart(8, '0')}`
  const tags = tagsOptions[index % tagsOptions.length]
  const status = index % 10 === 0 ? 0 : 1 // 每10个中有一个禁用
  const dayOffset = index % 30
  const createTime = new Date(2024, 0, 15 + dayOffset, 10 + (index % 8), 30 + (index % 30), index % 60)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19)
  const updateTime = new Date(2024, 0, 20 + dayOffset, 15 + (index % 8), 20 + (index % 40), index % 60)
    .toISOString()
    .replace('T', ' ')
    .slice(0, 19)

  return {
    id: String(index + 1),
    name: fullName,
    age,
    address,
    email,
    phone,
    tags,
    status,
    createTime,
    updateTime,
  }
}

// 生成100条Mock数据
const mockUserList: UserData[] = Array.from({ length: 100 }, (_, index) => generateMockUser(index))

/**
 * 模拟延迟
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * 获取用户列表（Mock）
 */
export const getUserList = async (params: UserListParams): Promise<IResponseList<UserData>> => {
  // 模拟网络延迟
  await delay(500)

  let filteredData = [...mockUserList]

  // 按姓名筛选
  if (params.name) {
    filteredData = filteredData.filter((item) => item.name.includes(params.name!))
  }

  // 按状态筛选
  if (params.status !== undefined) {
    filteredData = filteredData.filter((item) => item.status === params.status)
  }

  // 按标签筛选
  if (params.tags && params.tags.length > 0) {
    filteredData = filteredData.filter((item) => params.tags!.some((tag) => item.tags.includes(tag)))
  }

  // 按创建时间筛选
  if (params.createTimeStart && params.createTimeStart.length === 2) {
    const [start, end] = params.createTimeStart
    filteredData = filteredData.filter((item) => {
      if (!item.createTime) return false
      const createTime = new Date(item.createTime).getTime()
      const startTime = new Date(start).getTime()
      const endTime = new Date(end).getTime()
      return createTime >= startTime && createTime <= endTime
    })
  }

  // 分页
  const current = params.current || 1
  const size = params.size || 10
  const start = (current - 1) * size
  const end = start + size
  const records = filteredData.slice(start, end)

  return {
    code: 200,
    msg: 'success',
    data: {
      list: records,
      total: filteredData.length,
      page: current,
      msg: 'success',
    },
  }
}

/**
 * 删除用户（Mock）
 */
export const deleteUser = async (_id: string): Promise<IResponsePost<any>> => {
  await delay(300)
  return {
    code: 200,
    msg: '删除成功',
    data: null,
  }
}

/**
 * 更新用户状态（Mock）
 */
export const updateUserStatus = async (_id: string, _status: number): Promise<IResponsePost<any>> => {
  await delay(300)
  return {
    code: 200,
    msg: '操作成功',
    data: null,
  }
}
