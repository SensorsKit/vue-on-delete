import isDelete from './isDelete'

const OnDeletePlugin = {}
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

  if (typeof onDelete !== 'object' && typeof onDelete !== 'function') {
    log.e('指令需要传入一个函数或对象！')
    return
  } else if (typeof onDelete === 'object' && !onDelete.method) {
    log.e('指令对象必须包含method！')
    return
  }

  unbind(el)

  let strOld = el.value
  let strNew = null

  /**
   * ios 输入中文时 会触发多次 input 事件
   * compositionstart: 该事件在用户开始进行非直接输入的时候触发，而在非直接输入结束
   * compositionend: 该事件在用户输入完成点击候选词或确认按钮时触发
   * 当用户在上述两个事件之间时，表示未完成中文输入，还在候选词阶段，此时设置 isInputLocked 为 true
   */
  let isInputLocked = false

  const onFocus = () => {
    strOld = el.value
  }

  const onInput = () => {
    if (isInputLocked) {
      return
    }
    strNew = el.value
    if (isDelete(strOld, strNew)) {
      if (typeof onDelete === 'object' && onDelete.args) {
        onDelete.method(onDelete.args)
      } else if (typeof onDelete === 'object' && !onDelete.args) {
        onDelete.method()
      } else {
        onDelete()
      }
    }
    strOld = strNew
  }

  const onCompositionstart = () => {
    isInputLocked = true
  }
  const onCompositionend = () => {
    isInputLocked = false
  }

  registeredHandlers.push(
    on(el, 'focus', onFocus),
    on(el, 'input', onInput),
    on(el, 'compositionstart', onCompositionstart),
    on(el, 'compositionend', onCompositionend)
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
  if (binding.value.method === binding.oldValue.method) {
    return
  }
  bind(el, binding)
}

OnDeletePlugin.install = function(Vue, options) {
  const directiveName =
    options && options.directive ? options.directive : 'on-delete'
  Vue.directive(directiveName, {
    bind,
    update,
    unbind
  })
}

export default OnDeletePlugin
