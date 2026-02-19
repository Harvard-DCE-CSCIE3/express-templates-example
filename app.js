const express = require('express');
const os = require('os');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const PORT = 3000;  

const photoHandler = require('./routes/photos');
const indexRouter = require('./routes/index');

const data = require('./data');
app.locals.photos = data.photos;

// express configuration and setup - this setting can be considered 'magic' for now, 
//   but we'll break it down in future lessons
app.use(express.urlencoded({ extended: false }));

// Set up EJS as the view engine and specify the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up our routes - this is where we specify which router handles which paths
app.use('/', indexRouter);
app.use('/photos', photoHandler);   // Any /photos/... request goes to photos.js

// Add servestatic the root path, mapped to 'public' directory
//  This will serve any matching paths/files in that directory at the root path
app.use(serveStatic(path.join(__dirname, 'public'))); 

// catch-all route for unmatched paths - this should be the last route defined,
//   as Express will try to match routes in the order they are defined
app.use( (req, res) => {
  res.status(404).send('Sorry - I don\'t have that');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});