import request from '@/utils/request';


export async function queryFakeList(): Promise<any> {//请求卡片数据的函数
  return request('/api/cardList');  
}
// 