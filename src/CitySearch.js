import React, { Component } from 'react';
import { getSuggestions } from './api';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    infoText: '',
    cursor: null
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
    getSuggestions(value).then(suggestions => {
      this.setState({ suggestions });

      if (value.length > 1 && suggestions.length === 0) {
        this.setState({
          infoText:
            'That city does not exist on this Earth. If you are from a different planet or dimension, you should probably go back and use the meetup app there.',
        });
      } else {
        this.setState({
          infoText: '',
        });
      }
    });
  };

  handleItemClicked = (name_string, lat, lon) => {
    this.setState({
      query: name_string,
      suggestions: [],
      cursor: null
    });
    this.props.updateEvents(lat, lon, null);
  };

  currentSuggestion = (event) => {
    const { suggestions, cursor } = this.state;
    if (event.key === "ArrowDown" && cursor < suggestions.length - 1) {
      if (cursor === null) {
        this.setState({
          cursor: 0
        })
      }
      else {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1
        }))
      }
    }
    else if (event.key === "ArrowUp" && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }))
    }
    else if (event.key === "Enter" && cursor != null) {
      this.handleItemClicked(suggestions[cursor].name_string,
        suggestions[cursor].lat,
        suggestions[cursor].lon);
    }
  }

  clearHighlight = () => {
    this.setState({
      cursor: null
    });
  }

  render() {

    const { cursor } = this.state

    return (
      <div className='citySearch'>
        <InfoAlert text={this.state.infoText} />
        <input
          type='text'
          className='city'
          placeholder='Where are we going?'
          value={this.state.query}
          onChange={this.handleInputChanged}
          onKeyDown={this.highlightSuggestion}
        />
        <ul className='suggestions'>
          {this.state.suggestions.map((item, index) => (
            <li
              key={item.name_string}
              onClick={() =>
                this.handleItemClicked(item.name_string, item.lat, item.lon)
              }
              className={cursor === index ? 'citySearch__selection' : null}
              onMouseOver={this.clearHighlight}
            >
              {item.name_string}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CitySearch;
