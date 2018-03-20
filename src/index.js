const OnDeletePlugin = {}
const noop = () => { }
import isDelete from './isDelete'

const log = {
  e(...args) {
    console.error('[vue-on-delete]', ...args)
  }
}

OnDeletePlugin.install = function(Vue, options) {
  let strOld = ''
  let strNew = ''

  const onKeyDown = (el) => {
    strOld = el.value
  }

  const onKeyUp = (el, binding) => {
    strNew = el.value
    if (isDelete(strOld, strNew)) {
      binding.value()
    }
  }

  Vue.directive('on-delete', {
    bind(el, binding, vnode) {
      const onDelete = binding.value
      if (typeof onDelete !== 'function') {
        log.e('指令需要传入一个函数！')
        return
      }

      // 逻辑...
      el.addEventListener('keydown', function() {
        onKeyDown(el)
      }, false)
      el.addEventListener('keyup', function () {
        onKeyUp(el, binding)
      }, false)
    },

    update(el, binding, vnode, oldVnode) {

    },

    unbind(el, binding, vnode) {
      // 解除事件监听
      el.removeEventListener('keydown', function() {
        onKeyDown(el)
      }, false)
      el.removeEventListener('keyup', function () {
        onKeyUp(el, binding)
      }, false)
    }
  })
}

export default OnDeletePlugin
