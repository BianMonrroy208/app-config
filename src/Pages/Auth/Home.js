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
                <div className="jumbotron jumbotron-fluid mt-4 text-center">
                <div className="container">
                  <h1 className="display-4">Manual de uso de la Configuración</h1>
                </div>
              </div>
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