import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import asyncComponent from '@/tool/asyncComponent'
import { externalRoutes } from '@/router'

// import Login from "./login";
// import Layout from "../layout";

function App() {
  return (
    <Router>
      <Switch>
        {externalRoutes.map(item => (
          <Route path={item.path} component={item.component} exact={item.exact} key={item.path} />
        ))}
        <Route path='/*' component={asyncComponent(() => import('@/layout'))} />
      </Switch>
    </Router>
  )
}
export default App
