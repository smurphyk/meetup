Feature: SHOW/HIDE AN EVENT'S DETAILS

  Scenario: An event element is collapsed by default
    Given user navigated to the main page
    When the user hasn’t clicked on the details button
    Then the user should see a list of events in that city with details collapsed

  Scenario: User can expand an event to see its details
    Given user searched a city and is viewing the list of events
    When the user clicks the details button on a specific event
    Then the user should see an expanded list of details about that event
    And details include address, description, visibility, and link

  Scenario: User can collapse an event to hide its details
    Given user expanded the details of an event
    When the user clicks a collapse button on that event
    Then the user should see the details of the event collapse back to the original form