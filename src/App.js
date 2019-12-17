import React, { Component } from 'react'
import { BrowserRouter as Router, } from 'react-router-dom'
import Routes from "./Routes/Router";
import { Provider } from 'react-redux';
import createStore from './Store';

class App extends Component {
    
    render() {
        const store = createStore();
        return (
            <Provider store={store}>
                <Router>
                    <Routes/>
                </Router>
            </Provider>
        )
    }
}

export default App
