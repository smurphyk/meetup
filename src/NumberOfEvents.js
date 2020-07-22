import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32,
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
              type='number'
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
