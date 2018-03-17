# spatial-layers

Contained here are KMZ and JSON Files useful for Berkeleymapper and other mapping applications in use at the the Berkeley Natural History Museums.
All data hosted here is understood to be publically available.

What is loaded currently:

| Data layer name   |      owner/agency     |  source  |   remarks   |
|----------         |:-------------:        |:------: |----------     |
| 7.5 min topoquads |  USGS               | [Downloaded from ArcGIS Online](http://www.arcgis.com/home/item.html?id=4bf2616d2f054fbe92eadcdc9582a765) | This layer presents the geographic extent of USGS 1:24,000 topographic maps (7.5- by 7.5-minute quadrangles) for the conterminous U.S. forty-eight states and District of Columbia. It provides quadrangle name, identification number, publication data, and map coverage by state for each quadrangle.  This large-scale index grid is appropriate for display at more detailed scales.     |
| cpad layers |  local, state, and federal  | [Downloaded CPAD layers](http://www.calands.org/) | Contained in the CPAD directory are local, state, and federal layers automatically harvested from CPAD and converted to geoJSON using scripts/runCpad.sh     |

What we're working on:

| Data layer name   |      owner/agency     |  source  |   remarks   |
|----------         |:-------------:        |:------: |----------     |
| California Subregional Hydrological Units (HUC)   |    NRCS (USDA)    |   [Available here at NRCS data](http://www.nrcs.usda.gov/wps/portal/nrcs/main/national/water/watersheds/dataset/)   | Metadata: http://www.nrcs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb1042207.pdf (subregional codes for California Province); Bezier smoothing applied to KMZ  |
| Terrestrial ecoregions (biome level?)         | World Wildlife Fund                | [Available here at WWF](http://www.worldwildlife.org/publications/terrestrial-ecoregions-of-the-world)    | Assuming that Global Biomes will be useful; 15 biomes just for North America (versus 151 ecoregions at next resolution |
