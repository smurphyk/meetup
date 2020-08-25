import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';
import moment from 'moment';
import { BarChart, Bar, LabelList, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  _isMounted = false;

  state = {
    events: [],
    page: null,
    warningText: '',
    renderedEvents: [],
    showEvents: false,
    filterEvents: false
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    getEvents(lat, lon, page ? page : this.state.page).then((events) => {
      if (this._isMounted) {
        this.setState({ events })
        if (!navigator.onLine) {
          this.setState({
            warningText: "No internet? No worries! We have your cached data right here!"
          })
        }
        else {
          this.setState({
            warningText: ''
          })
        }
      }
    });

    if (page) {
      this.setState({
        page,
      });
    }
  };

  countEventsOnADate = (date) => {
    if (this._isMounted) {
      let count = 0;
      for (let i = 0; i < this.state.events.length; i += 1) {
        if (this.state.events[i].local_date === date) {
          count += 1;
        }
      }
      return count;
    }
  }

  chartDisplay = () => {
    this.setState({
      showEvents: !this.state.showEvents
    })
  }

  getData = () => {
    if (this._isMounted) {
      const next7Days = [];
      const currentDate = moment();
      for (let i = 0; i < 7; i += 1) {
        currentDate.add(1, 'days');
        const dateString = currentDate.format('YYYY-MM-DD');
        const count = this.countEventsOnADate(dateString);
        const date = currentDate.format('MMMM Do');
        next7Days.push({ Date: date, Events: count, local_date: dateString });
      }
      return next7Days;
    }
  }

  getEvents = (event) => {
    const events = [];
    for (let i = 0; i < this.state.events.length; i += 1) {
      if (event.payload.local_date === this.state.events[i].local_date) {
        events.push(this.state.events[i]);
      }
    }
    if (!this.state.filterEvents && this.state.events !== events) {
      this.setState({
        renderedEvents: events,
        filterEvents: !this.state.filterEvents
      });
    }
    else if (this.state.events !== events) {
      this.setState({
        renderedEvents: events
      })
    }
  }

  resetEvents = () => {
    const events = localStorage.getItem('lastEvents');
    this.setState({
      renderedEvents: JSON.parse(events),
      filterEvents: !this.state.filterEvents
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <div className="body">
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <WarningAlert text={this.state.warningText} />
          {this.state.showEvents ?
            <button className="app__events-button" onClick={this.chartDisplay}>View Upcoming Events</button>
            :
            <button className="app__events-button" onClick={this.chartDisplay}>View Upcoming Events</button>
          }
          {this.state.showEvents ?
            <ResponsiveContainer className="app__chart" height={400}>
              <BarChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
                data={this.getData()}>
                <XAxis type="category" dataKey="Date" interval="preserveStartEnd" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Bar className="app__chart-bar" dataKey="Events" fill="#ff5959" onClick={this.getEvents}>
                  <LabelList dataKey="Events" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            :
            null}
          {this.state.filterEvents ?
            <div className="events__container">
              <button className="app__events-button" onClick={this.resetEvents}>All Events</button>
            </div>
            :
            null}
          <EventList events={this.state.renderedEvents} />
        </div>
      </div>
    );
  }
}

export default App;
