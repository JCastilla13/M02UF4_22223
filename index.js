#!/bin/node

//#!/usr/bin/env node



const http = require('http');

http.createServer(function(request, result){
	console.log("Alguien se conecta");
	result.write('ola k ase');
	result.end();
}).listen(8080);
