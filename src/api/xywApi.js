import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

export function getClassifyListAPI(params) { //推荐分类的
  return request({
    url: `${requestPath.resourcefg}/diytype/list`,
    method: 'get',
    params
  })
}

export function getResListAPI(params) { //pdf等资源的列表
  return request({
    url: `${requestPath.resourcefg}/video-library/pagePdfAndVideo`,
    method: 'get',
    params
  })
}

export function getPathAPI(params) { //获取路径
  return request({
    url: `${requestPath.file}/getFilePath`,
    method: 'get',
    params
  })
}

/*错题本*/
export function getErrorbookAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/error-book/error-book-code-num`,
    method: 'get',
    params
  })
}

/*完善信息*/
export function saveUsermessageAPI(data) {
  return request({
    url: `${requestPath.resourcefg}/member-center/update-member-ex-info`,
    method: 'post',
    data
  })
}

/*获取工作分类*/
export function getJobAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/member-center/job`,
    method: 'get',
    params
  })
}

/*获取用户补全信息*/
export function getUserMessageAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/member-center/get-member-ex-info`,
    method: 'get',
  })
}
/*获取地址*/
export function getAreaTreeAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/address/list`,
    method: 'get',
  })
}

/*获取部门列表*/
export function getDepartListAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/depart/list`,
    method: 'get',
  })
}

/*保存头像*/
export function saveImgAPI(data) {
  return request({
    url: `${requestPath.file}upload`,
    method: 'post',
    data
  })
}


/*收藏试题*/
export function getCollectionNumAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/collection/collection-code-num`,
    method: 'get',
    params
  })
}

/*校验是否收藏*/
export function getCollectioncheckAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/collection/check`,
    method: 'get',
    params
  })
}

/*添加收藏*/
export function addCollectionAPI(data) {
  return request({
    url: `${requestPath.resourcefg}/collection/add-member-collection`,
    method: 'post',
    data
  })
}
/*取消收藏*/
export function delCollectionAPI(data) {
  return request({
    url: `${requestPath.resourcefg}/collection/batch/delete`,
    method: 'post',
    data
  })
}

/*课件收藏列表*/
export function getCollectionListAPI(params) {
  return request({
    url: `${requestPath.resourcefg}/collection/courseware-library/page`,
    method: 'get',
    params
  })
}
// 根据视频id获取路径
export function getFilePathAPI(params) {
  return request({
    url: `${requestPath.file}/getFilePath?fileName=${params}`,
    method: 'get',
  })
}

//获取留言板列表
export function getMessageListAPI(params) {
  return request({
    url: `${requestPath.commonfg}/message/page`,
    method: 'get',
    params
  })
}

//发送留言
export function sendMessageAPI(data) {
  return request({
    url: `${requestPath.commonfg}/message/add`,
    method: 'post',
    data
  })
}
