import React, { Component, useEffect } from "react";
import icon from "./res/dictionary.jpg";
import { Link } from "react-router-dom";
import "./SignUp.css";
import "./DoIt.css";
import Spinner from './Spinner';
import Alert from './Alert';
import data from './URL.json'
import AddPage from "./AddPage";
import TaskContainer from "./TaskContainer";

export default class DoIt extends Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    this.addTask = this.addTask.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.expandWord = this.expandWord.bind(this);
    this.shrinkWord = this.shrinkWord.bind(this);
    this.displayDictionary = this.displayDictionary.bind(this);
    this.state = {
      addActive: false,
    }
  }

  displayDictionary() {
    try {
    if(this.props.active[1] === true) {
      const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
      for(let i=0;i<arr.length;i++) {
        const task_cover = document.createElement("div");
        const task = document.createElement("div");
        const task_content = document.createElement("div");
        const task_font = document.createElement("p");
        const design = document.createElement("div");
        const button = document.createElement("button");
        const button_i = document.createElement("i");
        const task_contain = document.getElementById("TaskContain");
  
        task_cover.className = i;
        task.className = "Task";
        task_content.className = "TaskContent";
        task_font.className = "TaskFont";
        design.className = "design";
        button.className = "expandMore " + i;
        button_i.className = "expandMore material-icons " + i;
        button.type = "button";
  
        task_font.innerText = arr[i][0];
        task.id = i;
        button_i.style.color = "black";
        button_i.innerHTML = "&#xe5cf";
  
        button.onclick = () => this.expandWord(arr, i);
        button.append(task_font);
        button.appendChild(button_i);
        task.append(design);
        task_content.append(button);
        task.append(task_content);
        task_cover.append(task);
        task_contain.append(task_cover);
      }
  
        let TaskC = document.querySelectorAll(".Task");
    TaskC.forEach((Task) => {
      Task.style.width = window.innerWidth-25 + "px";
    });
    let TaskContentC = document.querySelectorAll('.TaskContent');
    TaskContentC.forEach((TaskContent) => {
      TaskContent.style.width = window.innerWidth-(25+12)+"px";
    })
    let TaskFontC = document.querySelectorAll('.TaskFont');
    TaskFontC.forEach((TaskFont) => {
      TaskFont.style.width = window.innerWidth-(25+12+38)+"px";
    })
  }
    }
    catch {
      ;
    }
  }

  expandWord(arr, i) {
    const task_covers = document.getElementsByClassName(i)
    const task_meaning = document.createElement("div");
    task_meaning.style.width = window.innerWidth-25 + "px";
    task_meaning.className = "TaskMeaning " + i;
    const task_font = document.createElement("p");
    task_font.className = "TaskFont1";
    task_font.innerText = arr[i][1];
    task_meaning.append(task_font);
    task_covers[0].append(task_meaning);
    task_covers[1].onclick = () => this.shrinkWord(arr, i);
    task_covers[2].innerHTML = "&#xe5ce";
  }

  shrinkWord(arr, i) {
    let task_covers = document.getElementsByClassName(i)
    task_covers[1].onclick = () => this.expandWord(arr, i);
    task_covers[2].innerHTML = "&#xe5cf";
    task_covers[3].remove();
  }

  async getTasks(Email) {
    const email = Email;
  
    let bg = document.getElementById('DoItBackground').style;
    const PORT = process.env.PORT || 4000;
    let url = process.env.NODE_ENV === 'production' ? 'https://mydictionary22.herokuapp.com/api/auth/getDictionary' : `${data.URL}:${PORT}/api/auth/getDictionary`
    bg.filter = 'blur(2px)';
    this.props.setStateData('load', true);
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }).then((res) => res.json());
  
    this.props.setStateData('load', false);
    bg.filter = '';
    if(result.status === "error") {
      this.props.alertFunc('danger', "Dictionary is Empty or Some Error Occurred!!!");
      this.props.active[0] = true;
    }
    else {
      localStorage.setItem(email+'Dictionary', JSON.stringify(result.status));
      this.props.active[1] = true;
      this.props.active[0] = true;
      this.removeDictionary();
      this.displayDictionary();
    }
  }

  setHeight() {
    try {
    let MainPage = document.getElementById("DoItBackground").style;
    let MainPageC = document.getElementById("DoItContainer").style;
    MainPage.width = window.innerWidth + "px";
    MainPage.height = window.innerHeight + "px";
    MainPageC.width = window.innerWidth + "px";
    let TaskContain = document.getElementById("TaskContain").style;
    TaskContain.height = window.innerHeight - 78 + "px";
    TaskContain.width = window.innerWidth + "px";
    }
    catch {
      ;
    }
  }

  removeDictionary() {
    try {
    const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
    for(let i=0;i<arr.length;i++) {
      let task_cover = document.getElementsByClassName(i);
      task_cover[0].remove();
    }
  }
  catch{
    ;
  }
  }

  addTask() {
    if(this.state.addActive)
    {
      this.setState({
        addActive: false,
      }, this.displayDictionary)
    }
    else
    {
    this.setState({
      addActive: true,
    }, this.removeDictionary)
  }
  }

  async SignUp(event) {
    event.preventDefault();
    this.props.navigate("/do-it", true);
  }

  authenticate() {
    const form = document.getElementById("SignUp");
    form.addEventListener("submit", this.SignUp);
  }

  logout() {
    this.props.navigate('\sign-in', true);
  }

  componentDidMount() {
    if(localStorage.getItem('Email'))
      this.props.data[1] = localStorage.getItem('Email');
    this.getTasks(this.props.data[1]);
  }

  render() {
    window.addEventListener("resize", this.setHeight);
    if(localStorage.getItem('Name'))
      this.props.data[0] = localStorage.getItem('Name');
    if(localStorage.getItem('Email'))
    this.props.data[1] = localStorage.getItem('Email');
    const name = this.props.data[0];
    const email = this.props.data[1];
    return (
      <>
      {this.props.state.load && <Spinner/>}
      <div
        id="DoItBackground"
        style={{
          height: window.innerHeight + "px",
          width: window.innerWidth + "px",
        }}
      >
        {this.props.state.alert !== null ? <Alert alert={this.props.state.alert}/> : undefined}
        <div id="DoItContainer" style={{ width: window.innerWidth + "px" }}>
          <img src={icon} alt="Icon" id="IconMain"></img>
          <p
            id="NameFont"
            style={{ width: window.innerWidth - (43 + 20 + 45) + "px" }}
          >
            Hi {name}
          </p>
          <button
            type="button"
            id="addIcon"
            onClick={this.addTask}
          >
            {this.state.addActive ? <i className="closeIcon material-icons"></i>: <i className="addIcon material-icons"></i>}
          </button>
          <button type="button" id="logout" onClick={this.logout}><i className="logout material-icons"></i></button>
        </div>
        <div
        id="TaskContain"
        style={{ height: window.innerHeight - 78 + "px", width: window.innerWidth+"px" }}
      >
      </div>
        {this.state.addActive === true ? <AddPage setHeight={this.setHeight} state={this.props.state} setData={this.props.setStateData} alertFunc={this.props.alertFunc} active={this.props.active} data={this.props.data}/> : undefined}
      </div>
      </>
    );
  }
}