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
})

test("GET /hotels should return all hotels", async() => {
    const res = await request(app).get("/hotels");
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test("POST /hotels should add a hotels", async () => {
    const newHotel = {
        name: "Camilo",
        description: "Villa",
        price: "200",
        address: "calle 0 carrera 0",
        lat: "10",
        lon:"20"
    }
    const res = await request(app).post("/hotels").send(newHotel).set('Authorization', `Bearer ${token}`);
        
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newHotel.name);
});

test("PUT /hotels should update a hotels", async () => {
    const updatedHotels = {
        name: "Nombre Actualizado", 

}
const res = await request(app).put(`/hotels/${id}`).send(updatedHotels).set('Authorization', `Bearer ${token}`);
            console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedHotels.name);
});

test("DELETE /hotels should delete a hotels", async () => {
    const res = await request(app).delete(`/hotels/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
