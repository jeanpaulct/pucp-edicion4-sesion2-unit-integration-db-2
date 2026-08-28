const Coupon = require('../models/Coupon');

const validateCoupon = async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: 'El código del cupón es requerido' });
  }

  try {
    const cleanCode = code.trim().toUpperCase();

    // Búsqueda directa en la Base de Datos
    const coupon = await Coupon.findOne({ where: { cleanCode } });
    
    if (!coupon) {
      return res.status(404).json({ error: 'Cupón no encontrado o inválido' });
    }
    
    return res.status(200).json({ discount_percentage: coupon.discount_percentage });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { validateCoupon };