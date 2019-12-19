import React, { Component } from 'react';
import { Nav } from "../../Components";
import { connect } from 'react-redux';
import { apiConfig } from "../../Api";

class configImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            config: {},
            image: "",
        }
        this.ImageUpload = this.ImageUpload.bind(this);
    }
    async componentWillMount() {
        await this.setState({ config: this.props.config, success: true, image: this.props.config.logo })
    }

    ImageUpload(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            this.setState({ image: e.target.result })
            this.props.config.logo = e.target.result;
            apiConfig.updateConfig(this.props.config).then(res => console.log(res))
        }
    }

    render() {
        return (
            <div className="text-center">
                <Nav />
                <h1 className="text-center text-danger mt-5">Esta es la Configuración de La Imagen del Cliente</h1>
                <img className="mt-5" style={{ width: "15%", height: "15%" }} src={this.state.image} />
                <div className="mt-5">
                    <section className="container-fluid">
                        <section className="row justify-content-center">
                            <section className="col-12 col-sm-6 col-md-8">
                                <div className="input-group mb-3">
                                    <form className={"w-100"}>
                                        <div className="custom-file col-md-12">
                                            <input type="file" className="custom-file-input bg-danger" name="file" placeholder="Elige tu imagen" onChange={(e) => this.ImageUpload(e)} />
                                            <label class="custom-file-label" for="validatedCustomFile">Eligir imagen</label>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </section>
                    </section>
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
