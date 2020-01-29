import React from "react"
import { Switch, Route } from "react-router-dom"

import Widget from "components/Widget"

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={Widget} />
    </Switch>
  )
}
