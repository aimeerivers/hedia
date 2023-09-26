Feature: Test frontend

  Scenario: Reports page exists
    Given I go to "https://test.hedia.dev/reports"
    Then the page heading should be "Reports"
