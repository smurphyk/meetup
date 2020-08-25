import React, { Component } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import moment from 'moment';

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
    const eventDate = moment(event.local_date);
    const eventTime = moment(event.local_time, 'HH:mm')
    const description = '<b>Description: </b>' + event.description;

    return (
      <div className='event__item' onClick={this.toggleDetails}>
        <p className='event__time'>
          {eventDate.format('dddd, MMMM Do') + ' @ ' + eventTime.format('hh:mm a')}
        </p>
        <p className='event__name'>{event.name}</p>
        <p className='event__group-name'>{event.group.name}</p>
        <p className='event__rsvp'>
          {event.yes_rsvp_count + ' people are attending'}
        </p>
        {this.state.showDetails ?
          <div className="event__details">
            {event.rsvp_limit && event.yes_rsvp_count ?
              <div>
                <ResponsiveContainer height={200}>
                  <PieChart>
                    <Pie data={attendance} dataKey="value" nameKey="name" outerRadius={50} label>
                      {
                        attendance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))
                      }
                    </Pie>
                    <Legend iconSize={10} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              :
              null
            }
            {event.venue ? <p className="event__address"> <b>Address: </b><br />
              {event.venue.name + ', ' + event.venue.address_1 + ', ' +
                event.venue.city + ', ' + event.venue.state + ' ' +
                event.venue.zip
              }
            </p>
              : null}
            {event.description ?
              <div className="event__description" dangerouslySetInnerHTML={{ __html: description }}>
              </div>
              :
              null
            }
            {event.visibility === 'public' ?
              <p className="event__visibility-blue">
                <b className="event__visibility">Visibility: </b>{event.visibility}
              </p>
              :
              <p className="event__visibility-red">
                <b className="event__visibility">Visibility: </b>public limited
            </p>
            }
            <a className="event__link"
              href={event.link}>
              Event link
            </a>
          </div>
          : null}
        <div className="event__button-div">
          {this.state.showDetails ?
            <button className="details__button" onClick={this.toggleDetails}>Tell Me Less</button>
            :
            <button className="details__button" onClick={this.toggleDetails}>Tell Me More!</button>}
        </div>
      </div>
    );

  }
}


export default Event;
