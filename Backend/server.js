const db = require('./db');
const sendMail = require('./sendMail');
const auth = require('./routes/auth');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const path = require('path');
const http = require('http');

const server = http.createServer(app, {
  cors: {
        origin: "*",
      },
});

const PORT = process.env.PORT || 4000;
if(process.env.NODE_ENV === "production")
{
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));

server.listen(PORT, () => {
    console.log("Server Connected!!!");
  });