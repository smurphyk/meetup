import React, { Component } from 'react';

import Event from './Event';

class EventList extends Component {
  render() {
    return (
      <ul className='event__list'>
        {this.props.events.map((event) => (
          <li key={event.id} className='event__list-item'>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
