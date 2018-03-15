const OnDeletePlugin = {}
const noop = () => { }

const log = {
  e(...args) {
    console.error('[vue-on-delete]', ...args)
  }
}

OnDeletePlugin.install = function (Vue, options) {
  Vue.directive('on-delete', {
    bind(el, binding, vnode) {
      const onDelete = binding.value
      if (typeof onDelete !== 'function') {
        log.e('指令需要传入一个函数！')
        return
      }

      // 逻辑...
    },

    update(el, binding, vnode, oldVnode) {

    },

    unbind(el, binding, vnode) {
      // 解除事件监听
    }
  })
}

export default OnDeletePlugin
