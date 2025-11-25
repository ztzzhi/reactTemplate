/**
 * 主题工具函数
 */

export type ThemeMode = 'light' | 'dark'

/**
 * 设置主题
 */
export const setTheme = (theme: ThemeMode) => {
  const html = document.documentElement

  if (theme === 'dark') {
    html.setAttribute('theme', 'dark')
  } else {
    html.removeAttribute('theme')
  }

  // 保存到 localStorage
  localStorage.setItem('theme', theme)
}

/**
 * 获取当前主题
 */
export const getTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem('theme') as ThemeMode
  return savedTheme || 'light'
}

/**
 * 初始化主题
 */
export const initTheme = () => {
  const theme = getTheme()
  setTheme(theme)
  return theme
}

/**
 * 切换主题
 */
export const toggleTheme = (): ThemeMode => {
  const currentTheme = getTheme()
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  return newTheme
}
