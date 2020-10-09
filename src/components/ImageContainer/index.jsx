import React from 'react'

export default React.memo(props => {
  const { src, alt = '' } = props
  return <img src={src} alt={alt} style={{ width: 48, height: 48, objectFit: 'contain' }} />
})
