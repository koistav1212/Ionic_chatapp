const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const path = require("path");
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const corsOptions = {
  origin: ['https://angular-chatapp.onrender.com','http://localhost:8100'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you need
  credentials: true, // Set to true if you need to include cookies or HTTP credentials
};

// Use the cors middleware with your configuration
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the template engine
// app.set("view engine", "ejs");
// import API.js
const user = require("./routes/userRoutes");
const routes=require("./routes/routes")
// use API routes
app.use("/", user);
app.use("/",routes)
app.use(express.static(__dirname.replace(/\\/g, "/") + '/view/www'));
// writeENV();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// use API routes
// router(app);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/view/www/index.html'));
});
// >> StrictQuery
mongoose.set("strictQuery", false);
// const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb+srv://koustavkanakapd:abcd123@cluster0.wu6hsx9.mongodb.net/";
// "mongodb+srv://koustavkanakapd:abcd123@cluster0.cyuge9a.mongodb.net/?retryWrites=true&w=majority";
//app.use(cors({origin: '*'}));
app.all("/", (req, res) => {
  // res.send("Hello Darling");
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.send("Hello Darling");
});


mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    // const client = new MongoClient(url, { useNewUrlParser: true });
    // client.connect((err) => {
    //   const collection = client.db("participants").collection("boxers");
    //   console.log("collection", collection);
    //   // perform actions on the collection object
    //   client.close();
    // });
    console.log("connection succesful");
  })
  .catch((e) => {
    console.log(e);
  });
  



  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  const port = process.env.PORT || 5000;
  server.listen(port);
  
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('save-message', (data) => {
        console.log(data);
        io.emit('new-message', { message: data });        
    });
});
  

function writeENV() {
  if (process.env.NODE_ENV) {
      let content = "(function (window) {" +
          "window.__env = window.__env || {};" +
          "window.__env.SERVER_URL = '" + process.env.SERVER_URL + "';" +
          "}(this));"
      fs.writeFile(path.join(__dirname.replace(/\\/g, "/"), '/view/dist/assets/environments/env.js'), content, (err) => {
          if (err) throw err;
          console.log('SERVER_URL :', process.env.SERVER_URL)
          console.log('Successfully saved env.js file.');
      });
  }
}

app.use(sendSpaFileIfUnmatched);
function sendSpaFileIfUnmatched(req, res) {
  res.sendFile("/view/dist/index.html", { root: '.' });
}