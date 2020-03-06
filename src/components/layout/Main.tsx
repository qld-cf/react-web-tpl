import React from 'react'
import MyMenu from '@cps/layout/Menu'
import MyHeader from '@cps/layout/Header'
import { Layout, ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('en');

interface IProps {
  children: any;
}

const Main = (props: IProps) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <MyHeader />
        <Layout style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <MyMenu />
          <div className='contentChild' style={{}}>
            {props.children}
          </div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default Main
