import { Card, List, Typography, Row, Col, message, Modal, Input, Button, Select, Icon } from 'antd';//Icon,Button,
import React, { Component } from 'react';
import { routerRedux } from 'dva/router';//负责页面跳转函数的

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { CardListItemDataType } from './data';
import styles from './style.less';
import Model from '@/pages/user/login/model';


const { Paragraph } = Typography;

interface CardListProps {
  listCardList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;

}
interface CardListState {
  visible: boolean;
  done: boolean;
  current?: Partial<CardListItemDataType>;
}

@connect(
  ({
    listCardList,
    loading,
  }: {
    listCardList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listCardList,
    loading: loading.models.list,
  }),
)

class CardList extends Component<
CardListProps,
CardListState
> {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'listCardList/fetch',
  //     payload: {
  //       count: 6,//这个是卡片的数量，如果不够重复显示
  //     },
  //   });
  // }
  componentWillMount() {
    console.log("生命周期");
    const { dispatch } = this.props;
    dispatch({      //代表推送登录
      type: 'listCardList/fetch',
      payload: {
      },
    });
  }
  componentDidUpdate() {//在请求完接口如果没有数据，则跳到登录页面
    // console.log("这是生命周期的函数。。。。",this.props.listCardList.list)
    if (this.props.listCardList.list.length == 0) {
      const modal = Modal.confirm;
      modal({
        title: '警告！警告！',
        content: '登录后才可以使用“欢迎“功能！',
        okText: '去登陆',
        cancelText:'还是去登陆',
        icon: <Icon type="exclamation-circle" />,
        onOk: () => {    // 点击'是',处理一些业务在跳转
          this.props.dispatch(routerRedux.push('/user/login'));
        },
        onCancel:() => {    // 点击 ‘否’，说明用户不想做任何事情，直接跳转
          this.props.dispatch(routerRedux.push('/user/login'));
        },
      })
    }
  }
  render() {
    const {
      listCardList: { list },
      // loading,
    } = this.props;

    // const content = (
    //   <div className={styles.pageHeaderContent}>
    //     <p>
    //       段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
    //       提供跨越设计与开发的体验解决方案。
    //     </p>
    //     <div className={styles.contentLink}>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
    //         快速开始
    //       </a>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
    //         产品简介
    //       </a>
    //       <a>
    //         <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
    //         产品文档
    //       </a>
    //     </div>
    //   </div>
    // );

    // const extraContent = (
    //   <div className={styles.extraImg}>
    //     <img
    //       alt="这是一个标题"
    //       src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    //     />
    //   </div>
    // );
    // const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageHeaderWrapper >
        {/* content={content} extraContent={extraContent} */}
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            // loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...list]}//nullData, 
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                    // actions={[<a key="option1">操作一</a>, <a key="option2">操作二</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        // 这个是图片
                        title={<a href={item.href}>{item.title}</a>}
                        // 这个是标题文字
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                            {/* 这个是简介文字 */}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              // return (
              //   <List.Item>
              //     <Button type="dashed" className={styles.newButton}>
              //       <Icon type="plus" /> 新增门户网站
              //     </Button>
              //   </List.Item>
              // );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CardList;
