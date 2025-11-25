import React, { useEffect } from 'react'
import { ConfigProvider } from 'antd'
import { theme as antdTheme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useAppSelector } from '@/store/hooks'
import { setTheme, initTheme } from '@/utils/theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, primaryColor } = useAppSelector((state) => state.theme)

  useEffect(() => {
    initTheme()
  }, [])

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius: 6,
        },
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
