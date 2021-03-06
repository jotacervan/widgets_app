import React from "react"
import { Switch, Route } from "react-router-dom"

import Widget from "components/Widget"
import MyPage from "components/MyPage"
import UserPage from "components/UserPage"

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={Widget} />
      <Route path="/my_page" component={MyPage} />
      <Route path="/user/:id" component={UserPage} />
    </Switch>
  )
}
