import axios from 'axios';
import { mockEvents } from './mock-data/mock-events';

async function getSuggestions(query) {
  if (window.location.href.startsWith('http://localhost')) {
    return [
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
    ];
  }

  const token = await getAccessToken();
  if (token) {
    const url =
      'https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=' +
      query +
      '&access_token=' +
      token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith('http://localhost')) {
    if (page) {
      return mockEvents.events.slice(0, page);
    } else {
      return mockEvents.events;
    }
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return JSON.parse(events);
  }

  const token = await getAccessToken();
  if (token) {
    let url =
      'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public' +
      '&access_token=' +
      token;
    if (lat && lon && page) {
      url += '&lat=' + lat + '&lon=' + lon;
      url += '&page=' + page;
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    if (lat && lon && !page) {
      url += '&lat=' + lat + '&lon=' + lon;
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
    }
    if (page && !lat) {
      if (!localStorage.getItem('lat')) {
        url += '&page=' + page;
      } else {
        url +=
          '&lat=' +
          localStorage.getItem('lat') +
          '&lon=' +
          localStorage.getItem('lon');
        url += '&page=' + page;
      }
    }
    const result = await axios.get(url);
    const events = result.data.events;
    if (events.length) {
      localStorage.setItem('lastEvents', JSON.stringify(events));
    }

    return events;
  }

  return [];
}

async function getAccessToken() {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (!code) {
      window.location.href =
        'https://secure.meetup.com/oauth2/authorize?client_id=hctp7f58q3afe9mvsfnt68cvus&response_type=code&redirect_uri=https://smurphyk.github.io/meetup/';
      return null;
    }
    return getOrRenewAccessToken('get', code);
  }

  const lastSavedTime = localStorage.getItem('last_saved_time');

  if (accessToken && Date.now() - lastSavedTime < 3600000) {
    return accessToken;
  }

  // If the access_token is expired, we try to renew it by using refresh_token
  const refreshToken = localStorage.getItem('refresh_token');
  return getOrRenewAccessToken('renew', refreshToken);
}

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === 'get') {
    url =
      'https://cors-anywhere.herokuapp.com/https://lolz058xmj.execute-api.us-east-1.amazonaws.com/dev/api/token/' +
      key;
  } else if (type === 'renew') {
    url =
      'https://cors-anywhere.herokuapp.com/https://lolz058xmj.execute-api.us-east-1.amazonaws.com/dev/api/refresh/' +
      key;
  }

  const tokenInfo = await axios.get(url);

  localStorage.setItem('access_token', tokenInfo.data.access_token);
  localStorage.setItem('refresh_token', tokenInfo.data.refresh_token);
  localStorage.setItem('last_saved_time', Date.now());

  return tokenInfo.data.access_token;
}

export { getSuggestions, getEvents };
