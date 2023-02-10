#!/bin/node

//#!/usr/bin/env node



const http = require('http');
const { MongoClient } = require('mongodb');
const fs = require('fs')

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

		response.write(JSON.stringify(names));
		response.end();

	});
}

function send_age (response, url)
{

if (url.length < 3){

	response.write("ERROR: Introduce un personaje");
	response.end();
	return;
  
}
collection = db.collection('characters');
console.log(url);

	collection.find({"name":url[2]}).project({_id:0,age:1}).toArray().then(character => {
		console.log(character);
		  if (character.length == 0){
			response.write("ERROR: Edad Erronea");
			response.end();
			return;
		}

		/*let data = {
			age: character[0].age
		};*/
		

		response.write(JSON.stringify(character[0]));
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
		fs.readFile("index.html", function (err, data){
			if(err){
				console.error(err);
				response.writeHead(404, {'Content-Type':'text/html'});
				response.write("ERROR 404: el archivo no está en este castillo");
				response.end();

				return;
			}
			
			response.writeHead(200, {'Content-Type':'text/html'});
			response.write(data);
			response.end();

		});

	}
	
});

	http_server.listen(6969);


