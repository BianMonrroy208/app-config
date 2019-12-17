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

  Inputs = () => {

    if (this.state.success) {


 
      return this.state.config.listPage.map((item, index) => {

        return (

          <div className="col-md12 mt-5" key={index}>

            <h4 className="text-primary">{item.descPage}</h4>
            <div className="form-group">

              {item.listArea.map((list, index) => {

                return (

                  <div key={index} className="form-group">

                    <h5 className="text-info">{list.descArea}</h5>

                    {list.listComp.map((list, index) => {

                      return (

                        <div key={index} className="form-group">

                          <label htmlFor="">{list.descComp}</label>
                          {
                            (!list.seleComp) ?
                              <input type="text" className="form-control " defaultValue={(list.labeComp) ? list.labeComp : list.valuComp} />
                              :
                              <div className="form-group-">
                                {list.seleComp.map((list, index) => {
                                  return (
                                    <input key={index} type="text" className="form-control" defaultValue={list.labeSeit}></input>
                                  )
                                })}
                              </div>
                          }

                        </div>
                      )
                    })}
                  </div>
                )
              })
              }
            </div>
          </div>

        )
      })
    }
    else {
      return <div className="spinner-border text-white" style={{ height: 20, width: 20 }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
  }

  render() {
    return (
      <div>
      <Nav/>
      <h2 className="text-danger text-center mt-5">Esta es la configura de los titulos de la aplicación</h2>
        <section className="container-fluid">
          <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-8">
              <div className="mt-4">
                <form onSubmit={this._getConfig}>
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
)(configTitul);
