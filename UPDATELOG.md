

###### 使用 ant design v4

1. 按需引入(webpack)

```
[
  require.resolve('babel-plugin-import'),
  { libraryName: 'antd', style: true },
  'antd'
]
```

###### moment.js转为day.js，减少打包体积

1. Install npm i antd-dayjs-webpack-plugin. 安装 antd-dayjs-webpack-plugin。
2. Add an instance of the plugin to the webpack plugin configuration. 更新 webpack 配置。

[参考](https://ant.design/docs/react/replace-moment-cn)
[参考](https://github.com/iamkun/dayjs)


###### TS ERROR

1. `Object is possibly 'undefined'` `Property 'merchantId' does not exist on type 'never`
注意类型约束: `somePropery: ReactNode | any` `item: any`


###### 多主题配置

1. webpack
```
// 新增
const lessRegex = /\.less$/;
```
// 应用
```
{
  test: lessRegex,
  // exclude: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 1,
      sourceMap: isEnvProduction && shouldUseSourceMap
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true
},
```
// loader

```
if (preProcessor === 'less-loader') { // 如果为less-loader则修改主题色
  loaders.push({
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: false,
      modifyVars: require('./antTheme').commonTheme,
      javascriptEnabled: true
    }
  });
}
```

2. 主题选择和配置(config/antTheme)

```
module.exports = {
  commonTheme: {
    'primary-color': '#A14EFF',
    'link-color': '#4a90e2',
    'font-family': '"futura-pt", sans-serif',
    'line-height-base': 1.3
  },
  otherTheme: {
    'primary-color': '#008B8B',
    'link-color': '#4a90e2',
    'font-family': '"futura-pt", sans-serif',
    'line-height-base': 1.3
  }
};

```