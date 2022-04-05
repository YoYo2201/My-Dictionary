import React, { Component } from 'react'
import './StartPage.css'

export default class StartPage3 extends Component {
    constructor()
    {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        let Div = document.getElementById('start3');
        this.props.setAnimation(Div.style);
    }

    handleClick() {
        this.props.navigate('/sign-up', true);
    }

  render() {
    const setHeight = () => {
        let iconDiv = document.getElementById('buttonDiv').style;
        iconDiv.top = window.innerHeight*0.10+"px";
    }
    window.addEventListener("resize", setHeight);
    return (
        <>
        <div id='start3'>
        <p id="startIt" style={{top: '40px'}}>LET'S START!!</p>
        <div id="buttonDiv" style={{ top: window.innerHeight*0.10+"px"}}>
          <button type='button' id='startButton' onClick={this.handleClick}>
              <p id='buttonFont'>START</p>
          </button>
        </div>
        </div>
      </>
    )
  }
}