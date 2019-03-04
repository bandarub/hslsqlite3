const express = require('express');
const router = express.Router();
const request = require('request');
const sqlite3 = require('sqlite3').verbose();

var file = 'myDatabase.sqlite3';
var db = new sqlite3.Database(file);


//Route to get Ticket Types
router.get('/', function(req, res) {
	const stmt = 'SELECT id, displayName, description FROM ticketTypes';
	db.all(stmt, function(err, row) {
		res.send(row);
	});
});

//To signup new user(users have unique Email)
router.post('/signup', function(req, res) {
	const { userName, email, password } = req.body;
	db.run('INSERT INTO user (userName,email, password) VALUES (?,?,?)', userName, email, password, function(err, row) {
		if (err) {
			res.send({ error: 'Email user already existed' });
		} else
			res.send({
				message: 'New user created successfully'
			});
	});
});

//User routes
router.get('/user/:id', function(req, res) {
	const id = req.params.id;
	const stmt = ' SELECT * FROM orderList WHERE user = ?';
	db.all(stmt, id, function(err, row) {
		res.send({ orderList: row });
	});
});

//Ordering a ticket
router.post('/user/:id/order', function(req, res) {
	const id = req.params.id;
	const { ticketId } = req.body;
	db.all('SELECT * FROM ticketTypes WHERE id = ?', ticketId, function(err, row) {
		console.log(row);
		let stmt = db.prepare('INSERT INTO orderList (ticketId,displayName, description, user) VALUES (?, ?, ? ,?)');
		stmt.run(row[0].ID, row[0].displayName, row[0].description, id);
		stmt.finalize();
		res.send({
			message: 'order success',
			order: row,
			userId: id
		});
	});
});

module.exports = router;
