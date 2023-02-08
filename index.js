#!/bin/node

//#!/usr/bin/env node



const http = require('http');
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'abascal';

let db;
let collection;

async function db_connect() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
  //const collection = db.collection('documents');

  return 'Conectados a la base de datos MongoDB.';
}

db_connect()
  .then(info => console.log(info))
  .catch(msg => console.error(msg));

function send_characters (response)
{

collection = db.collection('characters');

	collection.find({}).toArray().then(characters => {
		let names = [];
		
		for (let i = 0; i < characters.length; i++){
			names.push(characters[i].name);
		}

		if (request.url == "characters"){
		
			names.push(characters[i].name);
		}
		

		response.write(JSON.stringify(names));
		response.end();

	});
}

function send_age (response, url)
{

if (url.length < 3){

	response.write("ERROR: Edad Erronea");
	response.end();
	return;
}


collection = db.collection('characters');

	collection.find({"name":url[2]}).toArray().then(character => {
		let data = {
			age:character[0].age
		};
		

		response.write(JSON.stringify(data));
		response.end();

	});
}


let http_server =  http.createServer(function(request, response){
	if (request.url == "/favicon.ico"){
		return;
	}
    
	let url = request.url.split("/");

	switch (url[1]){
		case "characters":
		send_characters (response);
			break;
		case "age":
			send_age(response, url);
			break;

	default:
		response.write("Página principal");
		response.end();

	}


	console.log(url);

	console.log(request.url);

	
});

	http_server.listen(6969);


