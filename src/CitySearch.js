import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: "Wilmington",
    suggestions: [
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "NC",
        name_string: "Wilmington, North Carolina, USA",
        zip: "28401",
        lat: 34.23,
        lon: -77.94,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "DE",
        name_string: "Wilmington, Delaware, USA",
        zip: "19801",
        lat: 39.74,
        lon: -75.55,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "MA",
        name_string: "Wilmington, Massachusetts, USA",
        zip: "01887",
        lat: 42.56,
        lon: -71.17,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "OH",
        name_string: "Wilmington, Ohio, USA",
        zip: "45177",
        lat: 39.45,
        lon: -83.84,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "VA",
        name_string: "Wilmington, Virginia, USA",
        zip: "22963",
        lat: 37.92,
        lon: -78.32,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "CA",
        name_string: "Wilmington, California, USA",
        zip: "90744",
        lat: 33.79,
        lon: -118.25,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "IL",
        name_string: "Wilmington, Illinois, USA",
        zip: "60481",
        lat: 41.29,
        lon: -88.12,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "VT",
        name_string: "Wilmington, Vermont, USA",
        zip: "05363",
        lat: 42.88,
        lon: -72.9,
      },
      {
        city: "Wilmington",
        country: "us",
        localized_country_name: "USA",
        state: "NY",
        name_string: "Wilmington, New York, USA",
        zip: "12997",
        lat: 44.39,
        lon: -73.84,
      },
      {
        city: "Wilmington",
        country: "gb",
        localized_country_name: "United Kingdom",
        name_string: "Wilmington, Devon, United Kingdom",
        zip: "EX14 9JG",
        lat: 50.79,
        lon: -3.12,
      },
    ],
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  handleItemClicked = (value) => {
    this.setState({ query: value });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
        <ul className="suggestions">
          {this.state.suggestions.map((item) => (
            <li
              key={item.name_string}
              onClick={() => this.handleItemClicked(item.name_string)}
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
