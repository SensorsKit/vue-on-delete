const OnDeletePlugin = {}
const noop = () => { }
import isDelete from './isDelete'

const log = {
  e(...args) {
    console.error('[vue-on-delete]', ...args)
  }
}

OnDeletePlugin.install = isDelete

export default OnDeletePlugin
