import React, { Component } from 'react'

export default class TaskContainer extends Component {

    componentDidMount() {
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

    setHeight() {
        try{
        let TaskContain = document.getElementById("TaskContain").style;
        TaskContain.height = window.innerHeight - 78 + "px";
        TaskContain.width = window.innerWidth + "px";
        }
        catch{
            ;
        }
    }
  render() {
      window.addEventListener('resize', this.setHeight);
    return (
        <div
        id="TaskContain"
        style={{ height: window.innerHeight - 78 + "px", width: window.innerWidth+"px" }}
      >
        <div className="Task" id="Task1">
            <div className="design"></div>
            <div className="TaskContent">
              <p id="Task1" className="TaskFont">So here's today's task</p>
            <button
          type="button"
          id="addExpandIcon"
          // onClick={() => this.props.passwordHandle("password", 1)}
        >
          <i className="addExpandIcon material-icons"></i>
        </button>
        </div>
        </div>
        <div className="Task" id="Task2">
        <div className="design"></div>
        <div className="TaskContent"></div>
        </div>
        <div className="Task" id="Task3">
        <div className="design"></div>
        <div className="TaskContent"></div>
        </div>
      </div>
    )
  }
}
