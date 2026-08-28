const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/database');
const Coupon = require('../src/models/Coupon');

jest.mock('../src/models/Coupon');

describe('Taller de Testing: Validación de Cupones', () => {

  describe('Bloque 1 - Prueba Unitaria con Mocking (Sin BD)', () => {
    it('Debería retornar 200 y el porcentaje si el cupón existe', async () => {
      Coupon.findOne.mockResolvedValueOnce({ discount_percentage: 20 });

      const res = await request(app)
        .post('/api/coupons/validate')
        .send({ code: 'SUMMER20' });

      expect(res.status).toBe(200);
      expect(res.body.discount_percentage).toBe(20);
      expect(Coupon.findOne).toHaveBeenCalledWith({ where: { code: 'SUMMER20' } });
    });
  });

  describe('Bloque 2 - Prueba de Integración con SQLite', () => {
    
    beforeAll(async () => {
      await sequelize.sync({ force: true });
      await Coupon.create({ code: 'WINTER30', discount_percentage: 30 });
    });

    afterAll(async () => {
      await sequelize.close();
    });

    it('Debería validar un cupón real insertado en la base de datos', async () => {
      const res = await request(app)
        .post('/api/coupons/validate')
        .send({ code: 'winter30' }); 

      expect(res.status).toBe(200);
      expect(res.body.discount_percentage).toBe(30);
    });
  });

});