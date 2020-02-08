# spatial-layers

Contained here are KMZ, JSON, WKT (etc) files useful for [Berkeleymapper](http://berkeleymapper.berkeley.edu/), [Reservemapper](http://reservemapper.berkeley.edu/), and other biodiversity data applications such as [Arctos](https://arctos.database.museum/SpecimenSearch.cfm), with the support of the Berkeley Natural History Museums.

All data hosted here is understood to be publicly available.

What is loaded currently:

| Directory Name   |      owner/agency     |  source  |   remarks   |
|----------         |:-------------:        |:------: |----------     |
| json | bnhm | digitized reserve boundaries.  unsure of source | The files in this directory are stored as geojson and named using + symbols instead of spaces with a postfix of .geojson (e.g. Younger+Lagoon.geojson) |
| cpad |  local, state, and federal  | [Downloaded CPAD layers](http://www.calands.org/) | Contained in the CPAD directory are local, state, and federal layers automatically harvested from CPAD and converted to geoJSON using scripts/runCpad.sh     |
| ?? |  USGS               | 7.5 min topoquads [Downloaded from ArcGIS Online](http://www.arcgis.com/home/item.html?id=4bf2616d2f054fbe92eadcdc9582a765) | This layer presents the geographic extent of USGS 1:24,000 topographic maps (7.5- by 7.5-minute quadrangles) for the conterminous U.S. forty-eight states and District of Columbia. It provides quadrangle name, identification number, publication data, and map coverage by state for each quadrangle.  This large-scale index grid is appropriate for display at more detailed scales.     |


What we're working on:

| Data layer name   |      owner/agency     |  source  |   remarks   |
|----------         |:-------------:        |:------: |----------     |
| California Subregional Hydrological Units (HUC)   |    NRCS (USDA)    |   [Available here at NRCS data](http://www.nrcs.usda.gov/wps/portal/nrcs/main/national/water/watersheds/dataset/)   | Metadata: http://www.nrcs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb1042207.pdf (subregional codes for California Province); Bezier smoothing applied to KMZ  |
| Terrestrial ecoregions (biome level?)         | World Wildlife Fund                | [Available here at WWF](http://www.worldwildlife.org/publications/terrestrial-ecoregions-of-the-world)    | Assuming that Global Biomes will be useful; 15 biomes just for North America (versus 151 ecoregions at next resolution |
