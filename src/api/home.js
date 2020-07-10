import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';
/*/resource/fg/recommend/wap/recommend/list?code=WAP_HOME_01&num=3 */
/*获取轮播图*/
export function getCarouselAPI(){
  return request({
    url:`${requestPath.sysydcc}/carousel/adsign?signValue=ydccsy_lb`,
    method:'get',
  })
}

/* 工作室推荐 */
export function getClassicAPI(params){
  return request({
    url:`${requestPath.resourcefg}/recommend/mini-program/recommend/list`,
    method:'get',
    params
  })
}

/*特色疗法*/
// export function getTherapyAPI(){
//   return request({
//     url:`${requestPath.resourcefg}/recommend/wap/recommend/list?code=WAP_HOME_01&num=2`,
//     method:'get',
//   })
// }
/*医家*/
// export function getDoctorAPI(){
//   return request({
//     url:`${requestPath.resourcefg}/recommend/wap/recommend/list?code=HOME_2&num=3`,
//     method:'get',
//   })
// }
/*药材*/
// export function getMaterialsAPI(){
//   return request({
//     url:`${requestPath.resourcefg}/recommend/wap/recommend/list?code=WAP_HOME_02&num=6`,
//     method:'get',
//   })
// }
/*推荐阅读*/
// export function getBookListAPI(){
//   return request({
//     url:`${requestPath.resourcefg}/recommend/wap/recommend/list?code=HOME_4&num=3`,
//     method:'get',
//   })
// }
/*系统消息*/
export function getMessageAPI(data){
  return request({
    url:`${requestPath.member}/pm/page?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
    method:'get',
  })
}
/*消息详情*/
export function getMessageDetailAPI(data){
  return request({
    url:`${requestPath.member}/pm/get/${data}`,
    method:'get',
  })
}
/*搜索自动补全*/
export function getCompletionAPI(data){
  return request({
    url:`${requestPath.resourceydcc}/resource/auto/completion`,
    method:'get',
    params:data,
  })
}
/*查询是否有未读信息*/
export function geUnreadtAPI(data){
  return request({
    url:`${requestPath.member}/pm/count`,
    method:'get',
  })
}

/*热词*/
export function addHotswAPI(data){
  return request({
    url:`${requestPath.commonfg}/hotsw/update`,
    method:'post',
    data
  })
}

