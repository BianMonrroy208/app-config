import React from 'react';
import { BrowserRouter as  Switch, Route } from 'react-router-dom'
import { Home,Login,configTitul,configTheme,configImage } from "../Pages/Auth"
import { Options } from '../Pages/Options'


function Router() {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/home" component={Home}/>
            <Route path='/configTitul' component={configTitul}/>
            <Route path='/options' component={Options}/>
            <Route path='/configTheme' component={configTheme}/>
            <Route path='/configImage' component={configImage}/>
        </Switch>
    )
}
  
  export default Router;
