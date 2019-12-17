import React, { Component } from 'react';
import { Nav } from "../../Components";
import { connect } from 'react-redux';

class configTheme extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {},
      success: false,
    }
  }

  async componentWillMount() {
    await JSON.stringify(this.props.config) !== "{}" ? this.setState({ config: this.props.config, success: true, }) : window.location.href = "/home"
  }

  Inputs = () => {
    if (this.state.success) {
      const COLOR = Object.values(this.state.config.theme)
      const NOM = ['Color Primario', 'Color Secundario', 'Color Terciario']
      return COLOR.map((theme, index) => {
        return <div className="col-md-12 mt-5">
              <label className="form-control">{NOM[index]}</label>
              <input key={index} type="color" className="form-control" defaultValue={theme}/>
        </div>
      })

    }
  }


  

  render() {
    return (
      <div>
        <Nav />
        <h2 className="text-danger text-center mt-5">Esta es la configura de los titulos de la aplicación</h2>
        <section className="container-fluid">
          <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-8">
              <div className="mt-4">
                <form>
                  {this.Inputs()}
                </form>
              </div>
            </section>
          </section>
        </section>
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
