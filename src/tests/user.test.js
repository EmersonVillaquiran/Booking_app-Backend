const request = require('supertest');
const app = require('../app.js');

let id;
let token;

// 1. Va el post /users
// 2. Post /users/login 

test("POST /users should add a users", async () => {
    const newUser = {
        firstName: "Camilo",
        lastName: "Villa",
        email: "camilo2@gmail.com",
        password: "camilo1234",
        gender: "Any"
    }
    const res = await request(app).post("/users").send(newUser);
        
        id = res.body.id;
		expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(newUser.name);
});

test('POST /users/login debe logger al usuario', async () => {
    const credentials = {
        email: 'camilo2@gmail.com',
        password: 'camilo1234',
    }
    const res = await request(app).post('/users/login').send(credentials);

    token = res.body.token 
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);
});

test("GET /users should return all users", async() => {
    const res = await request(app).get("/users").set('Authorization', `Bearer ${token}`);
		expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users should update a users", async () => {
    const updatedUsers = {
        firstName: "Camilo Actualizado", 

}
const res = await request(app).put(`/users/${id}`).send(updatedUsers).set('Authorization', `Bearer ${token}`);
            console.log(res.body)
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(updatedUsers.name);
});


test('POST  /users/login con credenciales incorrectas debe dar error', async() => {
    const credentials = {
        email: 'incorrecto@gmail.com',
        password: '1234',
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);

});

test("DELETE /users should delete a users", async () => {
    const res = await request(app)
    .delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(204);
});

