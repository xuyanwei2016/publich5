import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

// 周周练列表
export function getWeekListAPI(params){
  return request({
    url:`${requestPath.resource}/week-practise/online/answer`,
    method:'get',
    params
  })
}

// 周周练试题详情
export function getWeekDetailAPI(params){
  return request({
    url:`${requestPath.resource}/week-practise/get-exampaper-info`,
    method:'get',
    params
  })
}

// 保存周周练
export function saveWeekAPI(data){
  return request({
    url:`${requestPath.resource}/record/create-week`,
    method:'post',
    data
  })
}
// 周周练答题报告
export function getDetailPaperAPI(params){
  return request({
    url:`${requestPath.resource}/record/get/week-practise`,
    method:'get',
    params
  })
}

// 查看收藏状态
export function getColStatusAPI(params){
  return request({
    url:`${requestPath.resource}/collection/check`,
    method:'get',
    params
  })
}
// 添加收藏
export function addCollectionAPI(data){
  return request({
    url:`${requestPath.resource}/collection/add-member-collection`,
    method:'post',
    data
  })
}

// 取消收藏
export function delCollectionAPI(data){
  return request({
    url:`${requestPath.resource}/collection/batch/delete`,
    method:'post',
    data
  })
}

export function getFilePathAPI(params) { 
  return request({
      url: `${requestPath.file}/getFilePath?fileName=${params}`,
      method: 'get',
  })
}

