const express = require('express');
const router = express.Router();
const request = require('request');
const sqlite3 = require('sqlite3').verbose();
const db = require('../../models');

router.get('/', function(req, res) {
	request('https://sales-api.hsl.fi/api/ticket/v3/get/ticketTypes', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);

			// To create Table TicketTypes
			// info.map(ticket => {
			// 	db.run(
			// 		'INSERT INTO ticketTypes(id,displayName,description) VALUES (?,?,?)',
			// 		ticket.id,
			// 		ticket.displayName,
			// 		ticket.description,
			// 		function(err) {
			// 			if (err) {
			// 				res.send({ error: err });
			// 			}
			// 		}
			// 	);
			// });
			res.send(info);
		}
	});
});

router.get('/users', function(req, res) {
	db.all('SELECT ID, userName,email,password FROM user', function(err, rows) {
		if (err) {
			res.send({ error: 'Cannot retreive users API' });
		}
		res.send(JSON.parse(JSON.stringify(rows)));
	});
});

router.get('/orders', function(req, res) {
	db.all('SELECT ID, ticketId,displayName, description, user FROM orderList', function(err, rows) {
		if (err) {
			res.send({ error: 'Cannot retreive orders API' });
		}
		res.send(JSON.parse(JSON.stringify(rows)));
	});
});

module.exports = router;
