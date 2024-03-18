const request = require('supertest')
const app = require('../app')

let id;

test('GET / All the actors should return', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
  
});

test('POST / Actors should be created', async () => {
    const body = {
        firstName: "Johnny",
        lastName: "Depp",
        nationality: "Estadounidense",
        image: "https://es.wikipedia.org/wiki/Archivo:Johnny_Depp_2020.jpg",
        birthday: "06-09-1963"
    }
    const res = await request(app).post('/actors').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);

});

test('PUT /actors/:id Should modify the actors by the id', async() => {
    const body = {
        firstName: "Leonardo Actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName)

});

test('DELETE /actors/:id Should eliminate actors by id', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});