import React, { Component } from 'react';

class Event extends Component {
  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    const { event } = this.props;
    return (
      <div className='Event'>
        <p className='Event-time'>
          {event.local_time + '-' + event.local_date}
        </p>
        <p className='Event-name'>{event.name}</p>
        <p className='Event-group-name'>{event.group.name}</p>
        <p className='Event-rsvp'>
          {event.yes_rsvp_count + ' people are attending'}
        </p>
        {this.state.showDetails ? (
          <span className='Event-details'>
            <p className='Event-address'>
              {event.venue.name +
                ', ' +
                event.venue.address_1 +
                ', ' +
                event.venue.city +
                ', ' +
                event.venue.state +
                ' ' +
                event.venue.zip}
            </p>
            <p className='Event-description'>{event.description}</p>
            <p className='Event-visibility'>{event.visibility}</p>
            <a className='Event-link' href={event.link}>
              Event Link
            </a>
          </span>
        ) : null}
        <button className='Event-details-button' onClick={this.toggleDetails}>
          Details
        </button>
      </div>
    );
  }
}

export default Event;
