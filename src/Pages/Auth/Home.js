import React, { Component } from 'react'
import Nav from "../../Components/Nav";
import { connect } from 'react-redux';
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
        config:[],
        }

    }
  
    render() {
        return (
            <div className="text-secondary">
                <Nav/>
                <h1 className="mt-4">Manual</h1>
            </div>
        )
    }
}




const mapStateToProps = state => ({

    login: state.login,
    config: state.config
  
  });
  
  
  export default connect(
    mapStateToProps
  )(Home);