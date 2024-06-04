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

test("GET /bookings should return all bookings", async() => {
    const res = await request(app).get("/bookings").set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test("POST /bookings should add a bookings", async () => {
    const newBooking = {
        checkIn: "2024/06/06",
        checkOut: "2024/07/06",
    }
    const res = await request(app).post("/bookings").send(newBooking).set('Authorization', `Bearer ${token}`);
        
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newBooking.name);
});

test("PUT /bookings should update a bookings", async () => {
    const updatedBookings = {
        checkIn: "2024/06/07", 

}
const res = await request(app).put(`/bookings/${id}`).send(updatedBookings).set('Authorization', `Bearer ${token}`);
            console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedBookings.name);
});

test("DELETE /bookings should delete a bookings", async () => {
    const res = await request(app)
    .delete(`/bookings/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(204);
});
