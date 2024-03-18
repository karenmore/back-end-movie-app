const request = require('supertest');
const app = require('../app');

let id;

test('GET/ All directors should return ', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  
});

test('POST/ Create the actors and return the result', async() => {
    const body = {
        firstName: "Joachim",
        lastName: "Ronning",
        nationality: "Noruega",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/James_Cameron_by_Gage_Skidmore.jpg/220px-James_Cameron_by_Gage_Skidmore.jpg",
        birthday: "06-30-1972"
    }
    const res = await request(app).post('/directors').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ directors:id Should modify the directors by the id', async() => {
    const body = {
        firstName: "Joachim actualizado" 
    }
    const res = await request(app).put(`/directors/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE/ directors:id Should eliminate the directors by id', async() => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
})
