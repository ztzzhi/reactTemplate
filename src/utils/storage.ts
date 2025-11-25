/**
 * localStorage 封装
 */
export const storage = {
  get(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }
    return null
  },

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },
}

/**
 * sessionStorage 封装
 */
export const sessionStorage = {
  get(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    }
    return null
  },

  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    window.sessionStorage.removeItem(key)
  },

  clear() {
    window.sessionStorage.clear()
  },
}
