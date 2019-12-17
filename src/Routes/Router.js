import React from 'react';
import { BrowserRouter as  Switch, Route } from 'react-router-dom'
import { Home,Login,configTitul,configTheme,configImage } from "../Pages/Auth"
import { Options } from '../Pages/Options'


function Router() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/home" component={Home}/>
            <Route exact path='/configTitul' component={configTitul}/>
            <Route exact path='/options' component={Options}/>
            <Route exact path='/configTheme' component={configTheme}/>
            <Route exact path='/configImage' component={configImage}/>
        </Switch>
    )
}
  
  export default Router;
