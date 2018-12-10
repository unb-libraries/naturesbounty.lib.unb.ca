# Basic functionality testing.
# Ref : phase2/behat-suite
# http://behat-drupal-extension.readthedocs.io/en/3.1/drupalapi.htm

@api
Feature: Core
  In order to know the website is running
  As a website user
  I need to be able to view the site title and login

  @api
    Scenario: Not logged in
      Given I am not logged in
      Then I should see the link "Log in"
