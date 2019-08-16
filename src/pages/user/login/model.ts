import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import { fakeAccountLogin  } from './service';//getFakeCaptcha
// import { getPageQuery, setAuthority } from './utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    // getCaptcha: Effect;//短信验证码登录
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log("这是model");
      const response = yield call(fakeAccountLogin, payload);
      console.log("这是model0");

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      console.log("这是model1");
      
      // Login successfully
      if (response.status === 'ok') {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = redirect;
        //     return;
        //   }
        // }
        yield put(routerRedux.push('/card/card-list'));
        location.reload();
      }

      
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(payload);//getFakeCaptcha, 
    // },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
