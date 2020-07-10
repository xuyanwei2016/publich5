import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

// 统计信息
export function getDetailAPI(params){
  return request({
    url:`${requestPath.resource}/error-book/get`,
    method:'get',
    params
  })
}

// 统计信息列表
export function getRecordList(params){
  return request({
    url:`${requestPath.resource}/error-book/get/list`,
    method:'get',
    params
  })
}