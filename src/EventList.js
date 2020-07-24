import React, { Component } from 'react';

import Event from './Event';

class EventList extends Component {
  render() {
    return (
      <ul className='EventList'>
        <h1 className='upcoming-title'>UPCOMING EVENTS NEAR YOU</h1>
        {this.props.events.map(event =>
          <li key={event.id}>
            <Event event={event} />
          </li>
        )}
      </ul>
    );
  }
}

export default EventList;
