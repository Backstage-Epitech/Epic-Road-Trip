const express = require("express");
const cors = require("cors");
const { signup, login } = require("../Controllers/userController");
const { fetchHotelsByCityFromOverpass, fetchActivityAndSportsByCityFromOverpass, fetchRestaurantAndBarByCityFromOverpass, fetchTransportFromOverpass, AddtoHistory, getHistoryList } = require("../Controllers/tourismController");

const app = express();

// Utilisez cors pour gérer les autorisations CORS
app.use(cors());

app.get('/', (req, res, next) => {
    res.send('hello world');
});

app.post('/signup', signup);
app.post('/login', login);

app.get('/hotels/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchHotelsByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/events/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchActivityAndSportsByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/restaurants/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchRestaurantAndBarByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/transports/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchTransportFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.post('/history/:id', AddtoHistory)

app.get('/history/:id', getHistoryList)



module.exports = app
