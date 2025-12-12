const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});

sequelize.authenticate()
  .then(() => console.log("Conectado ao PostgreSQL no Render!"))
  .catch(err => console.error("Erro ao conectar ao PostgreSQL:", err));

module.exports = sequelize;
