import request from '@/utils/request';
import { FormDataType } from './index';

export async function fakeAccountLogin(params: FormDataType) {
  return request('/api/login', {//进行用户名，密码推送，并在后台进行验证，成功的state是ok
    method: 'POST',
    data: params,
  });
}

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }
