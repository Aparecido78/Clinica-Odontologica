require('dotenv').config(); // Puxa variáveis do .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,   // nome do banco
  process.env.DB_USER,   // usuário
  process.env.DB_PASS,   // senha
  {
    host: process.env.DB_HOST, // host
    port: process.env.DB_PORT, // porta
    dialect: 'mysql',          // usando MySQL
    logging: false,            // desativa logs do SQL
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao MySQL com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao MySQL:', err));

module.exports = sequelize;
