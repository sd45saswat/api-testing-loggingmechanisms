const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import the server

const { expect } = chai;
chai.use(chaiHttp);

describe('API Testing', () => {

  it('GET /api/hello should return Hello World!', (done) => {
    chai.request(app)
      .get('/api/hello')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Hello World!');
        done();
      });
  });

  it('POST /api/echo should echo the sent body', (done) => {
    const sampleData = { name: 'John Doe' };
    chai.request(app)
      .post('/api/echo')
      .send(sampleData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.youSent).to.deep.equal(sampleData);
        done();
      });
  });

  it('GET /api/error should return an error', (done) => {
    chai.request(app)
      .get('/api/error')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });

});
