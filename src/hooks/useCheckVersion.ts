import { useState, useEffect, useCallback } from 'react'

interface UseCheckVersionOptions {
  checkInterval?: number
  storageKey?: string
}
/**
 * 版本检查 Hook
 * 检测应用是否有新版本可用，返回是否有更新的布尔值
 * 自动检查更新，每20秒检查一次
 * 检查更新时，会从 localStorage 获取存储的版本号
 * 1
 */
export const useCheckVersion = (options: UseCheckVersionOptions = {}) => {
  const {
    checkInterval = 10 * 60 * 1000, // 10分钟检查一次
    // checkInterval = 10 * 1000, // 1分钟检查一次
    storageKey = 'qsfpc_app_version',
  } = options

  const [hasUpdate, setHasUpdate] = useState<boolean>(false)
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [currentVersion, setCurrentVersion] = useState<string>('')
  const [latestVersion, setLatestVersion] = useState<string>('')

  /**
   * 从 package.json 获取版本号
   */
  const getVersionFromPackage = useCallback(async (): Promise<string> => {
    try {
      // 添加时间戳参数避免浏览器缓存
      const timestamp = Date.now()
      // { cache: 'no-store' } 有用
      const response = await fetch(`/version.json?t=${timestamp}`, { cache: 'no-store' })
      if (response.ok) {
        const version = await response.json()
        return version.version || '0.0.0'
      }
    } catch (error) {
      console.warn('Failed to get version from package.json:', error)
    }
    return '0.0.0'
  }, [])

  /**
   * 比较版本号
   * 只要任意一个部分不一样就认为有变化
   */
  const compareVersions = useCallback((v1: string, v2: string): boolean => {
    // 如果版本号完全一样，返回 false
    if (v1 === v2) return false

    const normalize = (v: string) => v.split('.').map(Number)
    const v1Parts = normalize(v1)
    const v2Parts = normalize(v2)

    // 如果长度不一样，认为有变化
    if (v1Parts.length !== v2Parts.length) return true

    // 比较每个部分，只要有一个不一样就返回 true
    for (let i = 0; i < v1Parts.length; i++) {
      if (v1Parts[i] !== v2Parts[i]) return true
    }

    return false
  }, [])

  /**
   * 初始化版本信息
   */
  const initializeVersion = useCallback(async () => {
    try {
      // 获取当前版本号
      const version = await getVersionFromPackage()
      setCurrentVersion(version)
      setLatestVersion(version)

      // 将版本号存储到 localStorage
      localStorage.setItem(storageKey, version)
      console.log(`📦 初始化版本: ${version}`)
    } catch (error) {
      console.error('Failed to initialize version:', error)
    }
  }, [getVersionFromPackage, storageKey])

  /**
   * 检查更新
   */
  const checkUpdate = useCallback(async () => {
    setIsChecking(true)

    try {
      // 从 localStorage 获取存储的版本号
      const storedVersion = localStorage.getItem(storageKey) || '0.0.0'

      // 获取最新的版本号
      const latestVersion = await getVersionFromPackage()

      if (latestVersion) {
        setLatestVersion(latestVersion)

        // 比较版本号
        const hasNewVersion = compareVersions(latestVersion, storedVersion)
        setHasUpdate(hasNewVersion)

        if (hasNewVersion) {
          console.log(`🔄 发现新版本: ${storedVersion} -> ${latestVersion}`)
          // 更新 localStorage 中的版本号
          localStorage.setItem(storageKey, latestVersion)
        } else {
          console.log('没有新版本')
        }
      }
    } catch (error) {
      console.error('Version check failed:', error)
    } finally {
      setIsChecking(false)
    }
  }, [getVersionFromPackage, compareVersions, storageKey])

  // 初始化时获取版本号并存储
  useEffect(() => {
    initializeVersion()
  }, [initializeVersion])

  // 设置定时检查
  useEffect(() => {
    if (checkInterval > 0) {
      const timer = setInterval(checkUpdate, checkInterval)
      return () => clearInterval(timer)
    }
  }, [checkInterval, checkUpdate])

  return {
    hasUpdate,
    isChecking,
    currentVersion,
    latestVersion,
    checkUpdate,
  }
}

export default useCheckVersion
