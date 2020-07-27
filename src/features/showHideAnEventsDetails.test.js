import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import React from 'react';
import App from '../App';
import { mockEvents } from '../mock-data/mock-events';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = mount(<App />);
  });

  afterAll(() => {
    AppWrapper.unmount();
  });

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user navigated to the main page', () => {});

    when('the user hasn’t clicked on the details button', () => {
      AppWrapper.update();
    });

    then(
      'the user should see a list of events in that city with details collapsed',
      () => {
        expect(AppWrapper.find('.Event')).toHaveLength(
          mockEvents.events.length
        );
        expect(AppWrapper.find('.Event-details')).toHaveLength(0);
      }
    );
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
    and,
  }) => {
    given('user searched a city and is viewing the list of events', () => {});

    when('the user clicks the details button on a specific event', () => {
      AppWrapper.find('.Event-details-button').at(0).simulate('click');
    });

    then(
      'the user should see an expanded list of details about that event',
      () => {
        expect(AppWrapper.find('.Event-details').at(0)).toHaveLength(1);
      }
    );

    and('details include address, description, visibility, and link', () => {
      expect(AppWrapper.find('.Event-address').at(0)).toHaveLength(0);
      expect(AppWrapper.find('.Event-description').at(0)).toHaveLength(1);
      expect(AppWrapper.find('.Event-visibility').at(0)).toHaveLength(1);
      expect(AppWrapper.find('.Event-link').at(0)).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    given('user expanded the details of an event', () => {});

    when('the user clicks a collapse button on that event', () => {
      AppWrapper.find('.Event-details-button').at(0).simulate('click');
    });

    then(
      'the user should see the details of the event collapse back to the original form',
      () => {
        expect(AppWrapper.find('.Event-details').at(0)).toHaveLength(0);
      }
    );
  });
});
