const http = require('http');
const scrapper = require('./fetchData');

const PORT = 3000;  //port to hit 

//code Url = http://localhost:3000/getTimeStories

// HTTP server for scrapper 
const app = http.createServer(async (req, res) => {

    //GET url to pick data from time.com
  if (req.url === '/getTimeStories' && req.method === 'GET') {

    const data = await scrapper.ScarpData(); //wait for data -> call scarper function

    res.writeHead(200, { 'Content-Type': 'application/json'});  // for success
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });  //for error
    res.end('Not Found');
  }
});

//Start server at 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
