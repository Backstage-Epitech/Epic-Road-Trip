const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '875894240754-0v0mrdsmalo8qq40l64ljilaahpfdemn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID : GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8081/google/callback",
    passReqToCallback: true
},                                                          

function(request,accessToken,refreshToken,profile,done){
        return done(null,profile);
}
));

passport.serializeUser(function(user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
})

// Middleware pour vérifier si l'utilisateur est authentifié
function isLoggedIn(req, res, next) {
    // Si l'utilisateur est authentifié, passez à la prochaine étape
    if (req.isAuthenticated()) {
        return next();
    }
    // Sinon, redirigez l'utilisateur vers une page de connexion ou renvoyez une erreur non autorisée
    res.status(401).send('Unauthorized');
}
