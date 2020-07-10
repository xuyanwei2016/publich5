import request from '@/utils/request';
import { requestPath } from '@/utils/global.js';

export function loginAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-center/wap/login`,
    method:'post',
    data
  })
}
/*获取图片验证码*/
export function getImgCodeAPI(){
  return request({
    url:`${requestPath.resourcefg}/member-center/code`,
    method:'get',
  })
}

/*手机验证*/
export function getPhoneCodeAPI(data){
  return request({
    url:`${requestPath.resourcefg}/member-center/login/phone/code`,
    method:'post',
    data
  })
}
