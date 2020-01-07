import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import { connect } from 'react-redux';
import { apiConfig } from "../../Api";
import { ToastsStore, ToastsContainer } from 'react-toasts';
/** =============================================================================
 * @author  Brayan Mauricio Monroy <ingeniero.desarrollo027@serviciosmarttmt.com>
 * @author  Samuel Londoño <ingeniero.desarrollo020@smarttmt.com>
 * @since  13.12.2019
 * @desc  Este componente es el que carga los titulos del cliente
 * ============================================================================= */

class configTitul extends Component {

  constructor(props) {
    super(props)
    this.state = {
      config: {},//Variable que recive el Json de el State de Store Redux de la configuación.
      success: false,//variable que valida se la petición si carga o no.
      spinner: false,//Variable que se utiliza para el sniper de carga
    }
  }
  /** =============================================================================
 * @since  13.12.2019
 * @desc  Este es el metodo que valida si llego bien la petición, si no lo hace se devuelve al login
 * ============================================================================= */
  async componentWillMount() {
    await JSON.stringify(this.props.config) !== "{}" ? this.setState({ config: this.props.config, success: true, }) : window.location.href = "/home"
  }

  /** =============================================================================
* @since  13.12.2019
* @desc  Este es el metodo que retorna todos los input con sus titulos correspondientes y su valor
* ============================================================================= */
  _getInputs = () => {

    const LIST = this.state.config.listPage // --- Se crea constante pata que guarde el Json que llega de el State de Store Redux

    if (this.state.success) { // --- Se valida si la el State de Success es verdadera para que asi carge los componentes 

      return LIST.map((item, index) => { // --- Se recorre todos los valores del objeto con el atributo map 
        return ( //Se retorna

          <div className="col-md-12 mt-5 " key={index}>

            <h4 className="display-5 text-secondary">{item.descPage}</h4>  { /**  --- Este es el item que trae todos los titulos de el objeto*/}

            <div className="col-md-12 mt-3 ">
              {item.listArea.map((list, index) => {
                {/** --- Se recorre otro valor dentro del mismo map para poder acceder al valor del objeto de el Json */ }
                return (
                  <div className="col-md-12 mt-5" key={index}>

                    <h5 className="text-secondary">{list.descArea}</h5> { /**  --- Este es el item que trae todos los Subtitulos de el objeto*/}

                    {list.listComp.map((list, index) => {
                      {/** --- Este es el item que trae todos los valores que se utilizaran e los inputs de el objeto  */ }

                      return (

                        <div key={index} className="form-group">

                          <label htmlFor="">{list.descComp}</label>
                          {
                            (!list.seleComp) ? /** -- Se valida si el componente tiene alguna valor */

                              <input type="text" className="form-control" id={list.codeComp} aria-describedby="emailHelp" defaultValue={(list.labeComp) ? list.labeComp : list.valuComp}

                              />
                              :

                              <div>
                                {list.seleComp.map((list, index) => { /** --Se le asigna los valores de los inputs  */



                                  return (
                                    <input type="text" className="form-control" id={list.codeComp} aria-describedby="emailHelp" key={index} defaultValue={list.labeSeit} />
                                  )

                                })}

                              </div>


                          }

                        </div>



                      )

                    })}

                  </div>
                )

              })}
            </div>

          </div>

        )
      })

    } else {
      return <div className="spinner-border text-white" style={{ height: 20, width: 20 }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
  }




  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ spinner: true })

    let config = this.state.config
    const url = "http://190.145.56.148:8090/confmobi/actucomo";
    let child = [...event.target.parentNode.parentNode.parentNode.childNodes[0]]
    // console.log(JSON.stringify(JSON.stringify(jsonGif)))

    let data = child.map((item, index) => {
      return item.value
    })

    let i = 0;
    for (const prop in config.listPage) {
      for (const pre in config.listPage[prop].listArea)
        for (const pri in config.listPage[prop].listArea[pre].listComp)
          if (config.listPage[prop].listArea[pre].listComp[pri].seleComp) {
            for (const sele in config.listPage[prop].listArea[pre].listComp[pri].seleComp) {
              config.listPage[prop].listArea[pre].listComp[pri].seleComp[sele].labeSeit = data[i]
              // console.log(config.listPage[prop].listArea[pre].listComp[pri].seleComp[sele]);
              i++;
            }
          }
          else {
            (config.listPage[prop].listArea[pre].listComp[pri].labeComp) ?
              config.listPage[prop].listArea[pre].listComp[pri].labeComp = data[i] :
              config.listPage[prop].listArea[pre].listComp[pri].valuComp = data[i]
            i++;
          }
    }

    console.log(config)

    //apiConfig.updateConfig(this.state.config).then(res => console.log(res))
    apiConfig.updateConfig(config).then(res => {
      if (res.id) {
        this.setState({ spinner: false })
        ToastsStore.success("Se actualizo correcatemente!")
      } else {
        this.setState({ spinner: false })
        ToastsStore.error("No se puedo actualizar Correctamente!")
      }
    })

  }

  render() {
    return (
      <div>
        <Nav />
        <div className="jumbotron jumbotron-fluid mt-4 text-center">
          <div className="container">
            <h1 className="display-4">Opciones de Tiulos de la Aplicación</h1>
          </div>
        </div>
        <section className="container-fluid">
          <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-8">
              <div className="mt-4">
                <form onSubmit={this._getConfig}>
                  {this._getInputs()}
                </form>
                <div className="col-md-12 mt-5 d-flex justify-content-end ">

                  <div className="form-group">
                    <button type="submit" className="btn btn-success" id="save" onClick={this.handleSubmit}>Guardar {(this.state.spinner) ? <div className="spinner-border text-white" style={{ height: 20, width: 20 }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null }</button>
                  </div>

                </div>
              </div>
            </section>
          </section>
        </section>
        <ToastsContainer store={ToastsStore} />
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
)(configTitul);
