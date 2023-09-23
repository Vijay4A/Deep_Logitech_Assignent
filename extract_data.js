function extractTitles_url(html) {
    //regex to extract the data from webpage
    const regex = /<li class="latest-stories__item">\s*<a\s+href="([^"]+)">\s*<h3 class="latest-stories__item-headline">([^<]+)<\/h3>/g;
    let match;
    const results = [];

    //iterate over webpage to extract data
  
    while ((match = regex.exec(html)) !== null) {
      const title = match[2];
      const link = "https://time.com" + match[1];
      results.push({ title, link });
    }
  
    return results;   //return output
  }

module.exports = {
    extractTitles_url,
};