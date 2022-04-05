import React, { Component } from "react";
import icon from "./res/To Do icon.webp";
import { Link } from 'react-router-dom';
import "./SignUp.css";
import "./SignIn.css"

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.authenticate = this.authenticate.bind(this);
        this.SignUp = this.SignUp.bind(this);
        this.props.setStateData({
          password: 'visibility',
          confirmPassword: 'visibility'
        })
    }

    async SignUp(event) {
      event.preventDefault();
      this.props.navigate('/otp', false);
    }

    authenticate() {
      const form = document.getElementById('SignUp')
      form.addEventListener('submit', this.SignUp)
    }

    componentDidMount() {
        this.props.alignForm();
        let SignUpC = document.getElementById('SignUpContainer').style;
        SignUpC.height = window.innerHeight - 60 - ((window.innerHeight/5)+72) + "px";
    }
  render() {
    window.addEventListener("resize", this.props.setHeight);
    return (
      <div
        id="DoItBackground"
        style={{
          height: window.innerHeight + "px",
          width: window.innerWidth + "px",
        }}
      >
        <div id="iconImageDo" style={{width: window.innerWidth+"px", height: (window.innerHeight/5)+57 + "px"}}>
          <img
            src={icon}
            id="iconDo"
            alt="Icon"
            style={{ height: window.innerHeight / 5 + "px", left: (window.innerWidth/2)-82+"px"}}
          ></img>
          <p id="SignUpFont">Sign In</p></div>
          <div id="SignUpContainer">
          <form id="SignUp" action="/api/SignIn">
                <div className="form">
                  <label for="email">
                    <i className="email material-icons"></i>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="form">
                  <label for="password">
                    <i className="password material-icons"></i>
                    <button
                    type="button"
                    id="show-password"
                    onClick={() => this.props.passwordHandle('password', 1)}
                  >
                    <i className="showPassword material-icons">{this.props.state.password}</i>
                  </button>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="Pass"
                    placeholder="Enter Password"
                    minLength={8}
                    required
                  />
                </div>
                <div className="form">
                <button type="submit" name="submit" id="submit" class="form-submit" onClick={this.authenticate}>Login</button>
                </div>
          </form>
          <div id="linkSignIn">
              <p id='SignInFont'>Forgot Password?<Link to="/forgot-password" className="signIn-visit" replace='false'>Click Here</Link></p>
          </div>
          <div id="linkSignIn">
              <p id='SignInFont'>Don't Have an Account?<Link to="/sign-up" className="signIn-visit" replace='true'>Create One</Link></p>
          </div>
          </div>
      </div>
    );
  }
}
