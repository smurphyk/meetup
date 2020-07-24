import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32,
  }

  changeNumber = (event) => {
    const value = event.target.value;
    this.setState({
      eventNumber: value
    })
    if (value < 1 || !value) {
      this.setState({
        errorText: 'You entered a number less than 1. Please either change it or get a new hobby.'
      })
    } else {
      this.setState({
        errorText: ''
      })
      this.props.updateEvents(null, null, value);
    }
  }

  render() {
    return (
      <div className='NumberOfEvents'>
        <ErrorAlert text={this.state.errorText} />
        <span className='Number-input'>
          Show
            <input
            className='Number-input-field'
            type='number'
            value={this.state.eventNumber}
            onChange={this.changeNumber}
          />
          Events
        </span>
      </div >
    )
  }
}

export default NumberOfEvents;
