// Middleware pour vérifier si l'utilisateur est authentifié
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Unauthorized');
}

// Exportez votre middleware pour qu'il soit accessible depuis d'autres fichiers
module.exports = {
    isLoggedIn
};