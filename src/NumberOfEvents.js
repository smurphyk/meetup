import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32,
  }

  changeNumber = (event) => {
    const value = event.target.value;
    this.setState({
      eventNumber: value,
    })
    this.props.updateEvents(null, null, value);
  }

  render() {
    return (
      <div className='NumberOfEvents'>
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
