const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const apiRouter = require('./routes/api');
const router = require('./routes/routers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', apiRouter);
app.use('/', router);

//Connecting to database
var db = new sqlite3.Database('users', err => {
	if (err) {
		return console.error(err.message);
	}
	console.log('connected to in Sqlite in memory database');
});

// Set Port
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
	console.log('Server started on port ' + app.get('port'));
});
