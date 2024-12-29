import { test, expect } from "@playwright/test";

// API tests for search item process
test.describe("API process", async () => {

    // Validate the Thor Hammer by getting the ID and then make a GET request against that product ID
    test("GET /products/{id}", async ({ request }) => {
        const apiUrl = "https://api.practicesoftwaretesting.com"; // shown in the Network tab of the Dev tools of site
        // type "Thor Hammer" in search bar on site and observe the Headers tab in the Network tab of Dev tools after clicking "Search" button and see the API Request URL
        // To see the Thor Hammer's API generated data, see the Preview tab in the Network tab and note the ID
        // Then, on the site filtered results of the "Thor Hammer", click the product to generate a new API request and then see the Headers tab of the product's ID and then see the Preview tab to get this API request info
        // Therefore, 2 API calls in the test: 1st for getting the ID and 2nd to do the assertions
        const getProductResponse = await request.get(
            apiUrl + "/products/search?q=thor%20hammer"
        ); // make the 1st API request by request.get()
        expect(getProductResponse.status()).toBe(200); // confirm status code of product response (Thor Hammer's) to be 200
        const productBody = await getProductResponse.json(); // get the product info
        // create productId variable and get the 1st item in the productBody array and set the id to the productId variable
        const productId = productBody.data[0].id;

        // Make the 2nd API call
        const response = await request.get(apiUrl + "/products/" + productId); // pass the productId to the GET request

        expect(response.status()).toBe(200); // verify status code of response to be 200
        const body = await response.json(); // set the body variable to the response body

        // Validate expected items values of response body using assertions
        expect(body.in_stock).toBe(true);
        expect(body.is_location_offer).toBe(false);
        expect(body.is_rental).toBe(false);
        expect(body.name).toBe("Thor Hammer");
        expect(body.price).toBe(11.14);
    });
});