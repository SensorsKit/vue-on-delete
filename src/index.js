const OnDeletePlugin = {}
const noop = () => {}
import isDelete from './isDelete'

const log = {
  e(...args) {
    console.error('[vue-on-delete]', ...args)
  }
}

OnDeletePlugin.install = function(Vue, options) {
  let strOld = null
  let strNew = null

  const onFocus = (el) => {
    strOld = el.value
  }

  const onInput = (el, binding) => {
    strNew = el.value
    if (isDelete(strOld, strNew)) {
      binding.value()
    }
    strOld = strNew
  }

  Vue.directive('on-delete', {
    bind(el, binding, vnode) {
      const onDelete = binding.value
      if (typeof onDelete !== 'function') {
        log.e('指令需要传入一个函数！')
        return
      }

      // 逻辑...
      el.addEventListener(
        'focus',
        function() {
          onFocus(el)
        },
        false
      )

      el.addEventListener(
        'input',
        function() {
          onInput(el, binding)
        },
        false
      )
    },

    update(el, binding, vnode, oldVnode) {},

    unbind(el, binding, vnode) {
      // 解除事件监听
      el.removeEventListener(
        'focus',
        function() {
          onFocus(el)
        },
        false
      )

      el.removeEventListener(
        'input',
        function() {
          onInput(el, binding)
        },
        false
      )
    }
  })
}

export default OnDeletePlugin
