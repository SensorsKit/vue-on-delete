const isDelete = function(Vue, options) {
  Vue.directive('on-delete', {
    bind(el, binding, vnode) {
      const onDelete = binding.value
      if (typeof onDelete !== 'function') {
        log.e('指令需要传入一个函数！')
        return
      }

      // 逻辑...
      let [strOld, strNew] = [null, null]
      // 按键触发前获取旧值
      const onKeyDown = () => {
        strOld = el.value
      }
      // 触发后获取新值
      const onKeyUp = () => {
        strNew = el.value
        const arrOld = strOld.split("")
        const arrNew = strNew.split("")
        let [indexLeft, indexRight] = [null, null]

        if (strOld === strNew || strOld.length < strNew.length) {
          return
        } else if (strOld.indexOf(strNew) >= 0) {
          binding.value()
        }

        for (let i = 0; i < arrNew.length; i++) {
          if (arrNew[i] !== arrOld[i]) {
            //记录左遍历第一次不相等字符的index
            indexLeft = i
            break
          }
        }

        for (let i = 1; i <= arrNew.length; i++) {
          if (arrNew[arrNew.length-i] !== arrOld[arrOld.length-i]) {
            //记录右遍历第一次不相等字符的index
            indexRight = arrNew.length-i
            break
          }
        }

        if (indexRight - indexLeft < 0 ) {
          binding.value()
        }
      }
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

export default isDelete
