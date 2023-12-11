// products.test.mjs
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app.js'; 
import productrouter from '../../Routes/products.js';

const { expect } = chai;
const request = supertest(app);

describe('Products Router', () => {
  it('should get all products', async () => {
    const response = await request.get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  
  });

  it('should get a product by ID', async () => {
    const response = await request.get('/api/products/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  
  });

  it('should create a new product', async () => {
    const response = await request.post('/api/products').send({ /* datos de prueba */ });
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
   
  });

 
});