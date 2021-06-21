const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
      const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'testPerformer1', genre: 'testGenre1', price: 20, day: 3, image: '/img/uploads/testImage1.jpg' });
      await testConcertOne.save();

      const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee49', performer: 'testPerformer2', genre: 'testGenre2', price: 30, day: 3, image: '/img/uploads/testImage2.jpg' });
      await testConcertTwo.save();

      const testConcertThree = new Concert({ _id: '5d9f1159f81ce8d1ef2bee50', performer: 'testPerformer3', genre: 'testGenre3', price: 40, day: 3, image: '/img/uploads/testImage3.jpg' });
      await testConcertThree.save();
  });

  it('/ should return all concerts', async () => {
      const res = await request(server).get('/api/concerts');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);
  });

  it('/:id should return one concert by :id ', async () => {
      const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
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

  after(async () => {
      await Concert.deleteMany();
  });

});