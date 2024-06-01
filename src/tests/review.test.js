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

test("GET /reviews should return all cities", async() => {
    const res = await request(app)
    .get("/reviews")
    .set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test("POST /reviews should add a reviews", async () => {
    const newReview = {
        rating: "5",
        comment: "Muy bien",
        hotelId: 2,
        userId: 28
    }
    const res = await request(app).post("/reviews").send(newReview).set('Authorization', `Bearer ${token}`);
        console.log(res.body)
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.rating).toBe(newReview.rating);
});

test("DELETE /reviews should delete a reviews", async () => {
    const res = await request(app).delete(`/reviews/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
