/**
Handle multiple geometries that may be found in the CPAD return
**/
var Terraformer = require('terraformer');
var WKT = require('terraformer-wkt-parser');

// packFeatures operates over a larger geoJsonObject and operates
// row by row, replacing the array of temporary WKT geometries
// that were inserted by the appender with a geometry collection
// object.  This effectively creates a proper GeoJSON object
// During the operation the tempFeatures element is deleted and 
// replaced by the geometries element.
exports.packFeatures = function (geoJsonObj) {
    for (var row in geoJsonObj) {
	var geoJsonRow = geoJsonObj[row]
	// array to hold all the possible multipolygons
	var geometries = []
	for (var feature in geoJsonRow.tempFeatures) {
		// convert the WKT to GeoJSON
		var polygon = WKT.parse(geoJsonRow.tempFeatures[feature])
		// push the polygon into the geometries array
		geometries.push(polygon)
	}	
	// create the geometry collectioh
	var geometryCollection = new Terraformer.GeometryCollection(geometries)

	// Remove the tempFeatures row now that we're done
	delete geoJsonRow.tempFeatures;
	// Combine the properties with the geometryCollection we created
	geoJsonObj[row] = Object.assign({},geoJsonRow,geometryCollection)
    }
    return geoJsonObj

},

// Append names and geometries to a geoJsonObject.  
// This function takes parameters geoJsonObj, name, geometry
// Returns the geoJsonObj with name and a tempGeometry object apended
exports.appender = function (geoJsonObj, name, geometry) {
	// Search for element in the geoJsonObj with a name value equal to the name parameter 
	var found = geoJsonObj.find(value => value.properties.name === name)

	// if found is not undefined we push the new geometry onto the geometries stack
	if (found) {
		found.tempFeatures.push(geometry)
	// If not found then we create a new object and push the new geometry onto the stack
	} else {
		var l = {}
		l.tempFeatures = [geometry]
		l.properties = {name:name}
		geoJsonObj.push(l)
	}
	return geoJsonObj;
}

