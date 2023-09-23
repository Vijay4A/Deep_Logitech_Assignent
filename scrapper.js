const https = require('https');

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
          const articles = extractTitles_url(data);
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

function extractTitles_url(html) {
  const regex = /<li class="latest-stories__item">\s*<a\s+href="([^"]+)">\s*<h3 class="latest-stories__item-headline">([^<]+)<\/h3>/g;
  let match;
  const results = [];

  while ((match = regex.exec(html)) !== null) {
    const title = match[2];
    const link = "https://time.com" + match[1];
    results.push({ title, link });
  }

  return results;
}

module.exports = {
    ScarpData,
};