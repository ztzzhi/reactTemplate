const Cache_Key = 'pc_cache_page'
const useCachePage = (Key?: string) => {
  const setCachePage = (params: any) => {
    const pathname = Key || window.location.pathname
    const cachePage = window.sessionStorage.getItem(Cache_Key)
      ? JSON.parse(window.sessionStorage.getItem(Cache_Key)!)
      : {}
    cachePage[pathname] = params
    window.sessionStorage.setItem(Cache_Key, JSON.stringify(cachePage))
  }
  const getCachePage = () => {
    const pathname = Key || window.location.pathname
    const cachePage = window.sessionStorage.getItem(Cache_Key)
      ? JSON.parse(window.sessionStorage.getItem(Cache_Key)!)
      : {}
    return cachePage[pathname] || null
  }
  return { setCachePage, getCachePage }
}
export default useCachePage
