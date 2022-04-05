import React, { Component } from "react";
import icon from "./res/To Do icon.webp";
import { Link } from 'react-router-dom';
import "./SignUp.css";
import "./SignIn.css"
import SpinnerVerify from "./SpinnerVerify";
import './ForgotPassword.css'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.authenticate = this.authenticate.bind(this);
        this.SignUp = this.SignUp.bind(this);
        this.verifyIt = this.verifyIt.bind(this);
        this.props.setStateData({
          password: 'visibility',
          confirmPassword: 'visibility'
        })
        this.state = {disable: true, spinnerActive: false, verify: false};
    }

    async SignUp(event) {
      event.preventDefault();
      this.props.navigate('/change-password', false);
    // let spinState = this.state.spinnerActive;
    // this.setState({
    //     spinnerActive: !spinState});
    }

    verifyIt() {
      this.setState({
        verify: true
      })
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
          <p id="SignUpFont" style={{width: '321px'}}>Forgot Password</p></div>
          <div id="SignUpContainer">
          <form id="SignUp" action="/api/SignIn" autoComplete="off">
                <div className="form" id="verifyIt">
                  <label for="email">
                    <i className="email material-icons"></i>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Registered Email"
                    required
                  />
                  {this.state.spinnerActive === true ? <SpinnerVerify/> : this.state.verify === true ? <i class="verify material-icons"></i> : <button type="button" className="verify-forgot" onClick={this.verifyIt}>Verify</button>}
                </div>
                <div className="form">
                  <label for="password">
                    <i className="password material-icons"></i>
                    <button
                    type="button"
                    id="show-password"
                    disabled={this.state.disable}
                    onClick={() => this.props.passwordHandle('password', 1)}
                  >
                    <i className="showPassword material-icons">{this.props.state.password}</i>
                  </button>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="Pass"
                    placeholder="Enter OTP"
                    disabled={this.state.disable}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </div>
                <div className="form">
                <button type="submit" name="submit" id="submit" class="form-submit" onClick={this.authenticate}>Continue</button>
                </div>
          </form>
          </div>
      </div>
    );
  }
}