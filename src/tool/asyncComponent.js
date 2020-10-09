/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react'
import { Spin } from 'antd'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null,
      }
    }

    async componentDidMount() {
      if (this.hasLoadedComponent()) {
        return
      }
      const { default: component } = await importComponent()

      this.setState({
        component,
      })
    }

    hasLoadedComponent() {
      const { component } = this.state
      return component !== null
    }

    render() {
      // const C = this.state.component;
      const { component: C } = this.state

      return C ? (
        <C {...this.props} />
      ) : (
        <Spin spinning>
          <div style={{ width: 200, height: 200 }} />
        </Spin>
      )
    }
  }

  return AsyncComponent
}
