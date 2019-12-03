import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from "./Routes/Router";
class App extends Component {
    componentWillMount() {
        
    }
    render() {
        return (
            <Router>
                <Routes/>
            </Router>
        )
    }
}

export default App
