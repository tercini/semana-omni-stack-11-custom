const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INOVADOR', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a INOVADOR', async () => {
        const response = await request(app)
            .post('/inovadores')
            .send({
                name: "Raphael Tercini Costa 3",
                email: "raphaeltercinicosta@gmail.com",
                whatsapp: "16991567473",
                city: "Monte Alto",
                uf: "SP"                
            });
            
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });
});