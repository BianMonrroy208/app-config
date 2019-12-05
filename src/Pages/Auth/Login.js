import logo from "../../Assets/Img/smart.png";
import React, { Component } from 'react'
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            pass: "",
            personas: []
        }
        this.__onLogin = this.__onLogin.bind(this);

    }


    //Metodo de validación para de usuario y contraseña
    Validacion(event) {
        //alert("Si funciono"+this.state.personas);
        //alert("esto es: "+this.state.personas.map(persona => {persona.name}))
        /*
             {
                                    this.state.personas.length > 0 ? 
                                        this.state.personas.map((persona, index) => (
                                            <p>{persona.name}</p>
                                        ))
                                    : null
                                }
        */



    }


    __onLogin(event) {

        event.preventDefault();
        if (this.state.user === "" && this.state.pass === "") {
            alert("No a digitado Usuario/Contraseña")
        } else {
            axios.post("http://190.145.56.148:8091/usermana/authentiMobi", {
                "password": this.state.pass,
                "username": this.state.user
            })
                .then(res => {
                    console.log(res)
                }).catch(err => console.log(err))
        }
    }

    render() {


        return (
            <div>
                <section className="container-fluid">
                    <section className="row justify-content-center mt-5">
                        <section className="col-12 col-sm-6 col-md-3 mt-5">
                            <div className="mt-4">
                                <form onSubmit={this.__onLogin}>
                                    <img className="mb-4" src={logo} width="250" height="100" />
                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            onChange={(event) => this.setState({ user: event.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label >Contraseña</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1"
                                            onChange={(event) => this.setState({ pass: event.target.value })} />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                                </form>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
}

export default Home