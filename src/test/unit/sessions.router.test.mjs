import supertest from 'supertest';
import chai from 'chai';
import app from '../../app.js'; 
import sessionRouter from '../../Routes/sessions.router.js'; 

const { expect } = chai;
const request = supertest(app);

describe('Sessions Router', () => {
  it('should handle user login', async () => {
    const response = await request.post('/api/login').send({ /* datos de prueba */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    
  });

  it('should handle user logout', async () => {
    const response = await request.post('/api/logout').send({ /* datos de prueba */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    
  });

 
});