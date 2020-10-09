import React from 'react'
import ReactDOM from 'react-dom'
import Root from './modules'
import * as serviceWorker from './serviceWorker'
import 'normalize.css/normalize.css'
import '@/assets/styles/antd4.less'

let userInfo
try {
  userInfo = JSON.parse(localStorage.getItem('userInfo'))
} catch {
  console.log('localStorage解析错误')
}

ReactDOM.render(<Root error={false} store={userInfo || {}} />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
