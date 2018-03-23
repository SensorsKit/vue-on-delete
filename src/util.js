/**
 * 从 el 及其子元素中获取 input 原生元素
 * 如果 el 就是 input，直接返回
 */
export const getInputFromEl = el => {
  if (isInput(el)) {
    return el
  }

  if (el.tagName === 'DIV' && el.querySelector('input')) {
    return el.querySelector('input')
  }

  return null
}

export const isInput = el => el.tagName === 'INPUT'
