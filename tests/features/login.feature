Feature: Secure and Reliable Login
  As a user
  I want to log in to the system
  So that I can access my account securely

  Background:
    Given I am on the login page

  @functional
  Scenario: Successful login with valid credentials
    When I enter "admin" as username
    And I enter "password123" as password
    And I click the login button
    Then I should see "Login successful"
    And I should be redirected to the dashboard

  @functional
  Scenario: Failed login with invalid credentials
    When I enter "admin" as username
    And I enter "wrongpassword" as password
    And I click the login button
    Then I should see an error message "Invalid credentials"

  @boundary
  Scenario Outline: Failed login with empty fields
    When I enter "<username>" as username
    And I enter "<password>" as password
    And I click the login button
    Then I should see an error message "Username and password are required"

    Examples:
      | username | password |
      |          | password |
      | admin    |          |
      |          |          |

  @boundary
  Scenario: Login with extremely long inputs
    When I enter a username with 51 characters
    And I enter "password" as password
    And I click the login button
    Then I should see an error message "Inputs are too long"
