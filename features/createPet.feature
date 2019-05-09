Feature: Pets creation

	Scenario Outline: Succesful pet creation
		Given JSON "<payload>"
		When user sends a POST request to "/pet" endpoint
		Then user sees successful response status code
		And JSON response matches "<payload>"

		Examples:
			| payload            |
			| body_request1.json |
			| body_request2.json |
			| body_request3.json |

	Scenario: Unsuccesful pet creation using invalid method
		When user sends an invalid PATCH equest to "/pet" endpoint
		Then user sees error message with status code 405

Scenario: Unsuccesful pet creation using Unsupported Media Type
	When user sends an invalid POST request to "/pet" endpoint
	Then user sees error message with status code 415



