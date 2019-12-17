import React, { Component } from 'react';
import { Nav } from "../../Components";
import { connect } from 'react-redux';

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
        await JSON.stringify(this.props.config) !== "{}" ?
            this.setState({ config: this.props.config, success: true, image: this.props.config.logo }) :
            window.location.href = "/home"
    }

    ImageUpload(e) {
        //e.preventDefault();
        let files = e.target.files;
        //console.log(files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            // e.target.result
            this.setState({image:e.target.result})
            console.log(this.state.image);
        }
    }

    render() {
        return (
            <div className="text-center">
                <Nav />
                <h1 className="text-center text-danger mt-5">Esta es la Configuración de La Imagen del Cliente</h1>
                <img className="mt-5" src={this.state.image} />
                <div className="mt-5">
                    <section className="container-fluid">
                        <section className="row justify-content-center">
                            <section className="col-12 col-sm-6 col-md-8">
                                <div className="input-group mb-3">
                                    <div className="custom-file">
                                        <form>
                                            <input type="file" className="custom-file-input" name="file" onChange={(e) => this.ImageUpload(e)} />
                                            <label className="custom-file-label">Elije la Imagen</label>
                                        </form>
                                    </div>
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
