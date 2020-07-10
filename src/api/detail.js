import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';
// 错题详情
export function getWeekDetailAPI(params){
  return request({
    url:`${requestPath.resource}/error-book/page`,
    method:'get',
    params
  })
}
// 收藏详情
export function getCollDetailAPI(params){
  return request({
    url:`${requestPath.resource}/collection/page`,
    method:'get',
    params
  })
}

// 删除收藏试题
export function delColAPI(data){
  return request({
    url:`${requestPath.resource}/collection/batch/delete`,
    method:'post',
    data
  })
}
// 删除错题
export function delWrongAPI(data){
  return request({
    url:`${requestPath.resource}/error-book/delete-error`,
    method:'post',
    data
  })
}