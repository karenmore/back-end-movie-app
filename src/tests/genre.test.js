const request = require('supertest')
const app = require('../app');

let id;

test('GET/ Return all genres', async() => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST/ Create the genres and return the result', async() => {
    const body  = {
            name: "Drama"
    }
    const res = await request(app).post('/genres').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT/ genres:id Should update the genres by the id', async() => {
    const body = {
        name: "Accion"
    }
    const res = await request(app).put(`/genres/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE/ genres:id Should eliminate the genres by id', async() => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
})