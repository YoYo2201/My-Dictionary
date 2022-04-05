import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';
import './AddPage.css'

export default class AddPage extends Component {
    constructor(props){
        super(props);
        this.setHeight = this.setHeight.bind(this);
        this.state = {
            calendar: false,
            setDateTime: null,
            setTime: null,
        }
    }
    componentDidMount() {
        let add = document.getElementById('AddPage').style;
        add.width = window.innerWidth/1.3+"px";
        add.left = (window.innerWidth-(window.innerWidth/1.3))/2+"px"
        add.height = window.innerHeight-(75+105)+"px";
        let timeElementC = document.querySelectorAll('.rc-time-picker-input');
        timeElementC.forEach((timeElement) => {
            timeElement.setAttribute('readonly', 'readonly');
        })
    }

    setHeight() {
        try{
        let add = document.getElementById('AddPage').style;
        add.width = window.innerWidth/1.3+"px";
        add.left = (window.innerWidth-(window.innerWidth/1.3))/2+"px"
        add.height = window.innerHeight-(75+105)+"px";
        }
        catch{
            ;
        }
      }

      openCalendar() {
          console.log('calendar');
          let cal = document.getElementById('openCal');
          cal.focus();
      }

  render() {
    window.addEventListener("resize", this.setHeight);
    return (
        <>
        <p id='AddFont'>Add Task</p>
      <div id='AddPage'>
          <form id="AddTask" action="/api/SignUp" autoComplete="off">
          <div className="AddForm">
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Title"
                    required
                  />
                </div>
                <div className="AddForm">
                  <textarea
                    type="text"
                    id="description"
                    placeholder="Enter Description(optional)"
                    required
                  />
                </div>
                <div className="AddForm">
                <label className='endDate' for="endDate">End Date:
                </label>
                <DateTimePicker dayPlaceholder='dd' monthPlaceholder='MM' yearPlaceholder='yyyy' format='dd/MM/yyyy' minDate={new Date()} onChange={(value) => this.setState({setDateTime: value})} value={this.state.setDateTime}/>
                </div>
                <div className="AddForm">
                <label className='endDate' for="endTime">End Time:
                </label>
                {/* <input type="time" name="endTime"/> */}
                <TimePicker placeholder='hh:mm' value={this.state.setTime} showSecond={false} use12Hours={true} onChange={(value) => this.setState({setTime: value})}/>
                </div>
                <div className="AddForm">
                <button type="submit" name="submit" id="submit" class="form-submit" onClick={this.authenticate}>Add</button>
                </div>
          </form>
      </div>
      </>
    )
  }
}