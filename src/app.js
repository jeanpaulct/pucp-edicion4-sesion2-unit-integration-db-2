const express = require('express');
const { validateCoupon } = require('./controllers/couponController');

const app = express();
app.use(express.json());

app.post('/api/coupons/validate', validateCoupon);

module.exports = app;