##### 整合了最新的webpack4，alloy-eslint约束, ant design v4.0.0


- [x] react 16.12.0
- [x] react-router
- [x] redux，redux-thunk
- [x] hooks，typescript
- [x] antd v4，sass, less, dayjs
- [x] lodash，moment，uuid，js-cookie
- [x] suspense,lazy懒加载
- [x] axios antd主题切换

> 运行和打包

```
$ npm i
$ npm start
$ npm run build-dev // 测试打包
$ npm run build-prod // 正式打包
$ npm run analyze // 分析打包
$ npm run lint // eslint检查
```

#### 目录

```
|————config --------------------- 启动和打包配置
| |————webpack.config.js
|————eslintRule ----------------- eslint规则
|————scripts -------------------- 启动和打包脚本
| |————build-analyze.js --------- 文件分析
| |————build.js ----------------- 打包
| |————start.js ----------------- 运行
| |————test.js ------------------ 测试
|————src ------------------------
| |————api  --------------------- 业务逻辑层
| |————assets  ------------------ 全局公用文件
| | |————css  ------------------- css
| | |————images  ---------------- 图片
| | |————iconfont  -------------- 字体等
| |————common  ------------------ 全局通用常量
| |————components  -------------- 通用组件
| | |————common  ---------------- 子组件封装
| | | |————myList.tsx
| | | |————myForm.tsx
| | |————layout  ---------------- 布局
| | | |————header.tsx
| |————views  ------------------- 业务组件
| | |————settlement ------------- 业务模块
| | | |————Settlement.tsx
| | |————index.tsx -------------- 入口
| |————config ------------------- 全局配置
| | |————routerConfig.tsx  ------ 路由配置
| |————redux -------------------- redux
| | |————rootReducer.ts  -------- reducer集合
| | |————user.redux.ts  --------- state | action | reducer集成 | 按模块划分不同文件
| |————typings ------------------ 接口集合
| |————utils -------------------- 通用工具类
|————.eslintrc.js --------------- eslint自定义
|————.prettierrc.js ------------- prettier
|————README.MD ------------------ 项目描述文件
|————SETTINGS.MD ---------------- 运行配置介绍
```


##### alloy-eslint

参考SETTINGS.md

