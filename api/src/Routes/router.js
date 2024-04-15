console.clear()

const express = require("express");
const { signup, login } = require("../Controllers/userController");
const { fetchHotelsByCityFromOverpass, fetchActivityAndSportsByCityFromOverpass, fetchRestaurantAndBarByCityFromOverpass, fetchTransportFromOverpass } = require("../Controllers/tourismController");

const router = express.Router()

router.get('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.send('hello world')
});
router.post('/signup', signup);
router.post('/login', login);

router.get('/hotels/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchHotelsByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

router.get('/events/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchActivityAndSportsByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

router.get('/restaurants/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchRestaurantAndBarByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

router.get('/transports/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchTransportFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

module.exports = router
