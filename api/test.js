jest.mock('./index', () => {
    return jest.fn(() => {
        // Mock the express app here if needed
        return {
            // Mock your express app methods here if needed
        };
    });
});

const app = require('./index');
const request = require('supertest');

describe('Get hotels', () => {
    it('devrait retourner une liste d\'hôtels pour une ville donnée', async () => {
        const cityName = 'Nancy';
        const response = request(app) // Utilisez le serveur plutôt que l'application Express
            .get(`/hotels/${cityName}`)
            .expect(200);
    },);
});

describe('Get Transports', () => {
    it('devrait retourner une liste de transports pour une ville donnée', async () => {
        const cityName = 'Nancy';
        const response = request(app) // Utilisez le serveur plutôt que l'application Express
            .get(`/transports/${cityName}`)
            .expect(200);
    },);
});

describe('Get Restaurants', () => {
    it('devrait retourner une liste de transports pour une ville donnée', async () => {
        const cityName = 'Nancy';
        const response = request(app) // Utilisez le serveur plutôt que l'application Express
            .get(`/restaurants/${cityName}`)
            .expect(200);
    },);
});

describe('Get Evenements', () => {
    it('devrait retourner une liste de transports pour une ville donnée', async () => {
        const cityName = 'Nancy';
        const response = request(app) // Utilisez le serveur plutôt que l'application Express
            .get(`/events/${cityName}`)
            .expect(200);
    },);
});

describe('Add to Favorite', () => {
    it('devrait ajouter un favori avec succès', async () => {
        const userId = 1;
        const id = 12345;
        const response = request(app)
            .post(`/favorite/${id}/${userId}`)
            .expect(201);
    });
});

describe('Get Favorite List', () => {
    it('devrait retourner la liste des favoris pour un utilisateur donné', async () => {
        const userId = 1;
        const response = request(app)
            .get(`/favorite/${userId}`)
            .expect(200);
    });
});