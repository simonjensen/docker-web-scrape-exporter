"use strict"
const express = require("express");
const app = express();
const httpRequest = require("request");
const cheerio = require("cheerio");

const port = process.env.PORT;
const url = process.env.URL;
const cssSelector = process.env.CSS_SELECTOR;
const cssSelectorContext = process.env.CSS_SELECTOR_CONTEXT;
const prometheusMetricName = process.env.PROMETHEUS_METRIC_NAME;

// @see: https://petermolnar.net/linkedin-public-settings-ignored/
const options = {
	url: url,
	headers: {
		"accept-encoding": "text",
		"accept-language": "en-US,en;q=0.9,",
		"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
		"referer": "https://google.com/"
	}
};

app.get("/", function (request, response) {
	console.log("Downloading content: " + options.url);
	
	// Download HTML content
	httpRequest(options, function(error, httpResponse, body) {
		if (error) {
			
			console.log(error);
			response.status(404).send();
			
		} else {
			
			console.log("Response code: " + httpResponse.statusCode);
			
			// Parse using cheerio
			console.log("Parsing content ...");
			const $ = cheerio.load(body);
			
			// Display the value
			console.log("Fetching selected content ...");
			let selectedContent = $(cssSelector, cssSelectorContext).text();
			
			if (selectedContent) {
				selectedContent = selectedContent.match(/\d+/);
				console.log("Selected content: " + selectedContent);
			} else {
				console.log("Unable to fetch selected content!")
				selectedContent = 0;
			}
			
			response.send(prometheusMetricName + " " + selectedContent + "\n");
		}
	});
	
});

app.listen(port, () =>
	console.log("Server up and listening on port: " + port)
)
