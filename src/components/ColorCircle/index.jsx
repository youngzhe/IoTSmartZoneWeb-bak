import React from 'react'

// typeof width === number
export default React.memo(props => {
  const { color, width = 6 } = props
  if (typeof width !== 'number') {
    throw new TypeError('width 必须是数字')
  }
  return (
    <div
      style={{
        width,
        height: width,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'inline-block',
        marginRight: 6,
      }}
    />
  )
})
