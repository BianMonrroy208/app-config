import React, { Component } from 'react';
import logo from "../Assets/Img/logo.png";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: [],

    }
  }

  render() {
    const { config } = this.props
    const COLORS = config.theme
    if(config.author){
      return (
        <nav className="navbar navbar-expand-lg navbar navbar-dark" style={{ background: COLORS.coloPrim }}>

          <img className="navbar-brand" alt={""} src={logo} width="200" height="50" />
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">Manual Uso<span className="sr-only">(current)</span></Link>
              </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Opciones Confg.
                    </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/configTitul">Titulos</Link>
                    <Link className="dropdown-item" to="/configTheme">Colores</Link>
                    <Link className="dropdown-item" to="/configImage">Imagen</Link>
                    <Link className="dropdown-item" to="/options">Puntos de Atención y de Pago</Link>
                  </div> 
                </li>
            </ul>
  
          </div>
        </nav>
      );
    }else {
      return <Redirect to="/"/>
    }
  }
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(
  mapStateToProps
)(Nav)
