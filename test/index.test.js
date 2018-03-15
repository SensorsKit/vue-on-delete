import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../example/Component'
import VueOnDelete from '../src'

const localVue = createLocalVue()
localVue.use(VueOnDelete)

describe('删除测试', () => {
  test('输入框不为空时按下删除/退格键', () => {
    const wrapper = mount(Component, { localVue })
    wrapper.find('input').trigger('click')
    wrapper.trigger('keydown', {
      which: 65
    })
    wrapper.trigger('keydown', {
      which: 66
    })
    wrapper.trigger('keydown.delete')

    expect(wrapper.vm.count).toBe(1)
  })

  test('输入框为空时按下删除/退格键', () => {
    const wrapper = mount(Component, { localVue })
    wrapper.find('input').trigger('click')
    wrapper.trigger('keydown.delete')

    expect(wrapper.vm.count).toBe(0)
  })
})
