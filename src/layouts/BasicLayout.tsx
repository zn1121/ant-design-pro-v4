/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';//这个是用户、搜索等
import { ConnectState, Dispatch } from '@/models/connect';
// import { isAntDesignPro } from '@/utils/utils';
import logo from '../assets/logo_sm_blue.svg';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

/**
 * use Authorized check all menu item
 */

const menuDataRender = (
  menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  }

);

const footerRender: BasicLayoutProps['footerRender'] = (_, defaultDom) => {
  // if (!isAntDesignPro()) {
  //   return defaultDom;
  // }
  return (
    <>
      {/* {defaultDom}蚂蚁金服的页脚 */}
      <div
        style={{
          padding: '40px 24px 24px',
          textAlign: 'center',
        }}
      >
        <p>Copyright &copy; 2018 北京云迹科技有限公司 京ICP备16000107号-1</p>
        <a href="http://www.yunjichina.com.cn/c/index.html" target="_blank" rel="noopener noreferrer">
          <img
            src="http://file01.yunjichina.com.cn/uploads/20180925/cae4073597fc2f10c28f6139ec5cb759.png"
            width="82px"
            alt="netlify logo"
          />
        </a>
      </div>
    </>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      // dispatch({
      //   type: 'settings/getSetting',
      // });
    }
  }, []);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}//实现菜单栏收起按钮的
      menuItemRender={(menuItemProps, defaultDom) => {//实现点击跳转连接的
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      // breadcrumbRender={(routers = []) => [  //面包屑导航条
      //   {
      //     path: '/',
      //     breadcrumbName: formatMessage({
      //       id: 'menu.home',
      //       defaultMessage: 'Home',
      //     }),   
      //   },
      //   ...routers,
      // ]}
      // itemRender={(route, params, routes, paths) => {//面包屑导航条
      //   const first = routes.indexOf(route) === 0;
      //   return first ? (
      //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
      //   ) : (
      //       <span>{route.breadcrumbName}</span>
      //     );
      // }}
      footerRender={footerRender}
      // menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}//这个是用户、搜索等s
      {...props}
      {...settings}
    >
      {children}
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
