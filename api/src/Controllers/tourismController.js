const axios = require('axios')


async function fetchHotelsByCityFromOverpass(cityName) {
    const overpassQuery = `[out:json][timeout:25];
                           area["name"="${cityName}"]->.boundaryarea;
                           node["tourism"="hotel"](area.boundaryarea);
                           out body;
                           >;
                           out skel qt;`;

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    
    try {
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.elements;
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        throw error;
    }
}

async function fetchActivityAndSportsByCityFromOverpass(cityName) {
    const overpassQuery = `[out:json][timeout:25];
                            area[name="${cityName}"]->.searchArea;
                            (
                            node["tourism"="museum"](area.searchArea);
                            node["tourism"="artwork"](area.searchArea);
                            node["tourism"="gallery"](area.searchArea);
                            
                            node["leisure"="sports_centre"](area.searchArea);
                            node["leisure"="stadium"](area.searchArea);
                            node["leisure"="swimming_pool"](area.searchArea);
                            );
                            
                            out body;
                            >;
                            out skel qt;`;

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    
    try {
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.elements;
    } catch (error) {
        console.error(`Erreur lors de la récupération des évenements culturels et sportifs à ${cityName}:`, error);
        throw error;
    }
}

async function fetchTransportFromOverpass(cityName) {
    const overpassQuery = `[out:json][timeout:25];
    area[name="${cityName}"]->.searchArea;
    (
      node(area.searchArea)["amenity"="bus_station"];
      node(area.searchArea)["amenity"="taxi"];
      node(area.searchArea)["amenity"="train_station"];
      node(area.searchArea)["amenity"="subway_station"];
      node(area.searchArea)["amenity"="tram_station"];
    );
    
    out body;
    >;
    out skel qt;`;

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    
    try {
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.elements;
    } catch (error) {
        console.error(`Erreur lors de la récupération des transports à ${cityName}:`, error);
        throw error;
    }
}

async function fetchRestaurantAndBarByCityFromOverpass(cityName) {
    const overpassQuery = `[out:json][timeout:25];
                            area[name="${cityName}"]->.searchArea;
                            (
                                // Recherche des restaurants
                                node(area.searchArea)["amenity"="restaurant"];
                                node(area.searchArea)["amenity"="fast_food"];
                                node(area.searchArea)["amenity"="cafe"];
                              
                                // Recherche des bars
                                node(area.searchArea)["amenity"="bar"];
                            );
                            
                            out body;
                            >;
                            out skel qt;`;

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    
    try {
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.data.elements;
    } catch (error) {
        console.error(`Erreur lors de la récupération des restaurants et bars à ${cityName}:`, error);
        throw error;
    }
}

module.exports = {
    fetchHotelsByCityFromOverpass,
    fetchActivityAndSportsByCityFromOverpass,
    fetchRestaurantAndBarByCityFromOverpass,
    fetchTransportFromOverpass
};