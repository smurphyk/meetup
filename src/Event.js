import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
    const colors = ['#ff6b0f', '#348ceb']
    const attendance = [
      { name: "Attending", value: event.yes_rsvp_count },
      { name: "Remaining Slots", value: event.rsvp_limit - event.yes_rsvp_count }
    ];
    return (
      <div className='Event-grid'>
        <div className='Event-grid-item'>
          <p className='Event-time'>
            {event.local_time + '-' + event.local_date}
          </p>
          <p className='Event-name'>{event.name}</p>
          <p className='Event-group-name'>{event.group.name}</p>
          <p className='Event-rsvp'>
            {event.yes_rsvp_count + ' people are attending'}
          </p>
          {event.yes_rsvp_count && event.rsvp_limit ?
            <ResponsiveContainer height={200}>
              <PieChart>
                <Pie data={attendance} fill="#696969" dataKey="value" nameKey="name" cx="50%" cy="50%" label>
                  {
                    attendance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))
                  }
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            : null
          }
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
      </div>
    );
  }
}

export default Event;
