import logo from "../../Assets/Img/smart.png";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiUser } from "../../Api";
import { setUser } from '../../Store/Reducers/Actions/Actions';
import { bindActionCreators } from "redux";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { Search } from '../../Components'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "mobile",
            pass: "Ph2030160",
            resul: [],
            success: false,
            reload: false,
            mensaje: false
        }
        this.__onLogin = this.__onLogin.bind(this);
    }


    // --- Functions
    __onLogin(event) {
        event.preventDefault();
        if (this.state.success == true) {
            ToastsStore.warning("Ya inicio sesión")
        } else {

            this.setState({ reload: true })
            if (this.state.user === "" && this.state.pass === "") {
                ToastsStore.error("No a digitado Usuario/Contraseña")
            } else {
                apiUser.getLogin(this.state.user, this.state.pass).then(user => {
                    if (user.usuario) {
                        this.setState({ success: true, reload: false }, () => {
                            this.props.setUser(user)
                            ToastsStore.success("Correcto!")
                        })
                        // setTimeout(() => this.props.history.push("/home"), 1000)
                    } else {
                        this.setState({ success: false, reload: false }, () => {
                            ToastsStore.error("Usuario invalido!")
                        })
                    }
                })
                    .catch(err =>
                        (err) ? this.setState({ success: false }) : null
                    )
            }
        }

    }

    // --- Render
    render() {

        return (
            <section className="container-fluid">
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-sm-6 col-md-3 mt-3">
                        <form onSubmit={this.__onLogin} className={"col-12 p-3"} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" }}>
                            <img className="mb-4" alt={""} src={logo} width="250" height="100" />
                            <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" className="form-control"
                                    onChange={(event) => this.setState({ user: event.target.value })} />
                            </div>
                            <div className="form-group">
                                <label >Contraseña</label>
                                <input type="password" className="form-control"
                                    onChange={(event) => this.setState({ pass: event.target.value })} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión {(this.state.reload) ? <div className="spinner-border text-white" style={{ height: 20, width: 20 }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : null}</button>
                            </div>
                        </form>
                        {/** Client Input Search  //  Cliente a buscar*/}
                        {this.state.success && <Search context={this} />}
                    </div>
                </div>
                <ToastsContainer store={ToastsStore} />
            </section>
        )
    }
}

/**
 * @desc : Store Uer
 */

const mapStateToProps = state => ({
    user: state.user,
    config: state.config
})

const mapDispatchToProps = dispatch => ({
    setUser: bindActionCreators(setUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)