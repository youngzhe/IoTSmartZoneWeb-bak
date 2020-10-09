/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
import { Modal } from 'antd'
import * as React from 'react'
// import Export from "src/business/content.programEditor/Layout/L001/export";
import uuidv4 from 'uuid/v4'
import { isNil } from 'lodash'
import Control from '@/modules/ad/program/Control'
import Layout from '@/modules/ad/program/Layout'
import Mask from '@/modules/ad/program/Component/Mask'
import style from '@/modules/ad/program/style.module.less'

// 导入翻译语言方法

class PreviewModal extends React.Component {
  constructor(props) {
    super(props)
    this.maskId = `m${uuidv4()}`
    this.canvasId = `c${uuidv4()}`
  }

  renderMask = () => {
    const { data, editing, bound = {} } = this.props
    const selectedControl = data.getIn(['selectedControl'])
    const selectedSchedule = data.getIn(['controls', selectedControl, 'selectedSchedule'])
    const type = data.getIn(['controls', selectedControl, 'type'])
    const C = Control[type]
    if (C === undefined) {
      return null
    }
    const elementData = data.getIn(['controls', selectedControl, 'schedule', selectedSchedule, 'element'])

    if (elementData === undefined) {
      return null
    }
    const { iw, ih, x, y, ratio } = bound
    const cx = data.getIn(['controls', selectedControl, 'x'])
    const cy = data.getIn(['controls', selectedControl, 'y'])
    const cw = data.getIn(['controls', selectedControl, 'w'])
    const ch = data.getIn(['controls', selectedControl, 'h'])

    const vx = x + ratio * cx
    const vy = y + ratio * cy
    const vw = ratio * cw
    const vh = ratio * ch

    return editing ? <Mask x={0} y={0} w={iw} h={ih} vw={vw} vh={vh} vx={vx} vy={vy} id={this.maskId} /> : null
  }

  renderLayout = () => {
    const {
      data,
      bound = {},
      /*  selectedControl,
        selectedSchedule,
        editing,
        startEdit,
        selectControl,
        selectSchedule,
        bound = {}, */
    } = this.props
    const type = data.getIn(['layout']) || '000'
    const L = Layout[type]
    return L === undefined ? null : (
      <L.Export
        bound={bound}
        /* startEdit={startEdit}
        editing={editing} */
        data={data}
        isPreview
        layoutId={this.canvasId}
        /* layoutId={this.layoutId}
       selectedControl={selectedControl}
       selectedSchedule={selectedSchedule}
       selectControl={selectControl}
       selectSchedule={selectSchedule} */
      />
    )
  }

  /*  renderSVG = () => {
      const { bound } = this.props;
      const { iw, ih, w, h, x, y } = bound;
  
      return isNil(iw) || isNil(ih) ? null : (
        <svg
          viewBox={`0 0 ${iw} ${ih}`}
          className={style.inner}
          style={{ width: iw, height: ih }}
          id={this.canvasId}
        >
          <rect x="0" y="0" width={iw} height={ih} fill="transparent" />
          <defs>{this.renderMask()}</defs>
          <foreignObject width={w} height={h} x={x} y={y}>
            {this.renderLayout()}
          </foreignObject>
        </svg>
      );
    }; */
  renderSVG = () => {
    const { bound } = this.props
    const { /* iw, ih, */ w, h /* x, y */ } = bound

    return isNil(w) || isNil(h) ? null : (
      <svg viewBox={`0 0 ${w} ${h}`} className={style.inner} style={{ width: w, height: h }} id={this.canvasId}>
        <rect x='0' y='0' width={w} height={h} fill='transparent' />
        <defs>{this.renderMask()}</defs>
        <foreignObject width={w} height={h} x={0} y={0}>
          {this.renderLayout()}
        </foreignObject>
      </svg>
    )
  }

  render() {
    const { visible, handleCancel, bound, data } = this.props
    const audioSrc = data.getIn(['audio', 'url'])
    const { /* iw, ih, */ w } = bound
    return (
      <section className={style.graph}>
        <Modal
          title='内容预览'
          visible={visible}
          onOk={handleCancel}
          onCancel={handleCancel}
          destroyOnClose
          footer={null}
          width={w}
          className={style['preview-modal']}
        >
          {this.renderSVG()}
          {audioSrc ? <audio src={audioSrc} loop autoPlay /> : null}
        </Modal>
      </section>
    )
  }
}

export default PreviewModal
