const https = require('https');
const extract_data = require('./extract_data');


// URL of the web page to scrape
const url = 'https://time.com/';

// Send an HTTP GET request to the URL
function ScarpData() {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      // Read the response data
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Process the data when the response ends
      response.on('end', () => {
        if (response.statusCode === 200) {
          // Process the HTML content and resolve the promise with the articles
          const articles = extract_data.extractTitles_url(data);
          resolve(articles);
        } else {
          console.log('Failed to retrieve web page.');
          reject(new Error('Failed to retrieve web page.'));
        }
      });
    }).on('error', (error) => {
      console.error('Error:', error);
      reject(error);
    });
  });
}

module.exports = {
    ScarpData,
};