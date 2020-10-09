import React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, ...action.userInfo }
    case 'logout':
      return {}
    default:
      throw new Error('Unexpected action')
  }
}

const StoreContext = React.createContext()
export default StoreContext
export { reducer }
