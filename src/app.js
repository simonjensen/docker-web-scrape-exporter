"use strict"
const express = require("express");
const app = express();
const https = require("https");
const cheerio = require("cheerio");

const port = 3000;
const url = process.env.URL;
const cssSelector = process.env.CSS_SELECTOR;
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
	console.log("Downloading content: " + url);

	// Download HTML content
	https.get(url, httpResponse => {
		console.log('Status Code:', httpResponse.statusCode);

		let data = [];
		httpResponse.on('data', chunk => {
			data.push(chunk);
		});

		httpResponse.on('end', () => {
			const body = Buffer.concat(data).toString();
			console.log("Parsing content of length: " + body.length);
			const $ = cheerio.load(body);

			let selectedValue = $(cssSelector).text();

			if (selectedValue) {
				selectedValue = selectedValue.match(/\d+/);
				console.log("Selected value: " + selectedValue);
			} else {
				console.log("Unable to fetch selected value!")
				selectedValue = 0;
			}

			response.send(prometheusMetricName + " " + selectedValue + "\n");

		});
	}).on('error', error => {
		console.log(error.message);
		response.status(404).send();
	});


});

app.listen(port, () =>
	console.log("Server up and listening on port: " + port)
)
