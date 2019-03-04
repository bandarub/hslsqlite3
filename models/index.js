const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

var file = 'users';
var db = new sqlite3.Database(file);

db.serialize(function() {
	db.run(
		'CREATE TABLE IF NOT EXISTS user ( ID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT NOT NULL, email VARCHAR(320) NOT NULL UNIQUE, password TEXT NOT NULL)'
	);
	db.run(
		'CREATE TABLE IF NOT EXISTS orderList ( ID INTEGER PRIMARY KEY AUTOINCREMENT, ticketId TEXT NOT NULL, displayName TEXT NOT NULL, description TEXT NOT NULL,  user INTEGER NOT NULL,FOREIGN KEY(user) REFERENCES user(ID))'
	);
	db.run(
		'CREATE TABLE IF NOT EXISTS ticketTypes ( ID TEXT NOT NULL UNIQUE, displayName TEXT NOT NULL UNIQUE, description TEXT NOT NULL UNIQUE)'
	);
});

module.exports = db;
