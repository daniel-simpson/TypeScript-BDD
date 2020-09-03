@search
Feature: Search

    Can find key pages via search

    Scenario Outline: Can search for "<SearchTerm>"
        Given I open the home page
        When I search for "<SearchTerm>"
        Then I am on the search page
        And the "search" query is set to "<SearchTerm>"
        And there are search results for "<SearchTerm>"
        When I click on the first search result
        Then the url contains "<Route>"
        Examples:
            | SearchTerm | Route |
#| Test       | test  |