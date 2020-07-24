import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { InfoAlert, ErrorAlert } from './Alert';

class App extends Component {
  _isMounted = false;

  state = {
    events: [],
    page: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.updateEvents();
  }

  updateEvents = (lat, lon, page) => {
    getEvents(lat, lon, page ? page : this.state.page).then((events) => {
      if (this._isMounted) {
        this.setState({ events });
      }
    });

    if (page) {
      this.setState({
        page,
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className='App'>
        <CitySearch updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;
