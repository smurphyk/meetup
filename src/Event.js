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
      <div className='Event-grid-item'>
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
            {event.venue ? (
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
            ) : null}
            <div
              className='Event-description'
              dangerouslySetInnerHTML={{ __html: event.description }}
            ></div>
            <p className='Event-visibility'>{event.visibility}</p>
            <a className='Event-link' href={event.link}>
              Link
            </a>
          </span>
        ) : null}
        <div className='button-container'>
          {this.state.showDetails ? (
            <button
              className='Event-details-button'
              onClick={this.toggleDetails}
            >
              Show Less
            </button>
          ) : (
              <button
                className='Event-details-button'
                onClick={this.toggleDetails}
              >
                Details
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default Event;
