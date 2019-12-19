import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Model } from '../../Components'
import { apiOptions } from "../../Api";
import { ToastsContainer, ToastsStore } from 'react-toasts';
class Options extends Component {
  state = {
    options: [],
    data: [],
    optionEdit: {},
    phones: [<input type="text" className="form-control mb-2" name="phone" />],
    offiHour: [<input type="text" className="form-control mb-2" name="offiHour" />],
    typesucu: "1",

  }

  async componentWillMount() {
    await apiOptions.getOptions(this.props.config.client, 0).then(options => this.setState({ options })).catch((error) => console.log(error))
  }

  __getOptions() {

    if (this.state.options.length > 0)
      return this.state.options.map((val, index) => {
        return (
          <tr>
            <td>{val.name}</td>
            <td>{val.typesucu}</td>
            <td>{val.address}</td>
            <td>{val.offiHour.map((offiHour) => `${offiHour} `)}</td>
            <td>{val.email}</td>
            <td>
              <a className="btn btn-danger text-white" onClick={event => this.onDelete(event, val)}>Eliminar</a>
            </td>
            <td>
              <a onClick={(event) => this.optionEdit(event, val)} role="button" data-toggle="modal" data-target="#modal" className="btn btn-success text-white">
                Editar
                </a>
            </td>
          </tr>
        )
      })

    return <div className="spinner-border text-white" style={{ height: 20, width: 20 }} role="status">
      <span className="sr-only">Loading...</span>
    </div>

  }
  optionEdit(event, option) {
    this.setState({ optionEdit: option })
  }

  onDelete = async (e, option) => {
    e.preventDefault();
    let delOption = this.state.options.filter(val => val.id !== option.id);
    this.setState({ options: delOption }, () => apiOptions.delOption(option.id).then(ToastsStore.success("Se elimino correctamente!")))
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onChangeEdit = e => {
    let array = this.state.optionEdit;
    array.typesucu = e.target.value
    this.setState({ optionEdit: array })
  }

  onEdit = async e => {
    e.preventDefault();
    let child = [...e.target.childNodes[0].childNodes];
    let optionEdit = this.state.optionEdit;
    optionEdit.phone = [];
    optionEdit.offiHour = [];

    child.forEach(item => {
      if (item.childNodes[1].id == "offiHour") {
        item.childNodes[1].childNodes.forEach(offi => optionEdit.offiHour.push(offi.value))
      } else if (item.childNodes[1].id == "phone") {
        item.childNodes[1].childNodes.forEach(phone => optionEdit.phone.push(phone.value))
      } else {
        Object.keys(optionEdit).filter((option) => (option === item.childNodes[1].name) ? optionEdit[option] = item.childNodes[1].value : null)
      }
    });
    await apiOptions.updateOptions(optionEdit).then(res => {
      if (res.id) {
        window.$("#modal").modal("hide")
        ToastsStore.success("Se actualizo correctamente!")
        this.setState({ optionEdit })
      } else {
        ToastsStore.error("No se pudo actualizar correctamente!")
      }
    })
  }

  onModalEdit = () => {
    return (
      <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="text-dark">Nombre</label>
                  <input type="text" className="form-control" name="name" defaultValue={this.state.optionEdit.name} />
                </div>

                <div className="form-group">
                  <label className="text-dark">Tipo</label>
                  <select class="custom-select" name="typesucu" value={this.state.optionEdit.typesucu} onChange={this.onChangeEdit}>
                    <option value="1">Puntos de Atención</option>
                    <option value="2">Puntos de Pago</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-dark">Direccion</label>
                  <input type="text" className="form-control" name="address" defaultValue={this.state.optionEdit.address} />
                </div>
                {
                  (this.state.optionEdit.typesucu === "1") ?
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="text-dark">Telefono</label>
                        </div>
                        <div className="col-md-2">
                          <div className="row">
                            <i className="fas fa-plus-circle text-primary" onClick={() => {
                              let array = this.state.optionEdit
                              if (array.phone.length < 3) {
                                array.phone.push("")
                                this.setState({ optionEdit: array })
                              } else {
                                ToastsStore.error("Maximo tres telefonos")
                              }
                            }}></i>
                            <i className="ml-3 fas fa-minus-circle text-danger" onClick={() => {
                              let array = this.state.optionEdit
                              if (array.phone.length > 1) {
                                array.phone.pop()
                                this.setState({ optionEdit: array })
                              } else {
                                ToastsStore.error("Minimo un telefono")
                              }
                            }}></i>
                          </div>
                        </div>
                      </div>
                      <div id="phone">
                        {
                          (this.state.optionEdit.phone) ?
                            (this.state.optionEdit.phone.length > 0) ?
                              this.state.optionEdit.phone.map((val, index) =>
                                <input type="text" className="form-control mb-3" name={`phone`} defaultValue={val} />
                              )
                              : null
                            : null
                        }
                      </div>
                    </div> : null
                }
                {
                  (this.state.optionEdit.typesucu === "1") ?
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="text-dark">Horario de oficina</label>
                        </div>
                        <div className="col-md-2">
                          <div className="row">
                            <i className="fas fa-plus-circle text-primary" onClick={() => {
                               let array = this.state.optionEdit
                              if (array.offiHour.length < 3) {
                                array.offiHour.push("")
                                this.setState({ optionEdit: array })
                              } else {
                                ToastsStore.error("Maximo tres telefonos")
                              }
                            }}></i>
                            <i className="ml-3 fas fa-minus-circle text-danger" onClick={() => {
                              let array = this.state.optionEdit
                              if (array.offiHour.length > 1) {
                                array.offiHour.pop()
                                this.setState({ optionEdit: array })
                              } else {
                                ToastsStore.error("Minimo un telefono")
                              }
                            }}></i>
                          </div>
                        </div>
                      </div>
                      <div id="offiHour">
                        {
                          (this.state.optionEdit.offiHour) ?
                            (this.state.optionEdit.offiHour.length > 0) ?
                              this.state.optionEdit.offiHour.map((val, index) =>
                                <input type="text" className="form-control mb-3" name={`offiHour`} defaultValue={val} />
                              )
                              : null
                            : null
                        }
                      </div>
                    </div>
                    : null

                }
                {
                  (this.state.optionEdit.typesucu === "1") ?
                    <div className="form-group">
                      <label className="text-dark">Email</label>
                      <input type="text" className="form-control" name="email" defaultValue={this.state.optionEdit.email} />
                    </div> : null
                }
                <div className="form-group">
                  <label className="text-dark">Latitud</label>
                  <input type="text" className="form-control" name="latitude" defaultValue={this.state.optionEdit.latitude} />
                </div>
                <div className="form-group">
                  <label className="text-dark">Longitud</label>
                  <input type="text" className="form-control" name="longitud" defaultValue={this.state.optionEdit.longitud} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" className="btn btn-success" value="Editar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )

  }

  onSubmit = async e => {
    e.preventDefault();
    let child = [...e.target.childNodes[0].childNodes];
    let options = this.state.options;
    let newOption = {
      "address": "",
      "cliename": this.props.config.client,
      "email": "",
      "latitude": 0,
      "longitud": 0,
      "name": "",
      "offiHour": [],
      "phone": [],
      "typesucu": ""
    }

    child.forEach(item => {
      if (item.childNodes[1].id == "offiHour") {
        item.childNodes[1].childNodes.forEach(offi => newOption.offiHour.push(offi.value))
      } else if (item.childNodes[1].id == "phone") {
        item.childNodes[1].childNodes.forEach(phone => newOption.phone.push(phone.value))
      } else {
        Object.keys(newOption).filter((option) => (option === item.childNodes[1].name) ? newOption[option] = item.childNodes[1].value : null)
      }
    })


    await apiOptions.createOption(newOption).then(res => {

      if (res.id) {
        options.push(res)
        window.$("#modalCreate").modal("hide")
        ToastsStore.success("Se creo correctamente la opcion!")
        this.setState({ options })
      } else {
        ToastsStore.error("No se pudo crear la opcion")
      }
    })


  }

  onModalCreate = () => {
    return (
      <div className="modal fade" id="modalCreate" tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Crear {(this.state.typesucu === "1") ? "Puntos de Atención." : "Punto de Pago."}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="text-dark">Nombre</label>
                  <input type="text" className="form-control" name="name" />
                </div>

                <div className="form-group">
                  <label className="text-dark">Tipo</label>
                  <select class="custom-select" name="typesucu" onChange={this.onChange}>
                    <option value="1">Puntos de Atención</option>
                    <option value="2">Puntos de Pago</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="text-dark">Direccion</label>
                  <input type="text" className="form-control" name="address" />
                </div>
                {
                  (this.state.typesucu === "1") ?
                    <div className="form-group">
                      <label className="text-dark">Email</label>
                      <input type="text" className="form-control" name="email" />
                    </div>
                    : null
                }
                {
                  (this.state.typesucu === "1") ?
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="text-dark">Telefono</label>
                        </div>
                        <div className="col-md-2">
                          <div className="row">
                            <i className="fas fa-plus-circle text-primary" onClick={() => {
                              let array = this.state.phones
                              if (array.length < 3) {
                                array.push(<input type="text" className="form-control mb-2" name="phone" />)
                                this.setState({ phones: array })
                              } else {
                                ToastsStore.error("Maximo tres telefonos")
                              }
                            }}></i>
                            <i className="ml-3 fas fa-minus-circle text-danger" onClick={() => {
                              let array = this.state.phones
                              if (array.length > 1) {
                                array.pop()
                                this.setState({ phones: array })
                              } else {
                                ToastsStore.error("Minimo un telefono")
                              }
                            }}></i>
                          </div>
                        </div>
                      </div>
                      <div id="phone">
                        {this.state.phones.map(phone => phone)}
                      </div>
                    </div> : null
                }
                {
                  (this.state.typesucu === "1") ?
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-10">
                          <label className="text-dark">Horario de oficina</label>
                        </div>
                        <div className="col-md-2">
                          <div className="row">
                            <i className="fas fa-plus-circle text-primary" onClick={() => {
                              let array = this.state.offiHour
                              if (array.length < 3) {
                                array.push(<input type="text" className="form-control mb-2" name="phone" />)
                                this.setState({ offiHour: array })
                              } else {
                                ToastsStore.error("Maximo tres horarios")
                              }
                            }}></i>
                            <i className="ml-3 fas fa-minus-circle text-danger" onClick={() => {
                              let array = this.state.offiHour
                              if (array.length > 1) {
                                array.pop()
                                this.setState({ offiHour: array })
                              } else {
                                ToastsStore.error("Minimo un horario")
                              }
                            }}></i>
                          </div>
                        </div>
                      </div>
                      <div id="offiHour">
                        {this.state.offiHour.map(offi => offi)}
                      </div>
                    </div> : null
                }
                <div className="form-group">
                  <label className="text-dark">Latitud</label>
                  <input type="text" className="form-control" name="latitude" />
                </div>
                <div className="form-group">
                  <label className="text-dark">Longitud</label>
                  <input type="text" className="form-control" name="longitud" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <input type="submit" className="btn btn-primary" value="Crear" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let inputOption = [...event.target.parentNode.parentNode.childNodes[2].childNodes]
    let data = inputOption.map((item, index) => {
      return item.childNodes[0].value
    })
  }

  render() {
    return (
      <div className="">
        <Nav/>
        <div className="container">
          <div className="jumbotron jumbotron-fluid mt-4">
            <div className="container d-flex justify-content-center">
              <h1 className="display-4">Puntos de atención y pago</h1>
            </div>
          </div>
          <div className="col-md-12 d-flex justify-content-end mb-3">
            <a role="button" data-toggle="modal" data-target="#modalCreate" className="btn btn-primary text-white">Crear</a>
          </div>
          <div className="col-md-12">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Horario</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.__getOptions()}
              </tbody>
            </table>
          </div>
          {this.onModalEdit()}
          {this.onModalCreate()}
          <ToastsContainer store={ToastsStore} />
        </div>
      </div>
    );
  }
}

/**
 * @desc : Store Uer
 */

const mapStateToProps = state => ({
  user: state.user,
  config: state.config
})

export default connect(mapStateToProps)(
  Options
)
