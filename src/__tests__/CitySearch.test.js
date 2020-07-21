import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch />);
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render text input correctly', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    const eventObject = { target: { value: 'Arlington' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Arlington');
  });

  test('render list of suggestions correctly', () => {
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        suggestions[i].name_string
      );
    }
  });

  test('click on suggestion should change query state', () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'NC',
          name_string: 'Wilmington, North Carolina, USA',
          zip: '28401',
          lat: 34.23,
          lon: -77.94,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'DE',
          name_string: 'Wilmington, Delaware, USA',
          zip: '19801',
          lat: 39.74,
          lon: -75.55,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'MA',
          name_string: 'Wilmington, Massachusetts, USA',
          zip: '01887',
          lat: 42.56,
          lon: -71.17,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'OH',
          name_string: 'Wilmington, Ohio, USA',
          zip: '45177',
          lat: 39.45,
          lon: -83.84,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'VA',
          name_string: 'Wilmington, Virginia, USA',
          zip: '22963',
          lat: 37.92,
          lon: -78.32,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'CA',
          name_string: 'Wilmington, California, USA',
          zip: '90744',
          lat: 33.79,
          lon: -118.25,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'IL',
          name_string: 'Wilmington, Illinois, USA',
          zip: '60481',
          lat: 41.29,
          lon: -88.12,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'VT',
          name_string: 'Wilmington, Vermont, USA',
          zip: '05363',
          lat: 42.88,
          lon: -72.9,
        },
        {
          city: 'Wilmington',
          country: 'us',
          localized_country_name: 'USA',
          state: 'NY',
          name_string: 'Wilmington, New York, USA',
          zip: '12997',
          lat: 44.39,
          lon: -73.84,
        },
        {
          city: 'Wilmington',
          country: 'gb',
          localized_country_name: 'United Kingdom',
          name_string: 'Wilmington, Devon, United Kingdom',
          zip: 'EX14 9JG',
          lat: 50.79,
          lon: -3.12,
        },
      ],
    });

    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(
      'Wilmington, North Carolina, USA'
    );
  });
});

describe('<CitySearch /> integration', () => {
  test('get a list of cities when user searches for Wilmington', async () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Wilmington' },
    });
    await CitySearchWrapper.update();
    expect(CitySearchWrapper.state('suggestions')).toEqual([
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'NC',
        name_string: 'Wilmington, North Carolina, USA',
        zip: '28401',
        lat: 34.23,
        lon: -77.94,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'DE',
        name_string: 'Wilmington, Delaware, USA',
        zip: '19801',
        lat: 39.74,
        lon: -75.55,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'MA',
        name_string: 'Wilmington, Massachusetts, USA',
        zip: '01887',
        lat: 42.56,
        lon: -71.17,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'OH',
        name_string: 'Wilmington, Ohio, USA',
        zip: '45177',
        lat: 39.45,
        lon: -83.84,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'VA',
        name_string: 'Wilmington, Virginia, USA',
        zip: '22963',
        lat: 37.92,
        lon: -78.32,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'CA',
        name_string: 'Wilmington, California, USA',
        zip: '90744',
        lat: 33.79,
        lon: -118.25,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'IL',
        name_string: 'Wilmington, Illinois, USA',
        zip: '60481',
        lat: 41.29,
        lon: -88.12,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'VT',
        name_string: 'Wilmington, Vermont, USA',
        zip: '05363',
        lat: 42.88,
        lon: -72.9,
      },
      {
        city: 'Wilmington',
        country: 'us',
        localized_country_name: 'USA',
        state: 'NY',
        name_string: 'Wilmington, New York, USA',
        zip: '12997',
        lat: 44.39,
        lon: -73.84,
      },
      {
        city: 'Wilmington',
        country: 'gb',
        localized_country_name: 'United Kingdom',
        name_string: 'Wilmington, Devon, United Kingdom',
        zip: 'EX14 9JG',
        lat: 50.79,
        lon: -3.12,
      },
    ]);
  });
});
