export const requestPath = {
  bgmember: '/bg-member/bg',
  bgResource: '/bg-resource/bg',
  memberWap: '/member/ydcc',
  common: '/sysuser/wap',
  commonbg: '/sysuser/bg',
  commonfg: '/sysuser/fg',
  orderfg: '/order/fg',
  resourcefg: '/resource/fg',
  resourcebg: '/resource/bg',
  resourceweb: '/resource/wap',
  member: '/member/fg',
  resource: '/resource/fg',
  resourceBg: '/resource/bg',
  file: '/file/file/',
}

export const uploadUrl = `${process.env.BASE_API}/file/file/`
export const uploadUrlT = `${process.env.BASE_API}/`
export const imgAdd = `${process.env.BASE_API}/file/file/`
export const baseUrl = `${process.env.BASE_API}/wap-y/index.html#`/*分享文章链接*/
export const downloadPath = 'download'
export const uploadPath = 'upload'

export const videoUrl = function(link){
  // return `${process.env.BASE_API}/file/file/?fileName=${link}&isOnLine=true`
  return `${process.env.BASE_API}/file/file/download/${link}`
}
export const getVideo = function(data){
  return `${process.env.BASE_API}file/${data}/index.m3u8`
}
