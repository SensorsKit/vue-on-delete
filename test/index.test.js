import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../example/Input'
import isDelete from '../src/isDelete'
import VueOnDelete from '../src'

const localVue = createLocalVue()
localVue.use(VueOnDelete)

describe('DOM测试', () => {
  test('输入框不为空时按下删除/退格键', () => {
    const wrapper = mount(Component, { localVue, attachToDocument: true })
    const input = wrapper.find('input')
    wrapper.setData({ value: '123' })
    input.trigger('focus')
    wrapper.setData({ value: '12' })
    // TODO 直接触发 keydown 无法触发 input 事件
    input.trigger('input')
    expect(wrapper.vm.count).toBe(1)
  })

  test('输入框为空时按下删除/退格键', () => {
    const wrapper = mount(Component, { localVue, attachToDocument: true })
    const input = wrapper.find('input')
    wrapper.setData({ value: '' })
    input.trigger('focus')
    wrapper.setData({ value: '' })
    input.trigger('input')
    expect(wrapper.vm.count).toBe(0)
  })

  // TODO 暂时没找到在 Jest 中选中文本的办法
  // test('输入框不为空时选中文本进行剪切操作', () => {
  //   const wrapper = mount(Component, { localVue, attachToDocument: true })
  //   const inputElement = wrapper.find('input').element
  //   inputElement.focus()
  //   wrapper.trigger('keydown', {
  //     which: 65,
  //   })
  //   wrapper.trigger('keydown', {
  //     which: 66,
  //   })
  //
  //   const range = window.createRange()
  //   range.selectNode(inputElement)
  //   const selection = window.getSelection()
  //   selection.removeAllRanges()
  //   selection.addRange(range)
  //
  //   wrapper.trigger('cut')
  //
  //   expect(wrapper.vm.count).toBe(1)
  // })
})

describe('逻辑测试', () => {
  test('新值是旧值的子集 - 右删除', () => {
    const before = '12345'
    const after = '1234'
    const result = isDelete(before, after)
    expect(result).toBe(true)
  })

  test('新值是旧值的子集 - 左删除', () => {
    const before = '12345'
    const after = '2345'
    const result = isDelete(before, after)
    expect(result).toBe(true)
  })

  test('新值是旧值的子集 - 中间删除', () => {
    const before = '12345'
    const after = '1245'
    const result = isDelete(before, after)
    expect(result).toBe(true)
  })


  test('新值不是旧值的子集 - 左侧增加', () => {
    const before = '12345'
    const after = '112345'
    const result = isDelete(before, after)
    expect(result).toBe(false)
  })


  test('新值不是旧值的子集 - 右侧增加', () => {
    const before = '12345'
    const after = '123455'
    const result = isDelete(before, after)
    expect(result).toBe(false)
  })

  test('新值不是旧值的子集 - 中间增加', () => {
    const before = '12345'
    const after = '12645'
    const result = isDelete(before, after)
    expect(result).toBe(false)
  })

  test('新值不是旧值的子集 - 位数增加', () => {
    const before = '12345'
    const after = '123645'
    const result = isDelete(before, after)
    expect(result).toBe(false)
  })
})
