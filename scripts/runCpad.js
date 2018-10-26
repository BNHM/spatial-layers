// Create a request object
var request = require('request');
var fs = require('fs');
var catGeometries = require('./catGeometries')
var output_dir = "../cpad"
var path = require('path')
var mkdirp = require('mkdirp');




// Define a function called fetchCPAD which then returns a promise
// that is filled with data when it is resolved
var fetchCPAD = function(agency_type, agency_name) {
    return new Promise(function(resolve,reject) {
        // The base URL to call.  This includes everything except our POST params
        var url = "http://www.mapcollaborator.org/cpad/search/by_agency" 
        // The headers to send in our request
        var headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
        // Here are the POST parameters
        var formData = 'agency_type='+agency_type +'&agency_name='+agency_name;

        // Make the request and the callback is a function with
        // error (1st param) =  error message, if applicable
        // response (2nd param) = all of the metadata about the response itself.  lengthy
        // data (3rd param) = just the JSON data that is returned
        request.post({
            headers: headers,
            url: url,
            method: "POST",
            form: formData 
        }, function (error, response, data){
		response.setEncoding('binary');
		if (error) {
			reject()
		} else {
            		resolve(response.body);
		}
        });
    });
}

//command line response for undefined parameters
if (process.argv.length < 4) {
    console.log("Usage: node run.js agency_name agency_type");
    console.log("e.g. node run.js State University+of+Caliifornia");
    process.exit(-1);
}
//process.argv[] returns an array of CLI arguments [execute path, fileToExecute, arg1, arg2]
var agency_type = process.argv[2]
var agency_name = process.argv[3]

// Call the fetchCPAD function and then process the data
// that is returned
fetchCPAD(agency_type,agency_name).then(function(data) {
	var dataObj = JSON.parse(data)
	var results = dataObj.results
	if (results.length == 0) {
		console.log("Warning, no results found for agency_name = " + agency_name + ", agency_type = " + agency_type)
		process.exit()
	}
	var geoJsonObj = []

        // Loop the results element of the data object.
	// De-duplication is handled by the catGeometries functions
	results.forEach(function (results){
		//retrieve 'name' value to make .wkt name
		var name = results.name;
		var multipolygon = results.wkt;
		//if the 'name' property is null, skip over the property
		if (name == null)return;
		var name = name.replace(/[\.]/g,'').replace(/[\,]/g,'').replace(/[\-]/g,'')
		.replace(/Ã±/g,'n').replace(/[\/]/g,'')
		// use the catGeometries.appender here
		geoJsonObj = catGeometries.appender(geoJsonObj, name, multipolygon)
	})

	// Pack features, convert to WKT to geoJSON and de-duplicate the names
	geoJsonObj = catGeometries.packFeatures(geoJsonObj)
	//prepare command line variables to be file titles
	agency_type = agency_type.replace(/\+/g,'')
	agency_name = agency_name.replace(/\+/g,'')
	var directoryName = output_dir + "/" + agency_type + "/" + agency_name	
	//mkdirp(dir,options,callback)
	mkdirp(directoryName, (err) => {
   		if (err) throw err;
	 	console.log('making directory ' + directoryName);	
		// Loop JSON results
		geoJsonObj.forEach(function(geoJsonObj){		
		var name = geoJsonObj.properties.name;
		name = name.replace(/\s/g,'').concat('.geojson')
		var absoluteName = directoryName + "/" + name
		//write file
		fs.writeFile(absoluteName, JSON.stringify(geoJsonObj) , (err) => { 
			if (err) throw err;		
			console.log('saving ' + absoluteName);
			});	
		});
	})
})



