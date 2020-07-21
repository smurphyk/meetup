import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { hasUncaughtExceptionCaptureCallback } from 'process';

describe('<Event /> component', () => {
  let EventWrapper;
  const event = {
    created: 1581615252000,
    duration: 10800000,
    id: '268686065',
    name: 'Tech Night Out',
    date_in_series_pattern: false,
    status: 'upcoming',
    time: 1597788000000,
    local_date: '2020-08-18',
    local_time: '18:00',
    updated: 1583960483000,
    utc_offset: -14400000,
    waitlist_count: 0,
    yes_rsvp_count: 4,
    venue: {
      id: 26220036,
      name: "Waterman's Brewing",
      lat: 34.22109603881836,
      lon: -77.8205795288086,
      repinned: true,
      address_1: '1610 Pavilion Pl',
      city: 'Wilmington',
      country: 'us',
      localized_country_name: 'USA',
      zip: '28403',
      state: 'NC',
    },
    is_online_event: false,
    group: {
      created: 1478872644000,
      name: 'Tech Talent South ILM',
      id: 21130326,
      join_mode: 'open',
      lat: 34.22999954223633,
      lon: -77.94000244140625,
      urlname: 'Tech-Talent-South-Wilmington',
      who: 'Members',
      localized_location: 'Wilmington, NC',
      state: 'NC',
      country: 'us',
      region: 'en_US',
      timezone: 'US/Eastern',
    },
    link:
      'https://www.meetup.com/Tech-Talent-South-Wilmington/events/268686065/',
    description:
      "<p>Looking to grow your network and meet fellow techies? Join Tech Talent South for this casual networking event. Grab a bite and a drink, meet new friends and connect with old ones.</p> <p>RSVP on Eventbrite: <a href='https://www.eventbrite.com/e/tech-night-out-tickets-94671792881' class='linkified'>https://www.eventbrite.com/e/tech-night-out-tickets-94671792881</a></p> <p>Sponsored by Waterman's Brewing Company<br/>Waterman's Brewing Co. is a handcraft brewery serving all styles of brews made in house along with your favorite top-shelf liquors and wines. And don't forget to bring an appetite, 'cause Chef Stan in the kitchen serves everything from traditional bar favorites to delicious tuna tacos and vegan fare!<br/><a href='https://www.watermansbrewing.com/' class='linkified'>https://www.watermansbrewing.com/</a></p>",
    visibility: 'public',
    member_pay_fee: false,
  };

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render event div', () => {
    expect(EventWrapper.find('.Event')).toHaveLength(1);
  });

  test('render event time', () => {
    expect(EventWrapper.find('.Event-time')).toHaveLength(1);
  });

  test('render event name', () => {
    expect(EventWrapper.find('.Event-name')).toHaveLength(1);
  });

  test('render event group name', () => {
    expect(EventWrapper.find('.Event-group-name')).toHaveLength(1);
  });

  test('render event rsvp count', () => {
    expect(EventWrapper.find('.Event-rsvp')).toHaveLength(1);
  });

  test('render event details', () => {
    expect(EventWrapper.find('.Event-details')).toHaveLength(0);
  });

  test('render event address', () => {
    expect(EventWrapper.find('.Event-address')).toHaveLength(0);
  });

  test('render event description', () => {
    expect(EventWrapper.find('.Event-description')).toHaveLength(0);
  });

  test('render event visibility', () => {
    expect(EventWrapper.find('.Event-visibility')).toHaveLength(0);
  });

  test('render event link', () => {
    expect(EventWrapper.find('.Event-link')).toHaveLength(0);
  });

  test('render event details button', () => {
    expect(EventWrapper.find('.Event-details-button')).toHaveLength(1);
  });

  test('clicking details button displays details', () => {
    EventWrapper.find('.Event-details-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
    expect(EventWrapper.find('.Event-details')).toHaveLength(1);
    expect(EventWrapper.find('.Event-address')).toHaveLength(1);
    expect(EventWrapper.find('.Event-description')).toHaveLength(1);
    expect(EventWrapper.find('.Event-visibility')).toHaveLength(1);
    expect(EventWrapper.find('.Event-link')).toHaveLength(1);
  });
});
