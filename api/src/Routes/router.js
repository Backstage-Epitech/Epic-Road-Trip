const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { signup, login, loginOrSignUpWithGoogleAuth } = require("../Controllers/userController");
const { fetchHotelsByCityFromOverpass, fetchActivityAndSportsByCityFromOverpass, fetchBarByCityFromOverpass,fetchRestaurantByCityFromOverpass ,fetchTransportFromOverpass, AddtoHistory, getHistoryList, addToFavorite, getFavoriteList, getListTrajet, AjouterUnTrajet } = require("../Controllers/tourismController");
require('../Controllers/authGoogle')
const passport = require("passport");
const { isLoggedIn } = require("../Middlewares/authMiddleware");

const app = express();
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());

// Utilisez cors pour gérer les autorisations CORS
app.use(cors());

app.post('/auth/google', loginOrSignUpWithGoogleAuth);

app.get('/auth/failure',  (req, res) => {
    res.send('something went wrong..');
});

app.get('/logout', isLoggedIn, (req, res) => {
    req.logOut(function(err) {
        if (err) {
            console.error(err);
            return next(err);
        }
        res.redirect('/');
    });
});

app.post('/signup', signup);
app.post('/login', login);

app.get('/sleep/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const hotels = await fetchHotelsByCityFromOverpass(cityName,searchValue);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/enjoy/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const events = await fetchActivityAndSportsByCityFromOverpass(cityName,searchValue);
        res.json(events);
    } catch (error) {
        console.error(`Erreur lors de la récupération des activités à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des activités à ${cityName}` });
    }
});

app.get('/drink/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const drink = await fetchBarByCityFromOverpass(cityName,searchValue);
        res.json(drink);
    } catch (error) {
        console.error(`Erreur lors de la récupération des bars à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des bars à ${cityName}` });
    }
});

app.get('/travel/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const travel = await fetchTransportFromOverpass(cityName,searchValue);
        res.json(travel);
    } catch (error) {
        console.error(`Erreur lors de la récupération des transports à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des transports à ${cityName}` });
    }
});

app.get('/eat/:cityName/:searchValue?', async (req, res) => {
    const cityName = req.params.cityName;
    const searchValue = req.params.searchValue || null;

    try {
        const eat = await fetchRestaurantByCityFromOverpass(cityName,searchValue);
        res.json(eat);
    } catch (error) {
        console.error(`Erreur lors de la récupération des restaurants à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des restaurants à ${cityName}` });
    }
});


app.post('/history/:id', AddtoHistory);
 
app.get('/history/:id', getHistoryList);
 
app.post('/favorite/:id/:userId', addToFavorite);
 
app.get('/favorite/:id', getFavoriteList);
 
app.post('/trajet/:id', AjouterUnTrajet);
 
app.get('/trajet/:id', getListTrajet);

module.exports = app;
