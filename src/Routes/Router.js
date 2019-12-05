import React from 'react';
import { BrowserRouter as  Switch, Route } from 'react-router-dom'
import { Home,Login } from "../Pages/Auth/index"

export default function Router() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/home" component={Home}></Route>
        </Switch>
    )
}
