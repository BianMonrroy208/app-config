import React, { Component } from 'react';
import { Nav } from "../../Components";
import { connect } from 'react-redux';
import { apiConfig } from '../../Api';
import {ToastsStore, ToastsContainer } from 'react-toasts';
class configTheme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {},
      success: false,
      coloPrim : "",
      coloHili : "",
      coloStba : ""
    }
  }

  async componentWillMount() {
    await JSON.stringify(this.props.config) !== "{}" ? this.setState({ config: this.props.config, success: true, }, () => 
    this.setState({ coloPrim : this.state.config.theme.coloPrim, coloHili : this.state.config.theme.coloHili, coloStba : this.state.config.theme.coloStba })) : window.location.href = "/home"
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })


  Inputs = () => {
    if (this.state.success) {
      const COLOR = Object.values(this.state.config.theme)
      const NOM = [['coloPrim', 'Color Primario'], ['coloHili', 'Color Secundario'], ['coloStba', 'Color Terciario']]
      return COLOR.map((theme, index) => {
        return <div className="col-md-12 mt-5">
              <label className="form-control">{NOM[index][1]}</label>
              <input key={index} type="color" name={NOM[index][0]} className="form-control" defaultValue={theme} onChange={this.onChange}/>
        </div>
      })

    }
  }

  onSubmit = async e => {
    e.preventDefault();
    this.state.config.theme = { coloPrim : this.state.coloPrim, coloHili : this.state.coloHili, coloStba : this.state.coloStba }
    await apiConfig.updateConfig(this.state.config).then(res => {
      if (res.id){
        ToastsStore.success("Se cambio los colores correctamente")
      }else{
        ToastsStore.error("Error al cambiar los colores")
      }
    })
  } 
  
  render() {
    return (
      <div>
        <Nav />
        <div className="jumbotron jumbotron-fluid mt-4 text-center">
        <div className="container">
          <h1 className="display-4">Opciones de Colores de la Aplicación</h1>
        </div>
      </div>
        <section className="container-fluid">
          <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-8">
              <div className="mt-4">
                <form onSubmit={this.onSubmit}>
                  {this.Inputs()}
                  <div className="col-md-12 mt-2 d-flex justify-content-end">
                    <button className="btn btn-success">Guardar</button>
                  </div>
                </form>
              </div>
            </section>
          </section>
        </section>
        <ToastsContainer store={ToastsStore}/>
      </div>
    );
  }
}

/**
 * -- @desc : funcion que carga los estado del store de redux
 */
const mapStateToProps = state => ({

  config: state.config

});


export default connect(
  mapStateToProps
)(configTheme);
