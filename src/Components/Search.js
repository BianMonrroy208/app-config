import React from 'react';
import { setConfig, setLocalConfig } from '../Store/Reducers/Actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastsContainer, ToastsStore } from 'react-toasts';


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            config: [],
            client: "",
            area: [],
            reload: false,
        }
        this._getConfig = this._getConfig.bind(this)
    }
  

    async _getConfig(event) {
        event.preventDefault();
        this.setState({ reload: true })
        await this.props.setConfig(this.state.client)
        if (this.props.config.author) {
            const { context } = this.props;
            this.setState({ reload: false })
            context.props.history.push("/home")
            ToastsStore.success("Se cargo completamente")
        } else {
            ToastsStore.error("Error al cargar los datos, Cliente no valido")
            this.setState({ reload: false })
        }


    }


    render() {
        return (
            <div>

                <form onSubmit={this._getConfig}>
                    <div>
                        <div className={"col-12 mt-3 p-3"} style={{
                            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
                        }}>
                            <div className="form-group">
                                <label className="font-weight-dark" >Dijite su Usuario!</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                    onChange={(event) => this.setState({ client: event.target.value })} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-light border">Ir al menu de opciones {(this.state.reload) ? <div className="spinner-border text-dark" style={{ height: 20, width: 20 }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null}</button>
                    </div>
                        </div>
                        <ToastsContainer store={ToastsStore} />
                    </div> </form>
                <ToastsContainer store={ToastsStore} />
            </div>

        )
    }
}

/**
 * funcion que carga los estado del store de redux
 */
const mapStateToProps = state => ({

    config: state.config

});


/**
 * funcion que traer todas las funciones de la actions que usaremos en este page
 */
const mapDispatchToProps = dispatch => ({

    setConfig: bindActionCreators(setConfig, dispatch),
    setLocalConfig: bindActionCreators(setLocalConfig, dispatch)

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);