import React, { Component } from 'react';
import { Nav } from "../../Components";
import { connect } from 'react-redux';
import { apiConfig } from "../../Api";
import { ToastsStore, ToastsContainer } from 'react-toasts';

class configImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {},
            image: "",
            snipper: false
        }
        this.ImageUpload = this.ImageUpload.bind(this);
    }

    async componentWillMount() {
        await this.setState({ config: this.props.config, success: true, image: this.props.config.logo })
    }

    ImageUpload(e) {
        this.setState({ snipper: true })
        let files = e.target.files[0];
        let validate = (/\.(jpg|png|gif)$/i)
        if (!validate.test(files.name)) {
           ToastsStore.error("El archivo que escogio no es valido")
           this.setState({ snipper: false })
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(files)
            reader.onload = (e) => {
                this.setState({ image: e.target.result })
                this.props.config.logo = e.target.result;
                apiConfig.updateConfig(this.props.config).then(res => {
                    if (res.id) {
                        this.setState({ snipper: false })
                        ToastsStore.success("Se cambio la imagen correctamente!")
                    } else {
                        this.setState({ snipper: false })
                        ToastsStore.error("Error al cambiar la imagen")
                    }
                })
            }


        }
    }

    render() {
        return (
            <div className="text-center">
                <Nav />
                <div className="jumbotron jumbotron-fluid mt-4 text-center">
                    <div className="container">
                        <h1 className="display-4">Esta es la Configuración de La Imagen del Cliente</h1>
                    </div>
                </div>
                <img className="mt-5" style={{ width: "15%", height: "15%" }} src={this.state.image} />
                <div className="mt-5">
                    {(this.state.snipper) ? <div class="align-items-center">
                        <strong className="md-12">Subiendo Imagen...</strong>
                        <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                    </div> : null}
                    <section className="container-fluid">
                        <section className="row justify-content-center">
                            <section className="col-12 col-sm-6 col-md-8">
                                <div className="input-group mb-3">
                                    <form className={"w-100"}>
                                        <div className="custom-file col-md-12 mt-4">
                                            <input type="file" className="custom-file-input bg-danger" name="file" placeholder="Elige tu imagen" onChange={(e) => this.ImageUpload(e)} />
                                            <label className="custom-file-label" for="validatedCustomFile">Eligir imagen</label>

                                        </div>
                                    </form>
                                </div>
                            </section>
                        </section>
                    </section>
                    <ToastsContainer store={ToastsStore} />
                </div>
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
)(configImage);
