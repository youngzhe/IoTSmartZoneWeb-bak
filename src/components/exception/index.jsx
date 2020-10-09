// import Button from "antd/lib/button";
import * as React from 'react'
import classNames from 'classnames'
import imgUrl2 from '../../assets/exception/404.png'
import imgUrl3 from '../../assets/exception/500.png'
import imgUrl1 from '../../assets/exception/Empty_403@2x.png'
import style from './style.module.less'

class Exception extends React.PureComponent {
  render() {
    const wrapper = classNames(style['exception-wrapper'])
    const { type, myStyle = {} } = this.props
    return (
      <section className={wrapper} style={myStyle}>
        <div className={style['flex-wrapper']}>
          {type === 403 && (
            <div>
              <img src={imgUrl1} className={style['img-exception']} alt='401' />
              <h3 className={style['msg-exception']}>401 抱歉，您无权访问！</h3>
            </div>
          )}
          {type === 404 && (
            <div>
              <img src={imgUrl2} className={style['img-exception']} alt='404' />
              <h3 className={style['msg-exception']}>404 抱歉，您访问的页面不存在！</h3>
            </div>
          )}
          {type === 500 && (
            <div>
              <img src={imgUrl3} className={style['img-exception']} alt='500' />
              <h3 className={style['msg-exception']}>500 抱歉，服务器错误！</h3>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default Exception
