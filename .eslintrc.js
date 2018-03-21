module.exports = {
  extends: ['standard'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // React: false,
    // jQuery: false,
    // $: false
  },
  rules: {
    semi: [2, 'never'],
    // @fixable 一个缩进必须用两个空格替代
    'space-before-function-paren': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ]
  }
}
