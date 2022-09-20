import React, { Component, useEffect } from "react";
import icon from "./res/dictionary.jpg";
import { Link } from "react-router-dom";
import "./SignUp.css";
import "./DoIt.css";
import Spinner from './Spinner';
import Alert from './Alert';
import data from './URL.json'
import AddPage from "./AddPage";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default class DoIt extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.setHeight = this.setHeight.bind(this);
    this.logout = this.logout.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.expandWord = this.expandWord.bind(this);
    this.shrinkWord = this.shrinkWord.bind(this);
    this.displayDictionary = this.displayDictionary.bind(this);
    this.searchForWord = this.searchForWord.bind(this);
    this.setAnimation = this.setAnimation.bind(this);
    this.clearAnimation = this.clearAnimation.bind(this);
    this.startScroll = this.startScroll.bind(this);
    this.stopScroll = this.stopScroll.bind(this);
    this.props.setStateData('popCount', 0);
    this.state = {
      addActive: false,
      scrollId: null,
      disableButton: true,
    }
    this.scrollActive = 0;
  }

  displayDictionary() {
    try {
    if(this.props.active[1] === true) {
      const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
      for(let i=0;i<arr.length;i++) {
        const task_cover = document.createElement("div");
        const task = document.createElement("div");
        const word = document.createElement("div");
        const task_content = document.createElement("div");
        const task_font = document.createElement("p");
        const meaning = document.createElement("h5");
        const button = document.createElement("button");
        const button_i = document.createElement("i");
        const task_contain = document.getElementById("TaskContain");
  
        task_cover.className = i;
        task.className = "card test-white bg-dark mb-3";
        word.className = "card-header";
        task_content.className = "card-body";
        task.style.maxWidth = "18rem";
        task_font.className = "TaskFont card-text";
        meaning.className = "card-title";
        button.className = "expandMore " + i;
        button_i.className = "expandMore material-icons " + i;
        button.type = "button";
  
        task_font.innerText = arr[i][0];
        task.id = "Task"+i;
        button_i.style.color = "white";
        button.style.display = 'flex';
        button_i.innerHTML = "&#xe5cf";
        // button
  
        button.onclick = () => this.expandWord(arr, i);
        button.append(task_font);
        button.appendChild(button_i);
        task_content.append(meaning);
        word.append(button);
        task.append(word);
        // task.append(task_content);
        task_cover.append(task);
        task_contain.append(task_cover);
      }
  
        let TaskC = document.querySelectorAll(".Task");
    TaskC.forEach((Task) => {
      if(window.innerWidth > 768)
        Task.style.width = (window.innerWidth/2)-25 + "px";
      else
        Task.style.width = (window.innerWidth)-25 + "px";
    });
    let TaskContentC = document.querySelectorAll('.TaskContent');
    TaskContentC.forEach((TaskContent) => {
      if(window.innerWidth > 768)
        TaskContent.style.width = (window.innerWidth/2)-(25+12)+"px";
      else
        TaskContent.style.width = (window.innerWidth)-(25+12)+"px";
    })
    let TaskFontC = document.querySelectorAll('.TaskFont');
    TaskFontC.forEach((TaskFont) => {
      if(window.innerWidth > 768)
        TaskFont.style.width = (window.innerWidth/6)-(25+12+38)+"px";
      else
        TaskFont.style.width = (window.innerWidth)-(25+12+38)+"px";
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
    if(window.innerWidth > 768)
      task_font.style.width = (window.innerWidth/2)-(25+12+28)+"px";
    else
      task_font.style.width = (window.innerWidth)-(25+12+28)+"px";
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
    // let MainPageC = document.getElementById("DoItContainer").style;
    MainPage.width = window.innerWidth + "px";
    MainPage.height = window.innerHeight + "px";
    // MainPageC.width = window.innerWidth + "px";
    let TaskContain = document.getElementById("TaskContain").style;
    TaskContain.height = window.innerHeight - 78 + "px";
    if(window.innerWidth <= 768)
      TaskContain.width = window.innerWidth + "px";
    else
      TaskContain.width = window.innerWidth/2 + "px";
      TaskContain.left = window.innerWidth/4+"px";
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

  logout() {
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');
    this.props.navigate('\sign-in', true);
  }

  setAnimation(element) {
    element.animationDuration = "0.9s";
    element.transitionTimingFunction = "ease-in";
    element.animationFillMode = "both";
    element.animationName = "fadeIn";
  }

  clearAnimation(element) {
    element.animationDuration = "";
    element.transitionTimingFunction = "";
    element.animationFillMode = "";
    element.animationName = "";
  }

  startScroll(scroll) {
    const interval = 10;
    var scrolled = 0;
    console.log(scroll)
    const task = document.getElementById("TaskContain");
    if(scroll > 0) {
    var id = setInterval(() => {
        task.scrollBy(0, 10);
        scrolled += 10
        if (scrolled >= scroll) {
            this.stopScroll();
        }
    }, interval);
  }
  else if(scroll < 0){
    var id = setInterval(() => {
      task.scrollBy(0, -10);
      scrolled -= 10
      if (scrolled <= scroll) {
          this.stopScroll();
      }
  }, interval);
  }
    return id;
}

stopScroll() {
    clearInterval(this.state.scrollId);
}

  searchForWord() {
    try {
    const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
    const search = document.getElementById('search').value;
    const task = document.getElementById("TaskContain");
    for(let i=0;i<arr.length;i++) {
      if(search.toLowerCase() === arr[i][0].toLowerCase()) {
        let word = document.getElementById("Task"+i).style;
        let blocksCount = Math.floor((window.innerHeight - 78)/59);
        if(((i*59)-task.scrollTop) < 0) {
          this.scrollActive = 1;
          this.setState({
            scrollId: this.startScroll((i*59)-task.scrollTop)
          });
        }
        else {
          const start = Math.ceil(task.scrollTop/59);
          const end = blocksCount+start-1;
          if((i >= start) && (i < end))
            this.scrollActive = 0;
          else {
            this.scrollActive = 1;
            this.setState({
              scrollId: this.startScroll(((i+1)*59)-task.scrollTop-(window.innerHeight-78)+8)
            });
          }
        }
        if(this.scrollActive === 0) {
        this.setAnimation(word);
        setTimeout(() => {
          this.clearAnimation(word);
        }, 300);
      }
      else {
        setTimeout(() => {
          this.setAnimation(word);
        }, 350);
        setTimeout(() => {
          this.clearAnimation(word);
        }, 300);
      }
        break;
      }
    }
  }
  catch {
    ;
  }
  }

  componentDidMount() {
    if(window.performance.navigation.type !== 0) {
      this.props.navigate('\do-it', true);
    }
    if(localStorage.getItem('Email'))
      this.props.data[1] = localStorage.getItem('Email');
    this.getTasks(this.props.data[1]);

    document.getElementById('search').addEventListener('keyup', (e) => {
      console.log("hello")
      let search = document.getElementById('search');
      if(search.value === "")
        this.setState({
          disableButton: true,
        })
      else
        this.setState({
          disableButton: false,
        })
    });
    
    window.onpopstate = () => {
      if(this.props.state.popCount === 0)
      {
        this.props.setStateData('popCount', 1);
        window.history.pushState({}, undefined, "");
        this.props.navigate(-1, true);
      }
    }
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
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> */}
  <img src={icon} alt="Icon" id="IconMain"></img>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03" style={{display: ''}}>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
      <p id="NameFont" style={{ width: window.innerWidth - (43 + 20 + 45) + "px" }}>
        {name}
      </p>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" id="searchButton">
      <input class="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search" style={{marginRight: "6px"}} required/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.searchForWord} disabled={this.state.disableButton}>Search</button>
      <button type="button" id="logout" onClick={this.logout}><i className="logout material-icons"></i></button>
    </form>
  </div>
</nav>
{this.props.state.alert !== null ? <Alert alert={this.props.state.alert}/> : undefined}
        <div
        id="TaskContain"
        style={{ maxHeight: window.innerHeight - 78 + "px", width: (window.innerWidth <= 768 ? window.innerWidth +"px" : window.innerWidth/2 +"px"), left: (window.innerWidth > 768) ? window.innerWidth/4+"px" : undefined}}
      >
      </div>
        {this.state.addActive === true ? <AddPage setHeight={this.setHeight} state={this.props.state} setData={this.props.setStateData} alertFunc={this.props.alertFunc} active={this.props.active} data={this.props.data}/> : undefined}
      </div>
      <Fab size="secondary" color="secondary" aria-label="add" onClick={this.addTask}>
        {this.state.addActive ? <i className="closeIcon material-icons"></i>: <AddIcon />}
      </Fab>
      </>
    );
  }
}