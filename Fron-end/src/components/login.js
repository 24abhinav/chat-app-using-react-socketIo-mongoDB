import React, { Component } from 'react';
import '../scss/login.scss';
import genaralService from '../Services/general.service';
import Cookie from 'js-cookie';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            error: '',
            loginObject: {
                    email: '',
                    password: '',
                    name: ''
            },
        };

        // this binding
        this.login = this.login.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeUi = this.changeUi.bind(this);
    }

    changeHandler(e) {
        // this.state.loginObject[e.target.name] = e.target.value;
        // this.setState(state => {
        //     state.data[e.target.name] = e.target.value;
        // });
    }

    changeUi() {
        this.setState({
            isLogin: !this.state.isLogin
        });
    }

    async login(e) {
        e.preventDefault();
        if(!genaralService.validateEmail(this.state.loginObject.email)) {
            this.setState({
                error: 'Email is not valid!'
            });
            return;
        }
        let payload = this.state.loginObject;
        if(this.state.isLogin) {
            const response = await genaralService.post('SIGNIN', payload);
            if(response.Error) {
                this.setState({
                    error: response.error.response.data.message
                });
            } else {
                Cookie.set('S', response.response.data.token);
            }

        } else {
            const response = await genaralService.popst('SIGNUP', payload);
        }
    }

    async componentDidMount() {
        console.log(genaralService);
    }

    render() {
        return(
            <React.Fragment>
                <section>
                    <div className = "main-div">
                        {
                            this.state.isLogin ? 
                            <div className = "form">
                                <h6 className="error">{this.state.error}</h6>
                                <h1>Login With your Account !</h1>
                                <form onSubmit = {this.login}>
                                    <label>Email</label>
                                    <input type = "email" name= "email" onChange = {this.changeHandler} className="form-control" required/>

                                    <label>Password</label>
                                    <input type = "password" name = "password" onChange = {this.changeHandler} className="form-control" required autoComplete = "true"/>

                                    <div>
                                        <button type = "submit">Login</button>
                                        <button type = "button" onClick = {this.changeUi}>Sign Up</button>
                                    </div>
                                </form>
                            </div>
                            :
                            <div className = "form">
                                <h6 className="error">{this.state.error}</h6>
                                <h1>Create a new Account !</h1>
                                <form onSubmit = {this.login}>
                                    <label>Name</label>
                                    <input type = "text" name= "name" onChange = {this.changeHandler} className="form-control" required/>

                                    <label>Email</label>
                                    <input type = "email" name= "email" onChange = {this.changeHandler} className="form-control" required/>

                                    <label>Password</label>
                                    <input type = "password" name = "password" onChange = {this.changeHandler} className="form-control" required autoComplete = "true"/>

                                    <div>
                                        <button type = "submit">Sign Up</button>
                                        <button type = "button" onClick = {this.changeUi}>Login</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Login