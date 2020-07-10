import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

// 月月赛列表
export function getMoonListAPI(params){
  return request({
    url:`${requestPath.resource}/week-practise/online/exam`,
    method:'get',
    params
  })
}

// 月月赛详情
export function getMatchDetailAPI(params){
  return request({
    url:`${requestPath.resource}/week-practise/query/exam/info`,
    method:'get',
    params
  })
}

// 继续答题
export function getMatchConDetailAPI(params){
  return request({
    url:`${requestPath.resource}/record/test-paper`,
    method:'get',
    params
  })
}


// 生成月月赛记录
export function createPaperAPI(data){
  return request({
    url:`${requestPath.resource}/record/create-paper`,
    method:'post',
    data
  })
}

// 获取试卷的答题状态
export function getPaperStatusAPI(params){
  return request({
    url:`${requestPath.resource}/record/check`,
    method:'get',
    params
  })
}


// 保存每次答题记录
export function createRecordAPI(data){
  return request({
    url:`${requestPath.resource}/record/create-record`,
    method:'post',
    data
  })
}

// 查看解析
export function getMatchViewAPI(params){
  return request({
    url:`${requestPath.resource}/record/get/test-paper`,
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
