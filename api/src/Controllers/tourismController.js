const axios = require('axios');
const db = require("../../models/index");
const favorite = require('../../models/favorite');
const History = db.history;
const Favorite = db.favorite;
const Trajet = db.trajet;



async function fetchHotelsByCityFromOverpass(cityName,searchTerm = null) {
    const overpassQuery = `[out:json][timeout:25];
                           area["name"="${cityName}"]->.boundaryarea;
                           node["tourism"="hotel"](area.boundaryarea);
                        `;

    // Ajouter la recherche si le terme de recherche n'est pas nul
    if (searchTerm !== null) {
        overpassQuery += `node(area.boundaryarea)["name"~"${searchTerm}"];`;
    }
    overpassQuery += `out body;
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

async function fetchActivityAndSportsByCityFromOverpass(cityName,searchTerm = null) {
    const overpassQuery = `[out:json][timeout:25];
                            area[name="${cityName}"]->.searchArea;
                            (
                            node["tourism"="museum"](area.searchArea);
                            node["tourism"="artwork"](area.searchArea);
                            node["tourism"="gallery"](area.searchArea);
                            
                            node["leisure"="sports_centre"](area.searchArea);
                            node["leisure"="stadium"](area.searchArea);
                            node["leisure"="swimming_pool"](area.searchArea);
                            );`;

    // Ajouter la recherche si le terme de recherche n'est pas nul
    if (searchTerm !== null) {
        overpassQuery += `node(area.searchArea)["name"~"${searchTerm}"];`;
    }
    overpassQuery += `out body;
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

async function fetchTransportFromOverpass(cityName,searchTerm = null) {
    const overpassQuery = `[out:json][timeout:25];
    area[name="${cityName}"]->.searchArea;
    (
      node(area.searchArea)["amenity"="bus_station"];
      node(area.searchArea)["amenity"="taxi"];
      node(area.searchArea)["amenity"="train_station"];
      node(area.searchArea)["amenity"="subway_station"];
      node(area.searchArea)["amenity"="tram_station"];
    );`;

    // Ajouter la recherche si le terme de recherche n'est pas nul
    if (searchTerm !== null) {
        overpassQuery += `node(area.searchArea)["name"~"${searchTerm}"];`;
    }
    overpassQuery += `out body;
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

async function fetchBarByCityFromOverpass(cityName,searchTerm = null) {
    const overpassQuery = `[out:json][timeout:25];
                            area[name="${cityName}"]->.searchArea;
                            (
                                // Recherche des bars
                                node(area.searchArea)["amenity"="bar"];
                            );`;

    // Ajouter la recherche si le terme de recherche n'est pas nul
    if (searchTerm !== null) {
        overpassQuery += `node(area.searchArea)["name"~"${searchTerm}"];`;
    }
    overpassQuery += `out body;
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

async function fetchRestaurantByCityFromOverpass(cityName,searchTerm = null) {
    const overpassQuery = `[out:json][timeout:25];
                            area[name="${cityName}"]->.searchArea;
                            (
                                // Recherche des restaurants
                                node(area.searchArea)["amenity"="restaurant"];
                                node(area.searchArea)["amenity"="fast_food"];
                                node(area.searchArea)["amenity"="cafe"];
                            );
                            `;
                            if (searchTerm !== null) {
                                overpassQuery += `node(area.searchArea)["name"~"${searchTerm}"];`;
                            }
                            overpassQuery += `out body;
                            >;
                            out skel qt;`;

    // Ajouter la recherche si le terme de recherche n'est pas nul
    if (searchTerm !== null) {
        overpassQuery += `node(area.searchArea)["name"~"${searchTerm}"];`;
    }
    overpassQuery += `out body;
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

const AddtoHistory = async (req, res) => {
    const { url } = req.body;
    try {
        const history = await History.create({ keyword: url, user_id: req.params.id });
        res.status(201).json({ message: "Historique créé avec succès", history });
    } catch (error) {
        console.error("Erreur lors de la création de l'historique :", error);
        res.status(500).json({ error: "Erreur lors de la création de l'historique" });
    }
}

const getHistoryList = async (req, res) => {
    try {
        const historyList = await History.findAll({
            where: {
                user_id: req.params.id
            }
        })

        res.status(200).json({ historyList });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique' });
    }
};

const addToFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create({ favorite: req.params.id, user_id: req.params.userId })
        res.status(201).json({ message: "Favoris créé avec succès", favorite });
    } catch (error) {
        console.error("Erreur lors de la création du Favoris :", error);
        res.status(500).json({ error: "Erreur lors de la création du Favoris" });
    }
}

const getFavoriteList = async (req, res) => {
    try {
        const favoriteList = await Favorite.findAll({
            where: {
                user_id: req.params.id
            }
        })

        res.status(200).json({ favoriteList });
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des favoris' });
    }
};

const AjouterUnTrajet = async (req, res) => {
    const { depart, arrive } = req.body;
    try {
        const trajet = await Trajet.create({ depart: depart, arrive: arrive, user_id: req.params.id });
        res.status(201).json({ message: "Trajet créé avec succès", trajet });
    } catch (error) {
        console.error("Erreur lors de la création du trajet :", error);
        res.status(500).json({ error: "Erreur lors de la création du trajet" });
    }
}

const getListTrajet = async (req, res) => {
    try {
        const trajetList = await Trajet.findAll({
            where: {
                user_id: req.params.id
            }
        })

        res.status(200).json({ trajetList });
    } catch (error) {
        console.error('Erreur lors de la récupération des Trajets :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des trajets' });
    }
};


module.exports = {
    fetchHotelsByCityFromOverpass,
    fetchActivityAndSportsByCityFromOverpass,
    fetchTransportFromOverpass,
    fetchRestaurantByCityFromOverpass,
    fetchBarByCityFromOverpass,
    AddtoHistory,
    getHistoryList,
    addToFavorite,
    getFavoriteList,
    AjouterUnTrajet,
    getListTrajet
};
