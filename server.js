const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set the content type based on the file extension
  const extension = path.extname(req.url);
  let contentType = 'text/plain';

  if (extension === '.html') {
    contentType = 'text/html';
  } else if (extension === '.css') {
    contentType = 'text/css';
  } else if (extension === '.js') {
    contentType = 'text/javascript';
  }

  // Read the requested file from the file system
  const filePath = path.join(__dirname, req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file doesn't exist, return a 404 response
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        // For other errors, return a 500 response
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal server error');
      }
    } else {
      // Set the appropriate content type and send the file content
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
