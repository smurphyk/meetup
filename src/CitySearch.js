import React, { Component } from 'react';
import { getSuggestions } from './api';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: []
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value && suggestions.length === 0) {
        this.setState({
          infoText: 'That city does not exist on this Earth. If you are from a different planet or dimension, you should probably go back and use the meetup app there.',
        });
      } else {
        this.setState({
          infoText: '',
        });
      }
    });
  };

  handleItemClicked = (name_string, lat, lon) => {
    this.setState({ query: name_string, suggestions: [] });
    this.props.updateEvents(lat, lon, null);
  }

  render() {
    return (
      <div className='CitySearch'>
        <InfoAlert text={this.state.infoText} />
        <input
          type='text'
          className='city'
          placeholder='City'
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className='suggestions'>
          {this.state.suggestions.map(item =>
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
            >
              {item.name_string}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
