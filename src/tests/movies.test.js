const request = require('supertest')
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('GET/ Should return all the movies', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
  
});

test('POST/ Should create movies and return the result', async() => {
    const body = {
            name: "Titanic",
            image: "url",
            synopsis: "Titanic es una película estadounidense de 1997, dramática y de catástrofe, dirigida y escrita por James Cameron y protagonizada por Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates, Gloria Stuart y Bill Paxton.2​3​ La trama, una epopeya romántica,3​4​ relata la relación de Jack Dawson y Rose DeWitt Bukater",
            releaseYear: "1997"
    }
    const res = await request(app).post('/movies').send(body)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ movies:id Deberia actualizar las peliculas por su id', async() => {
    const body = {
        name: "Piratas Del Caribe"
    }

    const res = await request(app).put(`/movies/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);

});

test('POST/ movies/:id/genres  Should insert the genre in the movies by their id', async() => {
    const genre = await Genre.create({
        name: "Drama"

    })
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);

    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Drama');
});

test('POST/ movies/:id/actors You must insert the actors in the movies by their id', async() => {
    const actor = await Actor.create({
        firstName: "Johnny",
        lastName: "Depp",
        nationality: "Estadounidense",
        image: "https://es.wikipedia.org/wiki/Archivo:Johnny_Depp_2020.jpg",
        birthday: "06-09-1963"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])

    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe('Johnny')
});

test('POST/ movies/:id/directors You must insert the directors in the movies by their id', async() => {
    const director = await Director.create({
        firstName: "Joachim",
        lastName: "Ronning",
        nationality: "Noruega",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/James_Cameron_by_Gage_Skidmore.jpg/220px-James_Cameron_by_Gage_Skidmore.jpg",
        birthday: "06-30-1972"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])

    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Joachim")
});

test('DELETE/ Should delete the movies by their id', async() =>{
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
});

