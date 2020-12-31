Feature: Login

  As an existing user
  I want to be able to login

  Background:
    Given I have an account
    And I navigate to "/login"

  @dev
  Scenario: Log in
    When I input my email "foo@bar.com" and password "foobar"
    And I click submit form
    Then I should be navigated to the home page
