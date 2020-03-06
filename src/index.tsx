import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import '@css/index.scss';
import rootReducer from '@redux/rootReducer';
import { getEnv } from '@utils/utils';
import { Route, HashRouter as Router } from 'react-router-dom';
import Entry from '@views/index';
console.log('process.env.REACT_APP_URL', process.env.REACT_APP_URL)
console.log('process.env', process.env)

const { isPrd } = getEnv();
// redux store配置
const store = isPrd ? (
  createStore(rootReducer, applyMiddleware(thunk))
) : (
  window.__REDUX_DEVTOOLS_EXTENSION__ ? ( // 使用redux-devtools-extension进行开发调试
    createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
    // compose: 多函数组装成型函数 把复杂的多函数嵌套调用，组合成纯粹的函数调用，实现fn1(fn2(fn3(fn3(...args))))-->compose(fn1,fn2,fn3,fn4)(...args)这样单纯可读的函数调用方式
  ) : (
    createStore(rootReducer, applyMiddleware(thunk))
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={Entry} />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
