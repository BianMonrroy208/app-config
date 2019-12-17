import React, { Component } from 'react'

export default class Model extends Component {

    componentWillMount(){
        console.log(this.props.option)
    }

    render() {
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
                                    <input type="text" className="form-control" name="nombre" onChange={this.onChange} />
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
}

