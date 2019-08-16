import { AnyAction, Reducer } from 'redux';
import { parse} from 'qs';//, stringify 

import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
// import { type } from 'os';
import { logout  } from '../services/user';

export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<{}>;
  };
}

const Model: ModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *logout({payload}, { call,put }) {//退出登录
      const response = yield call(logout,payload);
      yield put ({
        type:'changeLoginStatus',
        payload:response,
      })
      yield put(routerRedux.push('/user/login'));
      location.reload();
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
