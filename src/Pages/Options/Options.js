import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Model } from '../../Components'
import { apiOptions } from "../../Api";
class Options extends Component {
  state = {
    options: [],
    data: [],
    optionEdit: {},
  }

  async componentWillMount() {
    await apiOptions.getOptions("prueba03", 0).then(options => this.setState({ options }))
  }

  __getOptions() {
    return this.state.options.map((val, index) => {
      return (
        <tr>
          <td>{val.name}</td>
          <td>{val.typesucu}</td>
          <td>{val.address}</td>
          <td>{val.offiHour.map((offiHour) => `${offiHour} `)}</td>
          <td>{val.email}</td>
          <td>
            <button className="btn btn-danger">Eliminar</button>
          </td>
          <td>
            <a onClick={(event) => this.optionEdit(event, val)} role="button" data-toggle="modal" data-target="#modalCreateTable" className="btn btn-success">
              Editar
            </a>
          </td>
        </tr>
      )
    })
  }
  optionEdit(event, option) {
    this.setState({ optionEdit: option })
  }

  onSubmit = e => {

    e.preventDefault();
    let child = [...e.target.childNodes[0].childNodes];
    let option = this.state.optionEdit;
    let array = [];
    child.map((item, index) => {

      if (item.childNodes[1].childNodes.length > 1) {
        console.log(true);
      } else {
        switch (item.childNodes[1].name) {
          case "name":
            option.name = item.childNodes[1].value
            break;
          case "address":
            option.name = item.childNodes[1].value
            break;
          default:
            break;
        }
      }

    });

    console.log(option);



  }

  onModal = () => {
    return (
      <div className="modal fade" id="modalCreateTable" tabIndex="-1" role="dialog" aria-labelledby="modalCreateTable" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="text-dark">Nombre</label>
                  <input type="text" className="form-control" name="name" defaultValue={this.state.optionEdit.name} />
                </div>

                <div className="form-group">
                  <label className="text-dark">Tipo</label>
                  <input type="text" className="form-control" name="typesucu" defaultValue={this.state.optionEdit.typesucu} />
                </div>

                <div className="form-group">
                  <label className="text-dark">Direccion</label>
                  <input type="text" className="form-control" name="address" defaultValue={this.state.optionEdit.address} />
                </div>
                {
                  (this.state.optionEdit.offiHour) ?
                    (this.state.optionEdit.offiHour.length > 0) ?
                      <div>
                        <label className="text-dark">Telefonos</label>
                        <div className="form-group">
                          {
                            this.state.optionEdit.phone.map((val, index) =>
                              <input type="text" className="form-control" name={`phone`} defaultValue={val} />
                            )
                          }
                        </div>
                      </div>
                      : null
                    : null
                }
                {
                  (this.state.optionEdit.offiHour) ?
                    (this.state.optionEdit.offiHour.length > 0) ?
                      <div className="form-group">
                        <label className="text-dark">Horario de oficina</label>
                        {
                          this.state.optionEdit.offiHour.map((val, index) =>
                            <input type="text" className="form-control" name={`offiHour`} defaultValue={val} />
                          )
                        }
                      </div> : null
                    : null
                }
                <div className="form-group">
                  <label className="text-dark">Email</label>
                  <input type="text" className="form-control" name="email" defaultValue={this.state.optionEdit.email} />
                </div>
                <div className="form-group">
                  <label className="text-dark">Latitud</label>
                  <input type="text" className="form-control" name="latitud" defaultValue={this.state.optionEdit.latitude} />
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

  handleSubmit = (event) => {
    event.preventDefault()
    let inputOption = [...event.target.parentNode.parentNode.childNodes[2].childNodes]
    let data = inputOption.map((item, index) => {
      return item.childNodes[0].value
    })
    console.log(data, this.state.options)

  }

  render() {
    return (
      <div className="">
        <div className="container">
          <div className="jumbotron jumbotron-fluid mt-4">
            <div className="container d-flex justify-content-center">
              <h1 className="display-4">Opciones de pago</h1>
            </div>
          </div>
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
          {this.onModal()}
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