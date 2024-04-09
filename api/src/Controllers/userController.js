// Importation des modules
const bcrypt = require("bcrypt");
const db = require("../../models/index");
const jwt = require("jsonwebtoken");

// Assignation des utilisateurs à la variable User
const User = db.user;

// Inscription d'un utilisateur
// Hachage du mot de passe avant de le sauvegarder dans la base de données avec bcrypt
const signup = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        const { userName, email, password, role, image } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            role,
            image
        };
        // Sauvegarde de l'utilisateur

        // Si les détails de l'utilisateur sont capturés
        // Génération du jeton avec l'id de l'utilisateur et la secretKey dans le fichier .env
        // et ajout du jeton à la réponse


        if (data && data.role == "Admin" || data.role == "User" || data.role == "") {
            // Sauvegarde de l'utilisateur
            const user = await User.create(data);

            const userWithoutPassword = { ...user.get() };
            delete userWithoutPassword.password;
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            // Envoi des détails de l'utilisateur et du jeton
            return res.status(201).send({ user: userWithoutPassword, token });
        } else {
            return res.status(409).send("Details are not correct");

        }
    } catch (error) {
        console.log(error);
    }
};

// Authentification de l'utilisateur
const login = async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { email, password } = req.body;

        // Recherche de l'utilisateur par son email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        // Si l'email de l'utilisateur est trouvé, comparaison du mot de passe avec bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            // Si le mot de passe est le même
            // Génération du jeton avec l'id de l'utilisateur et la secretKey dans le fichier .env
            // et ajout du jeton à la réponse
            if (isSame) {
                const userWithoutPassword = { ...user.get() };
                delete userWithoutPassword.password;
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                console.log("user", JSON.stringify(userWithoutPassword, null, 2));
                console.log(token);
                // Envoi des détails de l'utilisateur et du jeton
                return res.status(201).send({ user: userWithoutPassword, token });
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};



const verifyToken = (req, res, next) => {
    // Récupérer le token du header Authorization
    const token = req.header('Authorization');

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
    }

    try {
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.secretKey);
        console.log('Decoded token:', decoded);

        // Ajouter les données du token à la requête
        req.user = decoded;

        next();
    } catch (error) {
        // En cas d'erreur de vérification du token
        console.log(error);

        return res.status(401).json({ message: 'Accès non autorisé, token invalide' + error });
    }
};

const getUser = async (req, res) => {


    const userId = req.user.id;

    // Recherche de l'utilisateur par son email
    const user = await User.findOne({
        where: {
            id: userId
        }
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ user });

}

const editUser = async (req, res) => {
    const userId = req.params.id;

    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { email, password, role, image, interest } = req.body;

        // Recherche de l'utilisateur par son email
        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Mise à jour des champs de l'utilisateur
        user.email = email;
        user.password = password;
        user.role = role;
        user.image = image;
        user.interest = interest;

        // Sauvegarde des modifications
        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};



module.exports = {
    signup,
    login,
    verifyToken,
    getUser,
    editUser
};
