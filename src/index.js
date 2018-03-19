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
  let _el = null
  let _binding = null

  const onKeyDown = () => {
    strOld = _el.value
  }

  const onKeyUp = () => {
    strNew = _el.value
    if (isDelete(strOld, strNew)) {
      _binding.value()
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
      _el = el
      _binding = binding
      el.addEventListener('keydown', onKeyDown, false)
      el.addEventListener('keyup', onKeyUp, false)
    },

    update(el, binding, vnode, oldVnode) {

    },

    unbind(el, binding, vnode) {
      // 解除事件监听
      el.removeEventListener('keydown', onKeyDown, false)
      el.removeEventListener('keyup', onKeyUp, false)
    }
  })
}

export default OnDeletePlugin
