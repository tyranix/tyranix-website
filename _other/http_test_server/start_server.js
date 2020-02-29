"use strict";
/*
Simple web server for a SPA.
Specify the pages in the WHITELIST_PATHS constant.
Initially created for the messaging_web_app project.
*/
const http = require('http');
const url = require('url');
const fs = require("fs");
const mime = require("mime");

const HTTP_PORT = 6789;
const CLIENT_RESOURCES_PATH = "."; //web directory path
const INDEX_FILE = "/root.html";

//whitlelist
var clientPagesConfig = {};
eval(`${""+fs.readFileSync(`${CLIENT_RESOURCES_PATH}/config/pagesConfig.js`)} clientPagesConfig = pagesConfig;`);
var WHITELIST_PATHS = ["","/",...Object.keys(clientPagesConfig)];//website pages

var server = http.createServer(onRequest);
server.listen(HTTP_PORT);
console.log("http server started on port " + HTTP_PORT);

function onRequest(request, result){//request event
	console.log("[" + (new Date(Date.now())).toDateString() + "] request received from: " + request.connection.remoteAddress);	
	onWebRequest(url.parse(request.url), function(error, data){
		returnRequest(result, error, data);
	});
}
function returnRequest(res, error, params){
	/*params:{
		mimeType: string
		data: any
	}*/
	if(error){
		console.log("ERROR", error);
		res.statusCode = (error.errorCode||500);
		//displays error message
		var endstring = `<h1>Error ${res.statusCode} </h1><br/>`;
		res.end(endstring);
		return;
	}
	if(params.mimeType){
		res.setHeader("Content-Type", params.mimeType);
	}
	res.statusCode = 200;
	res.end(params.data); //returns
}

function onWebRequest(urlObject, callBack){ //on http request, return the correct file in the website directory
	var path = INDEX_FILE; //defaults
	//test if file exists
	console.log("pathName", urlObject.pathname);
	if(fs.existsSync(CLIENT_RESOURCES_PATH + urlObject.pathname)
		&& urlObject.pathname != "/"){
		path = urlObject.pathname;
		getFileFromWebsitePath(path, callBack);
	} else if(WHITELIST_PATHS.includes(urlObject.pathname.split("/")[0])) {
		getFileFromWebsitePath(path, callBack);
	} else{
		callBack({errorCode:404, clientMsg:"page not found"});
		return;
	}
};

function getFileFromWebsitePath(path, callBack){ //gets file from path
	var pathUrl = CLIENT_RESOURCES_PATH + path;
	fs.readFile(pathUrl, function(error, data){
		callBack(error, {
			mimeType: mime.getType(pathUrl),
			data: data
		});
	});
}