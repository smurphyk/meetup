import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';
import { WarningAlert } from './Alert';

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
        this.setState({ events })
        if (!navigator.onLine) {
          this.setState({
            warningText: "You're offline, you goofball! All good though, here's your cached data, because we don't judge!"
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className='App'>
        <CitySearch updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <WarningAlert text={this.state.warningText} />
      </div>
    );
  }
}

export default App;
