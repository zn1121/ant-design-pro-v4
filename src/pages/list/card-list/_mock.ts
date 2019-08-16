// import { Request, Response } from 'express';
// import { CardListItemDataType } from './data';
// // import logo from '../../../assets/logo_sm_blue.svg';

// const titles = [
//   '云迹科技',
//   'Angular',
//   'Ant Design',
//   'Ant Design Pro',
//   'Bootstrap',
//   'React',
//   'Vue',
//   'Webpack',
// ];
// const avatars = [
//   'http://file01.yunjichina.com.cn/uploads/20180927/60d8343840746794f7ea099e1c76390f.jpg', // 云迹
//   'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
//   'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
//   'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
//   'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
//   'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
//   'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
//   'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
// ];

// const covers = [
//   'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
// ];
// const desc = [
//   '那是一种内在的东西， 他们到达不了，也无法触及的',
//   '希望是一个好东西，也许是最好的，好东西是不会消亡的',
//   '生命就像一盒巧克力，结果往往出人意料',
//   '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
//   '那时候我只会想自己想要什么，从不想自己拥有什么',
// ];
// const hrefs = [
//   'http://www.yunjichina.com.cn/c/index.html',
//   'https://www.angularjs.net.cn/',
//   'https://ant.design/index-cn',
//   'https://pro.ant.design/index-cn',
//   'https://www.bootcss.com/',
//   'https://www.reactjscn.com/'
// ];

// const user = [
//   '付小小',
//   '曲丽丽',
//   '林东东',
//   '周星星',
//   '吴加好',
//   '朱偏右',
//   '鱼酱',
//   '乐哥',
//   '谭小仪',
//   '仲尼',
// ];

// const describe = [
//   '云迹科技，机器人行业探索者，专注于商用服务机器人研发，产品涉及酒店机器人、迎宾机器人、讲解机器人、送餐机器人、机器人底盘等。',
//   'Angualr 是一款来自谷歌的开源的 web 前端框架，诞生于 2009 年，由 Misko Hevery 等 人创建，后为 Google 所收购。是一款优秀的前端 JS 框架，已经被用于 Google 的多款产品当中。',
//   '服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。',
//   'Ant Design Pro 是一个企业级中后台前端/设计解决方案，我们秉承 Ant Design 的设计价值观，致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。随着『设计者』的不断反馈，我们将持续迭代，逐步沉淀和总结出更多设计模式和相应的代码实现，阐述中后台产品模板/组件/业务场景的最佳实践，也十分期待你的参与和共建。',
//   'Bootstrap 是一套用于 HTML、CSS 和 JS 开发的开源工具集。利用我们提供的 Sass 变量和大量 mixin、响应式栅格系统、可扩展的预制组件、基于 jQuery 的强大的插件系统，能够快速为你的想法开发出原型或者构建整个 app 。',
//   'React是一个JavaScript库，因此它需要你熟悉JavaScript。如果你感觉还不够了解，我们建议看看MDN上有关JavaScript的内容，以便你学得更轻松。',
  
// ];


// function fakeList(count: number): CardListItemDataType[] {
//   const list = [];
//   for (let i = 0; i < count; i += 1) {
//     list.push({
//       id: `fake-list-${i}`,
//       owner: user[i % 10],
//       title: titles[i % 8],
//       avatar: avatars[i % 8],
//       cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
//       href: hrefs[i % 8],
//       status: ['active', 'exception', 'normal'][i % 3] as
//         | 'normal'
//         | 'exception'
//         | 'active'
//         | 'success',
//       percent: Math.ceil(Math.random() * 50) + 50,
//       logo: avatars[i % 8],
//       updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
//       createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
//       subDescription: desc[i % 5],
//       description: describe[i % 8],
//       activeUser: Math.ceil(Math.random() * 100000) + 100000,
//       newUser: Math.ceil(Math.random() * 1000) + 1000,
//       star: Math.ceil(Math.random() * 100) + 100,
//       like: Math.ceil(Math.random() * 100) + 100,
//       message: Math.ceil(Math.random() * 10) + 10,
//       content:
//         '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
//       members: [
//         {
//           avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
//           name: '曲丽丽',
//           id: 'member1',
//         },
//         {
//           avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
//           name: '王昭君',
//           id: 'member2',
//         },
//         {
//           avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
//           name: '董娜娜',
//           id: 'member3',
//         },
//       ],
//     });
//   }

//   return list;
// }

// function getFakeList(req: Request, res: Response) {
//   const params = req.query;

//   const count = params.count * 1 || 20;

//   const result = fakeList(count);
//   return res.json(result);
// }

// export default {
//   'GET  /api/fake_list': getFakeList,
// };
