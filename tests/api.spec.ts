import { test, expect } from "@playwright/test"

// Test for GETting the products
test("GET /products", async ({ request }) => {
    // Instead of importing "page", we import "request" which is going to be what is made to make the API request
    // What we want to automate in terms of API testing in the site
    // Explore the site first: go to Home page of ToolShop and right-click and "Inspect" and go to "Network" tab in Dev tools, then refresh the Home page, filter All requests to "FetchXHR"
    // Look for "products" and in the Headers tab, check some request info such as Request method (GET), Status code (200), response headers (headers that are received), and request headers (headers that the browser sent to the API)
    // Note that the URL is api.practicesoftwaretesting whereas the main site is just practicesoftwaretesting.com

    // You can click the "Payload" tab and see the query parameters but if there was a request body, we could see that there.

    // Then 2 tabs to see the response:
    // 1. Preview - lets you click through and you get to open up the things you want to look at
    // 2. Response - just a big JSON object

    // Let's make a GET request to the URL in the Headers section of the products page in the Network tab
    const apiUrl = "https://api.practicesoftwaretesting.com";
    // Set a variable for the response
    const response = await request.get(apiUrl + "/products");

    // When we get the response back, the first thing we want to do is expect the response status to be what the response status should be
    expect(response.status()).toBe(200); // this test should get a 200 status code

    // Make another assertion
    // With the request body, there are lot of things that come back from the request URL, such as the JSON object that gets returned - to get access to that:
    const body = await response.json();
    // console.log(body); // Reason: place to put a breakpoint in order to debug this test and look at its body and see what exists

    // Write assertions for length of 9 and value total of 50
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
});

// Test for POSTing the User Login
// Before log in, we should clear the history on the web page and also "Preserve Log" to preserve any of your API requests
// Once logged in as customer@practicesoftwaretesting.com and password as "welcome01", go to Network tab in Dev tools and click on the "login" under Name column and note the details on the right including API request url, request method (POST), etc.
test("POST /users/login", async ({ request }) => {
    // Let's make a POST request to the URL in the Headers section of the login page in the Network tab
    const apiUrl = "https://api.practicesoftwaretesting.com";
    // Set a variable for the response
    const response = await request.post(apiUrl + "/users/login", {
        // we want to POST a body into this request, check the "Payload" tab which includes the request body containing the email and password values
        data: { // data that we are POSTing to the server
            email: "customer@practicesoftwaretesting.com",
            password: "welcome01",
        }
    });

    // Add an assertion - if we're not asserting on the response, this API request could fail and we'd never know
    expect(response.status()).toBe(200); // status code of 200
    const body = await response.json();
    // console.log(body); // to put a breakpoint and run the test to see what's coming back in the response body

    // Test to make sure the access_token actually exists on the response
    expect(body.access_token).toBeTruthy(); // basically saying that this body should have an access_token - if that's true, then pass, if not, then fail
});
