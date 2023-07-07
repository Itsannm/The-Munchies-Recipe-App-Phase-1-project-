const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Determine the file path based on the requested URL
  let filePath = path.join('__/Development/Code/ann/The-Munchies-Recipe-App-Phase-1-project-', req.url === '/' ? 'index.html' : req.url);

  // Check if the requested file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, return a 404 error
      res.statusCode = 404;
      res.end('404 Not Found');
    } else {
      // Read the file and return its contents
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('500 Internal Server Error');
        } else {
          // Set the appropriate Content-Type header based on the file extension
          let contentType = 'text/html';
          if (filePath.endsWith('.css')) {
            contentType = 'text/css';
          } else if (filePath.endsWith('.js')) {
            contentType = 'text/javascript';
          }

          res.setHeader('Content-Type', contentType);
          res.end(data);
        }
      });
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
