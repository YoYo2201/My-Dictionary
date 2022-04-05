import React, { Component } from "react";
import icon from "./res/To Do icon.webp";
import { Link } from 'react-router-dom';
import "./SignUp.css";

export default class ChangePassword extends Component {
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
      this.props.navigate('/do-it', false);
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
          <p id="SignUpFont" style={{width: '336px'}}>Change Password</p></div>
          <div id="SignUpContainer">
          <form id="SignUp" action="/api/SignUp" autoComplete="current-password">
                <div className="form">
                  <label for="password">
                    <i className="password material-icons"></i>
                    <button
                    type="button"
                    id="show-password"
                    autoComplete="new-password"
                    onClick={() => this.props.passwordHandle('password', 1)}
                  >
                    <i className="showPassword material-icons">{this.props.state.password}</i>
                  </button>
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="Pass"
                    placeholder="Enter New Password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </div>
                <div className="form">
                  <label for="confirm-password">
                    <i className="password material-icons"></i>
                    <button
                    type="button"
                    id="show-password"
                    onClick={() => this.props.passwordHandle('confirm-password', 2)}
                  >
                    <i className="showPassword material-icons">{this.props.state.confirmPassword}</i>
                  </button>
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="Pass"
                    placeholder="Confirm Password"
                    minLength={8}
                    required
                  />
                </div>
                <div className="form">
                <button type="submit" name="submit" id="submit" class="form-submit" onClick={this.authenticate}>Confirm</button>
                </div>
          </form>
          </div>
      </div>
    );
  }
}
