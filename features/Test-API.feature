Feature: Test API

  Scenario: OpenAPI exists
    When I GET "/openapi.json"
    Then status code should be 200
  
  Scenario: Get a report
    Given I GET "/reports"
    And there is at least 1 report
    When I GET the first report
    Then status code should be 200
    And the response should contain an array of tests

  Scenario: Create and delete a report
    Given I POST "/reports" with:
    """
    {
      "title": "aimee was here!",
      "tests": [
        {
          "duration": 25,
          "name": "Test 25",
          "number": 25,
          "status": "pass"
        }
      ]
    }
    """
    Then status code should be 201
    And the response should contain a report
    When I GET the report
    Then status code should be 200
    And the response should contain the report
    When I DELETE the report
    Then status code should be 204
    And I GET the report
    Then status code should be 404
