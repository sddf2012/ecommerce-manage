import {
  Message
} from 'element-ui'

function errMsg (msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 5 * 1000
  })
}

function warnMsg (msg) {
  Message({
    message: msg,
    type: 'warning',
    duration: 5 * 1000
  })
}

function successMsg (msg) {
  Message({
    message: msg,
    type: 'success',
    duration: 5 * 1000
  })
}

export {errMsg, successMsg, warnMsg}
