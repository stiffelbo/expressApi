const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/', () => {

  before(async () => {
      const testConcertOne = new Concert({ _id: '60ce3581547d66136ca93f7e', performer: 'testPerformer1', genre: 'testGenre', price: 20, day: 1, image: '/img/uploads/testImage1.jpg' });
      await testConcertOne.save();

      const testConcertTwo = new Concert({ _id: '60ce3581547d66136ca93f7f', performer: 'testPerformer2', genre: 'testGenre', price: 30, day: 3, image: '/img/uploads/testImage2.jpg' });
      await testConcertTwo.save();

      const testConcertThree = new Concert({ _id: '60ce3581547d66136ca93f80', performer: 'testPerformer3', genre: 'testGenre2', price: 40, day: 3, image: '/img/uploads/testImage3.jpg' });
      await testConcertThree.save();
  });

  it('/ should return all concerts', async () => {
      const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);
  });

  it('/:id should return one concert by :id ', async () => {
      const res = await request(server).get('/api/concerts/60ce3581547d66136ca93f7e');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;
  });

  it('/random should return one random Concert', async () => {
      const res = await request(server).get('/api/concerts/random');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.length).to.not.be.null;
  });

  it('/should return concert by performer with correct values', async () => {
    const res = await request(server).get('/api/concerts/performer/testPerformer1');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0]).to.have.property('genre').that.is.a('string');        
  });

  it('/should return concerts by genre with correct values', async () => {
    const res = await request(server).get('/api/concerts/genre/testGenre');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(2);
    expect(res.body[0].genre).to.be.equal('testGenre');   
  });

  it('/should return concerts by price range with correct values', async () => {
    const res = await request(server).get('/api/concerts/price/30/40');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(2);
    expect(res.body[0].price).to.be.equal(30);   
  });

  it('/should return concerts by day with correct values', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0].performer).to.be.equal('testPerformer1');   
  });

  after(async () => {
      await Concert.deleteMany();
  });

});