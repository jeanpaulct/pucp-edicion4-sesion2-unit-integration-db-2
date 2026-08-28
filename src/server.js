const app = require('./app');
const { sequelize } = require('./database');

const PORT = process.env.PORT || 3000;

// Sincroniza los modelos con la BD antes de levantar el servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor de Cupones en http://localhost:${PORT}`);
  });
});