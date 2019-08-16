import request from '@/utils/request';

// export async function query(): Promise<any> {
//   return request('/api/users');
// }

export async function queryCurrent(): Promise<any> {//请求用户名称和头像的函数
  // return request('/api/currentUser');
  return request('/api/user');

}
export async function logout(): Promise<any> {//退出登录，取消权限
  // return request('/api/currentUser');
  return request('/api/logout');

}

// export async function queryNotices(): Promise<any> {
//   return request('/api/notices');
// }
// export async function queryRole() {//权限从后台请求
//   return request('/api/role');
// }