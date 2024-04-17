const express = require("express");
const cors = require("cors");
const { signup, login } = require("../Controllers/userController");
const { fetchHotelsByCityFromOverpass, fetchActivityAndSportsByCityFromOverpass, fetchRestaurantAndBarByCityFromOverpass, fetchTransportFromOverpass, AddtoHistory, getHistoryList, addToFavorite, getFavoriteList, getListTrajet, AjouterUnTrajet } = require("../Controllers/tourismController");

const app = express();

// Utilisez cors pour gérer les autorisations CORS
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('hello world');
});

app.post('/signup', signup);
app.post('/login', login);

app.get('/hotels/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const hotels = await fetchHotelsByCityFromOverpass(cityName, searchValue);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/events/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const events = await fetchActivityAndSportsByCityFromOverpass(cityName, searchValue);
        res.json(events);
    } catch (error) {
        console.error(`Erreur lors de la récupération des événements à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des événements à ${cityName}` });
    }
});

app.get('/restaurants/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const restaurants = await fetchRestaurantAndBarByCityFromOverpass(cityName, searchValue);
        res.json(restaurants);
    } catch (error) {
        console.error(`Erreur lors de la récupération des restaurants à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des restaurants à ${cityName}` });
    }
});

app.get('/transports/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const transports = await fetchTransportFromOverpass(cityName, searchValue);
        res.json(transports);
    } catch (error) {
        console.error(`Erreur lors de la récupération des transports à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des transports à ${cityName}` });
    }
});

app.post('/history/:id', AddtoHistory);

app.get('/history/:id', getHistoryList);

app.post('/favorite/:id/:userId', addToFavorite);

app.get('/favorite/:id', getFavoriteList);

app.post('/trajet/:id', AjouterUnTrajet);

app.get('/trajet/:id', getListTrajet);
module.exports = app;
