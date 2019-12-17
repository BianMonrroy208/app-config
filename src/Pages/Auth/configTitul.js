import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import { connect } from 'react-redux';

class configTitul extends Component {

  constructor(props) {
    super(props)
    this.state = {
      config: {},
      success: false,
      img: "",
    }
  }

  async componentWillMount() {

    await JSON.stringify(this.props.config) !== "{}" ? this.setState({ config: this.props.config, success: true, }) : window.location.href = "/home"

  }

  _getInputs = () => {

    const LIST = this.state.config.listPage

    // console.log(this.state.config);

    if (this.state.success) {

      return LIST.map((item, index) => {
        return (

          <div className="col-md-12 mt-5 " key={index}>

            <h4 className="display-5 text-secondary">{item.descPage}</h4>

            <div className="col-md-12 mt-3 ">
              {item.listArea.map((list, index) => {
                return (
                  <div className="col-md-12 mt-5" key={index}>

                    <h5 className="text-secondary">{list.descArea}</h5>

                    {list.listComp.map((list, index) => {

                      return (

                        <div key={index} className="form-group">

                          <label htmlFor="">{list.descComp}</label>
                          {
                            (!list.seleComp) ?

                              <input type="text" className="form-control" id={list.codeComp} aria-describedby="emailHelp" defaultValue={(list.labeComp) ? list.labeComp : list.valuComp}

                              />
                              :

                              <div>
                                {list.seleComp.map((list, index) => {



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
              // console.log(config.listPage[prop].listArea[pre].listComp[pri].seleComp[sele]); mk tene microfono ? ciclas contesta 
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
                    <button className="btn btn-danger mr-2" id="delete">Eliminar cliente</button>
                    <button type="submit" className="btn btn-success" id="save" onClick={this.handleSubmit}>Guardar
                    </button>
                  </div>

                </div>
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
)(configTitul);
