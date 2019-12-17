import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav } from '../../Components'
import { apiOptions } from "../../Api";

class Options extends Component {
  state = {
    options: [],
    data: []
  }

  async componentWillMount() {
    await apiOptions.getOptions(this.props.config.client, 0).then(options => this.setState({ options }))
  }

  __getOptions() {
    return this.state.options.map((val, index) => {
      return (
        <div className="form-group" key={index}>
          <input type="text" name="" id={val.id} className="form-control" defaultValue={val.name} />
        </div>
      )
    })
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
        <Nav />
        <div className="container">
          <div className="jumbotron jumbotron-fluid mt-4">
            <div className="container">
              <h1 className="display-4">Opciones de pago</h1>
            </div>
          </div>
          <div className="col-md-12 mb-3 d-flex justify-content-end align-items-end">
            <button className="btn btn-success">Add</button>
          </div>
          <div className="inputOption">
            {this.__getOptions()}
          </div>
          <div className="form-group">
            <button className="btn btn-danger mr-2">Delete</button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
          </div>


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