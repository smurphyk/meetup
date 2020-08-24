import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';
import moment from 'moment';
import { BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      <div className='App'>
        <Header />
        <div className="Body">
          <CitySearch updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} />
          <WarningAlert text={this.state.warningText} />
          <ResponsiveContainer height={400}>
            <BarChart className="chart"
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="date" name="date" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Bar data={this.getData()} fill="#000" />
            </BarChart>
          </ResponsiveContainer>
          <div className="events-container">
            <EventList events={this.state.events} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
