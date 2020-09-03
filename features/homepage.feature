@home
Feature: Home page

    Testing the home page and state selector

    @demo @dev
    Scenario Outline:
        Given I open the home page
        Then I am on the home page

    @smoke
    Scenario: Query parameters are not truncated
        Given I open the home page
        When I add the query parameter "ga" with value "TEST"
        Then I am on the home page
        And the "ga" query is set to "TEST"
