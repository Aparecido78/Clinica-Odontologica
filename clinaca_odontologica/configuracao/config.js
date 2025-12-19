require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err);
  });

module.exports = sequelize;
