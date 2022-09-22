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
    // this.expandWord = this.expandWord.bind(this);
    // this.shrinkWord = this.shrinkWord.bind(this);
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
      AddButtonDisable: true,
      searchSymbol: null,
    }
    this.scrollActive = 0;
    // this.searchSymbol = null;
  }

  displayDictionary() {
    try {
    if(this.props.active[1] === true) {
      const taskContain = document.getElementById("TaskContain");
      if(JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary')).length) {
        taskContain.style.display = 'grid';
      }
      else
        taskContain.style.display = 'none';
      const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
      for(let i=0;i<arr.length;i++) {
        const card = document.createElement("div");
        const box = document.createElement("div");
        const content = document.createElement("div");
        const pCover = document.createElement("div");
        const h3_cover = document.createElement("div");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");
        const task_contain = document.getElementById("TaskContain");
  
        card.className = "card";
        box.className = "box";
        content.className = "content";
        pCover.className = "pCover";
        h3_cover.className = "hCover";
        // task.style.maxWidth = "20rem";
        // task_font.className = "TaskFont card-text";
        if(i+1 < 10)
          h2.innerText = "0"+(i+1);
        else
          h2.innerText = i+1;
        h3.innerText = arr[i][0];
        // task.id = "Task"+i;
        // task_content.append(meaning);
        p.innerText = arr[i][1];
        box.append(h2);
        h3_cover.append(h3);
        content.append(h3_cover);
        pCover.append(p);
        content.append(pCover);
        box.append(content);
        card.append(box);
        // task.append(task_content);
        // task_cover.append(task);
        task_contain.append(card);
      }
  
    //     let TaskC = document.querySelectorAll(".Task");
    // TaskC.forEach((Task) => {
    //   if(window.innerWidth > 768)
    //     Task.style.width = (window.innerWidth/2)-25 + "px";
    //   else
    //     Task.style.width = (window.innerWidth)-25 + "px";
    // });
    let TaskContentC = document.querySelectorAll('.TaskContent');
    TaskContentC.forEach((TaskContent) => {
      if(window.innerWidth > 768)
        TaskContent.style.width = (window.innerWidth/2)-(25+12)+"px";
      else
        TaskContent.style.width = (window.innerWidth)-(25+12)+"px";
    })
    // let TaskFontC = document.querySelectorAll('.TaskFont');
    // TaskFontC.forEach((TaskFont) => {
    //   if(window.innerWidth > 768)
    //     TaskFont.style.width = (window.innerWidth/6)-(25+12+38)+"px";
    //   else
    //     TaskFont.style.width = (window.innerWidth)-(25+12+38)+"px";
    // })
  }
    }
    catch {
      ;
    }
  }

  // expandWord(arr, i) {
  //   const task = document.getElementById("Task"+i);
  //   const task_content = document.createElement("div");
  //   const meaning = document.createElement("h5");
  //   const task_font = document.createElement("p");
  //   const button = document.getElementsByClassName("expandMore "+i);
  //   task_content.className = "card-body";
  //   meaning.className = "card-title";
  //   meaning.innerText = "Meaning: ";
  //   task_font.className = "card-text";
  //   task_font.innerText = arr[i][1];
  //   task_content.append(meaning);
  //   task_content.append(task_font);
  //   task.append(task_content);
  //   button[0].onclick = () => this.shrinkWord(arr, i);
  //   button[1].innerHTML = "&#xe5ce";
  // }

  // shrinkWord(arr, i) {
  //   let task_content = document.getElementsByClassName("card-body");
  //   const button = document.getElementsByClassName("expandMore "+i);
  //   button[0].onclick = () => this.expandWord(arr, i);
  //   button[1].innerHTML = "&#xe5cf";
  //   task_content[0].remove();
  // }

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
      this.props.alertFunc('danger', "Some Error Occurred!!!");
      this.props.active[0] = true;
    }
    else {
      localStorage.setItem(email+'Dictionary', JSON.stringify(result.status));
      this.props.active[1] = true;
      this.props.active[0] = true;
      this.removeDictionary();
      this.displayDictionary();
    }
    this.setState({
      AddButtonDisable: false,
    })
  }


  removeDictionary() {
    try {
    const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
    for(let i=0;i<arr.length;i++) {
      let card = document.querySelectorAll('.card');
      card.forEach((Card) => {
        Card.remove();
      })
    }
  }
  catch{
    ;
  }
  }

  addTask() {
    if(this.state.addActive)
    {
      document.getElementById('TaskContainer').style.display = "block";
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
    localStorage.removeItem(this.props.data[1]+'Dictionary');
    this.props.navigate('\sign-in', true);
  }

  setAnimation(element) {
    // element.animationDuration = "2.9s";
    element.transform = "translateY(-50px)";
    // element.transitionTimingFunction = "ease-in";
    // element.animationFillMode = "both";
    // element.animationName = "fadeIn";
  }

  clearAnimation(element) {
    // element.animationDuration = "";
    element.transform = "";
    // element.transitionTimingFunction = "";
    // element.animationFillMode = "";
    // element.animationName = "";
  }

  startScroll(scroll, word, card) {
    const interval = 1;
    var scrolled = 0;
    const task = document.getElementById("TaskContain");
    if(scroll > 0) {
    var id = setInterval(() => {
        task.scrollBy(0, 20);
        scrolled += 20
        if (scrolled >= scroll) {
            this.stopScroll(word, card);
        }
    }, interval);
  }
  else if(scroll < 0){
    var id = setInterval(() => {
      task.scrollBy(0, -20);
      scrolled -= 20
      if (scrolled <= scroll) {
          this.stopScroll(word, card);
      }
  }, interval);
  }
    return id;
}

stopScroll(word, card) {
    clearInterval(this.state.scrollId);
    setTimeout(() => {
      this.setAnimation(word);
      card.background = "#89a6ff";
    }, 200);
    setTimeout(() => {
      this.clearAnimation(word);
      card.background = "#232427";
    }, 650);
}

  searchForWord() {
    try {
    const arr = JSON.parse(localStorage.getItem(this.props.data[1]+'Dictionary'));
    const search = document.getElementById('search').value;
    const task = document.getElementById("TaskContain");
    var row = 0;
    var flag = false;
    for(let i=0;i<arr.length;i++) {
      if(search.toLowerCase() === arr[i][0].toLowerCase()) {
        flag = true;
        const elements = document.getElementsByClassName('box')
        const cards = document.getElementsByClassName('card')
        var word = elements[i].style;
        var card = cards[i].style;
        if(window.innerWidth <= 580)
          row = 1;
        else if((window.innerWidth > 580) && (window.innerWidth <= 1149))
          row = 2;
        else 
          row = 3;
        row = Math.floor(i/row);
        if(((row*369)-task.scrollTop) < 0) {
          this.scrollActive = 1;
          this.setState({
            scrollId: this.startScroll((row*369)-task.scrollTop, word, card)
          });
        }
        else if(((row*369)-task.scrollTop) > 0) {
            this.scrollActive = 1;
            this.setState({
              scrollId: this.startScroll((row*369)-task.scrollTop, word, card)
            });
        }
        else {
          this.scrollActive = 0;
        }

        if(this.scrollActive === 0) {
          setTimeout(() => {
            this.setAnimation(word);
            card.background = "#89a6ff";
          }, 200);
        setTimeout(() => {
          this.clearAnimation(word);
          card.background = "#232427";
        }, 650);
      }
        break;
      }
    }
    if(!flag)
      this.props.alertFunc('danger', "No Such Word Found!!!");
  }
  catch {
    ;
  }
  }

  componentDidMount() {
    if(window.performance.navigation.type !== 0) {
      if(localStorage.getItem('Email')) {
        this.props.navigate('/do-it', true);
      }
      else {
        this.props.navigate('/', true);
      }
    }
    if(localStorage.getItem('Email')) {
      this.props.data[1] = localStorage.getItem('Email');
      this.getTasks(this.props.data[1]);
    }
    else
      this.props.navigate('/', true);

    document.getElementById('search').addEventListener('keyup', (e) => {
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

    const TaskContainer = document.getElementById("TaskContainer").style;
    const TaskContain = document.getElementById('TaskContain').style;
    TaskContain.top = (window.innerHeight - 74)/8 + "px";
    TaskContain.maxHeight = ((window.innerHeight - 74) - (window.innerHeight - 74)/4) + "px";

    if(window.innerWidth > 768)
      this.setState({searchSymbol: false});
    else
      this.setState({searchSymbol: true});
    if(window.innerWidth <= 490) {
      TaskContainer.maxWidth = window.innerWidth+"px"
      TaskContain.width = TaskContainer.maxWidth;
      TaskContain.top = "20px";
      TaskContain.maxHeight = (window.innerHeight - 100) + "px";
    }
    else if((window.innerWidth > 490) && (window.innerWidth <= 768)) {
      TaskContain.width = window.innerWidth + "px";
      TaskContainer.maxWidth = window.innerWidth+"px"
      TaskContain.top = "20px";
      TaskContain.maxHeight = (window.innerHeight - 100)+"px";
    }
    else if((window.innerWidth > 768) && (window.innerWidth <= 840)) {
      TaskContainer.maxWidth = window.innerWidth/1.3+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else if((window.innerWidth > 840) && (window.innerWidth <= 920)) {
      TaskContainer.maxWidth = window.innerWidth/1.5+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else if((window.innerWidth > 920) && (window.innerWidth <= 1440)) {
      TaskContainer.maxWidth = window.innerWidth/1.7+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else {
      TaskContainer.maxWidth = window.innerWidth/1.9+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    
    window.onpopstate = () => {
      if(this.props.state.popCount === 0)
      {
        this.props.setStateData('popCount', 1);
        window.history.pushState({}, undefined, "");
        this.props.navigate(-1, true);
      }
    }
  }

  setHeight() {
    try {
    let MainPage = document.getElementById("DoItBackground").style;
    // let MainPageC = document.getElementById("DoItContainer").style;
    MainPage.width = window.innerWidth + "px";
    MainPage.height = window.innerHeight + "px";
    // MainPageC.width = window.innerWidth + "px";
    const TaskContainer = document.getElementById("TaskContainer").style;
    const TaskContain = document.getElementById('TaskContain').style;
    TaskContain.top = (window.innerHeight - 74)/8 + "px";
    TaskContain.maxHeight = ((window.innerHeight - 74) - (window.innerHeight - 74)/4) + "px";

    if(window.innerWidth > 768)
      this.setState({searchSymbol: false});
    else
      this.setState({searchSymbol: true});

    if(window.innerWidth <= 490) {
      TaskContainer.maxWidth = window.innerWidth+"px"
      TaskContain.width = window.innerWidth+"px";
      TaskContain.top = "20px";
      TaskContain.maxHeight = (window.innerHeight - 100) + "px";
    }
    else if((window.innerWidth > 490) && (window.innerWidth <= 768)) {
      TaskContain.width = window.innerWidth + "px";
      TaskContainer.maxWidth = window.innerWidth+"px"
      TaskContain.top = "20px";
      TaskContain.maxHeight = (window.innerHeight - 100)+"px";
    }
    else if((window.innerWidth > 768) && (window.innerWidth <= 840)) {
      TaskContainer.maxWidth = window.innerWidth/1.3+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else if((window.innerWidth > 840) && (window.innerWidth <= 920)) {
      TaskContainer.maxWidth = window.innerWidth/1.5+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else if((window.innerWidth > 920) && (window.innerWidth <= 1440)) {
      TaskContainer.maxWidth = window.innerWidth/1.7+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
    else {
      TaskContainer.maxWidth = window.innerWidth/1.9+"px"
      TaskContain.width = TaskContainer.maxWidth;
    }
  }
    catch {
      ;
    }
  }

  render() {
    window.addEventListener("resize", this.setHeight);
    if(localStorage.getItem('Name'))
      this.props.data[0] = localStorage.getItem('Name');
    if(localStorage.getItem('Email'))
      this.props.data[1] = localStorage.getItem('Email');
    else
      this.props.navigate('/', true);
    const name = this.props.data[0];
    const email = this.props.data[1];
    // if(window.innerWidth > 768)
    //   this.searchSymbol = false;
    // else
    //   this.searchSymbol = true;
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

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03" style={{display: 'flex'}}>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
      <p id="NameFont" style={{ width: window.innerWidth - (43 + 20 + 45) + "px" }}>
        {name}
      </p>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" id="searchButton">
      <input class="form-control mr-sm-2" id="search" type="search" placeholder="Search" aria-label="Search" style={{marginRight: (window.innerWidth <= 768 ? "27px" : "6px")}} required/>
      {!this.state.searchSymbol && <button class=" Searching btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.searchForWord} disabled={this.state.disableButton}>Search</button>}
      {this.state.searchSymbol && <button type="button" disabled={this.state.disableButton} onClick={this.searchForWord} className="Searching searchIcon"><span class="material-symbols-outlined">search</span></button>}
      <button type="button" id="logout" onClick={this.logout}><i className="logout material-icons"></i></button>
    </form>
  </div>
</nav>
{this.props.state.alert !== null ? <Alert alert={this.props.state.alert}/> : undefined}
<section id="TaskContainer">
  <div style={{display: 'flex'}}>
        <div
        id="TaskContain"
        style={{paddingRight: '23px'}}
        // style={{ maxHeight: window.innerHeight - 78 + "px", width: (window.innerWidth <= 768 ? window.innerWidth +"px" : (window.innerWidth/2) +"px"), left: (window.innerWidth > 768) ? window.innerWidth/4+"px" : undefined}}
      >
        {/* <div id="TaskCover"></div> */}
      </div>
      </div>
      </section>
        {this.state.addActive === true ? <AddPage setHeight={this.setHeight} state={this.props.state} setData={this.props.setStateData} alertFunc={this.props.alertFunc} active={this.props.active} data={this.props.data}/> : undefined}
      </div>
      <button class="MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeSecondary MuiFab-secondary css-1efuce" id="AddButton" tabindex="0" type="button" aria-label="add" disabled={this.state.AddButtonDisable} onClick={this.addTask}>
      {/* <Fab size="secondary" color="secondary" aria-label="add" onClick={this.addTask}> */}
        {this.state.addActive ? <i className="closeIcon material-icons"></i>: <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>}
        <span class="MuiTouchRipple-root css-w0pj6f"></span>
      {/* </Fab> */}
      </button>
      </>
    );
  }
}