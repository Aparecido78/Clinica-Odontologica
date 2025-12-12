const database = require("../configuracao/config");

async function testConnection() {
  try {
    await database.authenticate();
    console.log("Conexão bem-sucedida!");
  } catch (err) {
    console.log("Erro ao conectar:", err);
  }
}

testConnection();
