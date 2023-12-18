// cartRouter.test.mjs
import supertest from 'supertest';
import chai from 'chai';
import app from '../app.js'; 
import router from '../Routes/cartRouter.js'; 

const { expect } = chai;
const request = supertest(app);

describe('Cart Router', () => {
  it('should create a new cart', async () => {
    const response = await request.post('/api/cart').send({ /* datos de prueba */ });
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
   
  });

  it('should get a cart by ID', async () => {
    const response = await request.get('/api/cart/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  
  });

  it('should add a product to the cart', async () => {
    const response = await request.post('/api/cart/1/2').send({ /* datos de prueba */ });
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  
  });


});