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

if (process.argv.length < 4) {
    console.log("Usage: node runCpad.js agency_name agency_type");
    console.log("e.g. node runCpad.js State University+of+Caliifornia");
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
	var geoJsonObj = []


        // Loop the results element of the data object.
	// Each results is unique by unit_id and not name.
	// Hence each name by represented multiple times here.
	// De-duplication is handled by the catGeometries functions
	for (let j = 0; j < results.length; j++) {
		//retrieve 'name' value to make .wkt name
		var name = results[j].name;
		var multipolygon = results[j].wkt;
		var id = results[j].unit_id;

		//if the 'name' property is null, name the file by the unit_id
		if (name == null){
			var name = id
			geoJsonObj = catGeometries.appender(geoJsonObj, id, multipolygon)
		}else {
		
			// use the catGeometries.appender here
			//var name = name.replace(/\s/g,'').replace(/[\.]/g,'').replace(/[\,]/g,'').replace(/[\-]/g,'').replace(/Ã±/g,'n')
			var name = name.replace(/[\.]/g,'').replace(/[\,]/g,'').replace(/[\-]/g,'').replace(/Ã±/g,'n').replace(/[\/]/g,'')
			geoJsonObj = catGeometries.appender(geoJsonObj, name, multipolygon)
			}
	}
	
	// Pack features, convert to WKT to geoJSON and de-duplicate the names
	geoJsonObj = catGeometries.packFeatures(geoJsonObj)

	agency_type = agency_type.replace(/\+/g,'')
	agency_name = agency_name.replace(/\+/g,'')
	var directoryName = output_dir + "/" + agency_type + "/" + agency_name

	//mkdirp(dir,options,callback)
	mkdirp(directoryName,writer);
	
	function writer(oops, absoluteName){
	
			function oops (err) {
    			if (err) console.error(err)
		 	else console.log('making directory' + directoryName)
			};

		// Loop JSON results
		for (let i = 0; i < geoJsonObj.length; i++) {

		//this function makes variable absoluteName available in this block 
			(function(absoluteName){
			//prepare to write file
			var name = geoJsonObj[i].properties.name;
			name = name.replace(/\s/g,'').concat('.geojson')
			var absoluteName = directoryName + "/" + name
		//write file	
			fs.writeFile(absoluteName, JSON.stringify(geoJsonObj[i]) , (err) => {
				if (err) throw err;		
				console.log('saving ' + absoluteName);
			});	
			
			})(i);	

		}
	}
	
})



