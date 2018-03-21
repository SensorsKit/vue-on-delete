import isDelete from './isDelete'

const OnDeletePlugin = {}
const noop = () => {}
const registeredHandlers = []

const log = {
  e(...args) {
    console.error('[vue-on-delete]', ...args)
  }
}
const on = (el, eventName, callback) => {
  el.addEventListener(eventName, callback, false)
  return {
    el,
    destroy: () => el.removeEventListener(eventName, callback, false)
  }
}

const bind = (el, binding, vnode) => {
  const onDelete = binding.value

  if (typeof onDelete !== 'function') {
    log.e('指令需要传入一个函数！')
    return
  }

  unbind(el)

  let strOld = null
  let strNew = null

  const onFocus = () => {
    strOld = el.value
  }

  const onInput = () => {
    strNew = el.value
    if (isDelete(strOld, strNew)) {
      binding.value()
    }
    strOld = strNew
  }

  registeredHandlers.push(
    on(el, 'focus', onFocus),
    on(el, 'input', onInput)
  )
}

const unbind = el => {
  if (!registeredHandlers.length) {
    return
  }

  let index = registeredHandlers.length - 1

  while (index >= 0) {
    const handler = registeredHandlers[index]

    if (handler.el === el) {
      handler.destroy()
      registeredHandlers.splice(index, 1)
    }

    index -= 1
  }
}

const update = (el, binding) => {
  if (binding.value === binding.oldValue) {
    return
  }
  bind(el, binding)
}

OnDeletePlugin.install = function(Vue, options) {
  const directiveName = (options && options.directive) ? options.directive : 'on-delete'
  Vue.directive(directiveName, {
    bind,
    update,
    unbind
  })
}

export default OnDeletePlugin
