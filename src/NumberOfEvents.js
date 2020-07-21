import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: Number,
  };

  changeNumber = (event) => {
    this.setState({
      eventNumber: event.target.value,
    });
  };

  render() {
    return (
      <div className='NumberOfEvents'>
        <p className='Number-label'>
          Show{' '}
          <span className='Number-input'>
            <input
              className='Number-input-field'
              value={this.state.eventNumber}
              onChange={this.changeNumber}
            />
          </span>{' '}
          Events
        </p>
      </div>
    );
  }
}

export default NumberOfEvents;
