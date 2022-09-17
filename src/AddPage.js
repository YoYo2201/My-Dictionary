import React, { Component } from 'react'
import './AddPage.css'
import Alert from './Alert';
import Spinner from "./Spinner";
import data from './URL.json'

export default class AddPage extends Component {
    constructor(props){
        super(props);
        this.setHeight = this.setHeight.bind(this);
        this.addPage = this.addPage.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    async addPage(event) {
      event.preventDefault();
      const word = document.getElementById('name').value;
      const meaning = document.getElementById('description').value;
      const email = this.props.data[1];
      console.log("email: "+email);

      let bg = document.getElementById('DoItBackground').style;
      const PORT = process.env.PORT || 4000;
      let url = process.env.NODE_ENV === 'production' ? 'https://mydictionary22.herokuapp.com/api/auth/addPage' : `${data.URL}:${PORT}/api/auth/addPage`
      bg.filter = 'blur(2px)';
      this.props.setData('load', true);
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          word,
          meaning
        }),
      }).then((res) => res.json());

      this.props.setData('load', false);
      bg.filter = '';
      if (result.status === "ok") {
        this.props.alertFunc('success', 'Word Added Successfully!!!');
        var a = [word, meaning];
        var b = JSON.parse(localStorage.getItem(email+'Dictionary'));
        b.splice(b.length, 0, a);
        if(!b) {
          localStorage.setItem(email+'Dictionary', JSON.stringify(a));
          this.props.active[1] = true;
        }
        else {
          localStorage.setItem(email+'Dictionary', JSON.stringify(b));
        }
      } else if(result.status === "Exists"){
        this.props.alertFunc('danger', "Word Already Exists!!!");
      }
      else if(result.status === "error")
        this.props.alertFunc('danger', "Unable to Add Word!!!");
    }

    authenticate() {
      const form = document.getElementById('AddTask')
      form.addEventListener('submit', this.addPage)
    }

    componentDidMount() {
        let add = document.getElementById('AddPage').style;
        let addPage = document.getElementById('AddPageContainer').style
        add.width = window.innerWidth/1.3+"px";
        add.height = window.innerHeight+"px";
        addPage.width = window.innerWidth/1.3+"px";
        addPage.height = window.innerHeight+"px";
        addPage.left = (window.innerWidth-(window.innerWidth/1.3))/2+"px"
    }

    setHeight() {
        try{
        let add = document.getElementById('AddPage').style;
        let addPage = document.getElementById('AddPageContainer').style
        add.width = window.innerWidth/1.3+"px";
        add.height = window.innerHeight-(75+105)+"px";
        addPage.width = window.innerWidth/1.3+"px";
        addPage.height = window.innerHeight+"px";
        addPage.left = (window.innerWidth-(window.innerWidth/1.3))/2+"px"
        }
        catch{
            ;
        }
      }

  render() {
    window.addEventListener("resize", this.setHeight);
    return (
      <>
      {this.props.state.load && <Spinner/>}
        <div id='AddPageContainer' style={{display: 'block', position: 'absolute', top: '60px'}}>
        {this.props.state.alert !== null ? <Alert alert={this.props.state.alert}/> : undefined}
        <p id='AddFont'>Add Word</p>
      <div id='AddPage'>
          <form id="AddTask" autoComplete="off">
          <div className="AddForm">
                  <input
                    type="text"
                    id="name"
                    className='AddPageInput'
                    placeholder="Enter the Word"
                    required
                  />
                </div>
                <div className="AddForm">
                  <textarea
                    type="text"
                    id="description"
                    className='AddPageInput'
                    placeholder="Enter the Meaning"
                    required
                  />
                </div>
                <div className="AddForm">
                <button type="submit" name="submit" id="submit" class="form-submit" onClick={this.authenticate}>Add</button>
                </div>
          </form>
      </div>
      </div>
      </>
    )
  }
}