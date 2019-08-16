import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { CardListItemDataType } from './data';
import { queryFakeList } from './service';
import { routerRedux } from 'dva/router';

export interface StateType {
  list: CardListItemDataType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listCardList',
  state: {
    list:[]
    // list: [
    //   { id: '1', href: 'http://www.yunjichina.com.cn/c/index.html', avatar: 'http://file01.yunjichina.com.cn/uploads/20180927/60d8343840746794f7ea099e1c76390f.jpg', title: '云迹科技', description: '云迹科技，机器人行业探索者，专注于商用服务机器人研发，产品涉及酒店机器人、迎宾机器人、讲解机器人、送餐机器人、机器人底盘等。' },
    //   { id: '2', href: 'https://www.angularjs.net.cn/', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', title: 'Angular', description: 'Angualr 是一款来自谷歌的开源的 web 前端框架，诞生于 2009 年，由 Misko Hevery 等 人创建，后为 Google 所收购。是一款优秀的前端 JS 框架，已经被用于 Google 的多款产品当中。' },
    //   { id: '3', href: 'https://ant.design/index-cn', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', title: 'Ant Design', description: '服务于企业级产品的设计体系，基于确定和自然的设计价值观上的模块化解决方案，让设计者和开发者专注于更好的用户体验。' },
    //   { id: '4', href: 'https://pro.ant.design/index-cn', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', title: 'Ant Design Pro', description: 'Ant Design Pro 是一个企业级中后台前端/设计解决方案，我们秉承 Ant Design 的设计价值观，致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。随着『设计者』的不断反馈，我们将持续迭代，逐步沉淀和总结出更多设计模式和相应的代码实现，阐述中后台产品模板/组件/业务场景的最佳实践，也十分期待你的参与和共建。' },
    //   { id: '5', href: 'https://www.bootcss.com/', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', title: 'Bootstrap', description: 'Bootstrap 是一套用于 HTML、CSS 和 JS 开发的开源工具集。利用我们提供的 Sass 变量和大量 mixin、响应式栅格系统、可扩展的预制组件、基于 jQuery 的强大的插件系统，能够快速为你的想法开发出原型或者构建整个 app 。' },
    //   { id: '6', href: 'https://www.reactjscn.com/', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', title: 'React', description: 'React是一个JavaScript库，因此它需要你熟悉JavaScript。如果你感觉还不够了解，我们建议看看MDN上有关JavaScript的内容，以便你学得更轻松。' },

    // ],
    
  },

  effects: {
    
    *fetch(_, { call, put }) {
      console.log("abc")
      const response = yield call(queryFakeList);
      if(response.status !== '401'){
        yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
        // payload:[]
        });
        console.log("response data",response.data)
      }else{
        yield put(routerRedux.push('/user/login'));
      }
      
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
