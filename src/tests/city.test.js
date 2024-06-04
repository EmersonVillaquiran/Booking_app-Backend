const request = require('supertest');
const app = require('../app.js');

let id;
let token;

beforeAll(async() => {
    const credentials = {
        email: 'camilo@gmail.com',
        password: 'camilo1234',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token 
});

test("GET /cities should return all cities", async() => {
    const res = await request(app).get("/cities");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test("POST /cities should add a cities", async () => {
    const newCity = {
        name: "Orlando",
        Country: "Estados unidos",
        CountryId: "2",
    }
    const res = await request(app).post("/cities").send(newCity).set('Authorization', `Bearer ${token}`);
        
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newCity.name);
});

test("PUT /cities should update a cities", async () => {
    const updatedCities = {
        name: "Nombre Actualizado", 

}
const res = await request(app).put(`/cities/${id}`).send(updatedCities).set('Authorization', `Bearer ${token}`);
            console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedCities.name);
});

test("DELETE /cities should delete a cities", async () => {
    const res = await request(app).delete(`/cities/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
