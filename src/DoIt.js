import React, { Component } from "react";
import icon from "./res/To Do icon.webp";
import { Link } from "react-router-dom";
import "./SignUp.css";
import "./DoIt.css";
import AddPage from "./AddPage";
import TaskContainer from "./TaskContainer";

export default class DoIt extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.addTask = this.addTask.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.state = {
      addActive: false,
    }
  }

  setHeight() {
    let MainPage = document.getElementById("DoItBackground").style;
    let MainPageC = document.getElementById("DoItContainer").style;
    MainPage.width = window.innerWidth + "px";
    MainPage.height = window.innerHeight + "px";
    MainPageC.width = window.innerWidth + "px";
  }

  addTask() {
    // let bg = document.getElementById('DoItContainer').style;
    // let task = document.getElementById('TaskContain').style;
    // bg.filter = 'blur(2px)';
    // task.filter = 'blur(2px)';
    if(this.state.addActive)
    {
      this.setState({
        addActive: false,
      })
    }
    else
    {
    this.setState({
      addActive: true,
    })
  }
    // this.props.navigate('/addTask', false);
  }

  async SignUp(event) {
    event.preventDefault();
    this.props.navigate("/do-it", false);
  }

  authenticate() {
    const form = document.getElementById("SignUp");
    form.addEventListener("submit", this.SignUp);
  }

  componentDidMount() {
    
    // this.props.alignForm();
    // let SignUpC = document.getElementById('SignUpContainer').style;
    // SignUpC.height = window.innerHeight - 60 - ((window.innerHeight/5)+72) + "px";
  }

  render() {
    window.addEventListener("resize", this.setHeight);
    return (
      <>
      <div
        id="DoItBackground"
        style={{
          height: window.innerHeight + "px",
          width: window.innerWidth + "px",
        }}
      >
        {/* {this.state.addActive === true ? <AddPage/> : undefined} */}
        <div id="DoItContainer" style={{ width: window.innerWidth + "px" }}>
          <img src={icon} alt="Icon" id="IconMain"></img>
          <p
            id="NameFont"
            style={{ width: window.innerWidth - (43 + 20 + 45) + "px" }}
          >
            Hi Manas
          </p>
          <button
            type="button"
            id="addIcon"
            onClick={this.addTask}
          >
            {this.state.addActive ? <i className="closeIcon material-icons"></i>: <i className="addIcon material-icons"></i>}
          </button>
        </div>
        {this.state.addActive === true ? <AddPage setHeight={this.setHeight}/> : <TaskContainer setHeight={this.setHeight}/>}
      </div>
      </>
    );
  }
}