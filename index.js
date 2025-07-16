// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let parsedDate;

  // Якщо немає параметра — взяти поточну дату
  if (!date) {
    parsedDate = new Date();
  } else if (!isNaN(date)) {
    // Якщо число (UNIX timestamp у мілісекундах або секундах)
    parsedDate = new Date(parseInt(date));
  } else {
    // ISO формат
    parsedDate = new Date(date);
  }

  // Якщо дата некоректна — повертаємо помилку
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Інакше — повертаємо дату у двох форматах
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
