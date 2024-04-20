const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { signup, login } = require("../controllers/userController");
const { fetchHotelsByCityFromOverpass, fetchActivityAndSportsByCityFromOverpass, fetchTransportFromOverpass, fetchBarByCityFromOverpass, fetchRestaurantByCityFromOverpass } = require("../controllers/tourismController");
require('../controllers/authGoogle')
const passport = require("passport");
const { isLoggedIn } = require("../Middlewares/authMiddleware");

const app = express();
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());

// Utilisez cors pour gérer les autorisations CORS
app.use(cors());

app.get('/auth/google',
    passport.authenticate('google',{scope:['email','profile'] })
);
app.get('/google/callback',
    passport.authenticate('google'),(req,res) =>{
        const user = req.user;
        const accessToken = req.user.token;  
        res.json({ user, accessToken });
    });

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

app.get('/sleep/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const hotels = await fetchHotelsByCityFromOverpass(cityName);
        res.json(hotels);
    } catch (error) {
        console.error(`Erreur lors de la récupération des hôtels à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des hôtels à ${cityName}` });
    }
});

app.get('/enjoy/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const events = await fetchActivityAndSportsByCityFromOverpass(cityName);
        res.json(events);
    } catch (error) {
        console.error(`Erreur lors de la récupération des activités à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des activités à ${cityName}` });
    }
});

app.get('/drink/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const drink = await fetchBarByCityFromOverpass(cityName);
        res.json(drink);
    } catch (error) {
        console.error(`Erreur lors de la récupération des bars à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des bars à ${cityName}` });
    }
});

app.get('/travel/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const travel = await fetchTransportFromOverpass(cityName);
        res.json(travel);
    } catch (error) {
        console.error(`Erreur lors de la récupération des transports à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des transports à ${cityName}` });
    }
});

app.get('/eat/:cityName', async (req, res) => {
    const cityName = req.params.cityName;

    try {
        const eat = await fetchRestaurantByCityFromOverpass(cityName);
        res.json(eat);
    } catch (error) {
        console.error(`Erreur lors de la récupération des restaurants à ${cityName}:`, error);
        res.status(500).json({ message: `Erreur lors de la récupération des restaurants à ${cityName}` });
    }
});



module.exports = app
