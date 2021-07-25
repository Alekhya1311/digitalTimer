// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    Running: false,
    timeCompleted: 0,
    timerLimit: 25,
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  timerLimitDecrement = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  timerLimitIncrement = () =>
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))

  timerLimit = () => {
    const {timerLimit, timeCompleted} = this.state
    const isButtonsDisabled = timeCompleted > 0

    return (
      <div className="container2">
        <p className="para1">Set Timer limit</p>
        <div className="inside">
          <button
            className="button"
            disabled={isButtonsDisabled}
            onClick={this.timerLimitDecrement}
            type="button"
          >
            -
          </button>

          <p className="limit-value">{timerLimit}</p>

          <button
            className="button"
            disabled={isButtonsDisabled}
            onClick={this.timerLimitIncrement}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    clearInterval(this.intervalId)
    this.setState({
      Running: false,
      timeCompleted: 0,
      timerLimit: 25,
    })
  }

  incrementTimeCompleted = () => {
    const {timerLimit, timeCompleted} = this.state
    const isTimerCompleted = timeCompleted === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({Running: false})
    } else {
      this.setState(prevState => ({
        timeCompleted: prevState.timeCompleted + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {Running, timeCompleted, timerLimit} = this.state
    const isTimerCompleted = timeCompleted === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeCompleted: 0})
    }
    if (Running) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeCompleted, 1000)
    }
    this.setState(prevState => ({Running: !prevState.Running}))
  }

  startOrPause = () => {
    const {Running} = this.state
    const startOrPauseImageUrl = Running
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = Running ? 'pause icon' : 'play icon'

    return (
      <div className="start">
        <button
          className="button"
          onClick={this.onClickStartOrPause}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="image"
            src={startOrPauseImageUrl}
          />
          <p className="para">{Running ? 'Pause' : 'Start'}</p>
        </button>
        <button className="button" onClick={this.onClickReset} type="button">
          <img
            alt="reset icon"
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="para">Reset</p>
        </button>
      </div>
    )
  }

  getTime = () => {
    const {timerLimit, timeCompleted} = this.state
    const totalRemaining = timerLimit * 60 - timeCompleted
    const minutes = Math.floor(totalRemaining / 60)
    const seconds = Math.floor(totalRemaining % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {Running} = this.state
    const text = Running ? 'Running' : 'Paused'

    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="card">
          <div className="timer">
            <div className="time">
              <h1 className="time-heading">{this.getTime()}</h1>
              <p className="timer-state">{text}</p>
            </div>
          </div>
          <div className="container">
            {this.startOrPause()}
            {this.timerLimit()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
