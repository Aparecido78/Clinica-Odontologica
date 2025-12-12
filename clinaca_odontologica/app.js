const express = require("express")
const app = express();
require("dotenv").config();


const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");


const database = require("./configuracao/config");


require("./modelos/Admin");
require("./modelos/Cliente");
require("./modelos/Recepcionista");
require("./modelos/Dentista");
require("./modelos/Servicos");
require("./modelos/Agendamentos");
require("./modelos/AnotacoesDentista");
require("./modelos/FichaClinica");

const AdminControlador = require("./controladores/Admin/AdminControlador");


const router_admin = require("./Rotas/Admin/AdminRotas");
const router_admin_perfil = require("./Rotas/Admin/PerfilAdminRotas");
const router_login = require("./Rotas/LoginRotas");
const router_clientes = require("./Rotas/Cliente/ClientesRotas");
const router_cliente_perfil = require("./Rotas/Cliente/PerfilClienteRotas");
const router_dentista = require("./Rotas/Dentista/DentistaRotas");
const router_dentista_perfil = require("./Rotas/Dentista/PerfilDentistaRotas");
const router_recepcionista = require("./Rotas/Recepcionista/RecepcionistaRotas");
const router_recepcionista_perfil = require("./Rotas/Recepcionista/PerfilRecepcionistaRotas");
const router_servicos = require("./Rotas/ServicosRotas");
const router_agendamento = require("./Rotas/AgendmentosRotas");
const router_fichaClinica = require("./Rotas/FichaClinicaRotas");


app.engine("handlebars", engine({
  extname: ".handlebars",
  defaultLayout: "main",
  partialsDir: path.join(__dirname, "views", "partials"),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));

app.use(express.static(path.join(__dirname, "public")));

app.use("/upload", express.static(path.join(__dirname, "upload")));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secreta",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());


app.use((req, res, next) => {
  res.locals.successMessages = req.flash("success") || [];
  res.locals.errorMessages = req.flash("error") || [];
  next();
});


const sair = require("../logout/sair");


app.get("/logout", sair);

app.get("/", (req, res) => res.render("login"));


app.use("/", router_admin);
app.use("/", router_admin_perfil);
app.use("/", router_login);
app.use("/", router_clientes);
app.use("/", router_cliente_perfil);
app.use("/", router_dentista);
app.use("/", router_dentista_perfil);
app.use("/", router_recepcionista);
app.use("/", router_recepcionista_perfil);
app.use("/", router_servicos);
app.use("/", router_agendamento);
app.use("/", router_fichaClinica);


database.sync()
  .then(async () => {
    console.log("Banco conectado com sucesso");

    
    if (AdminControlador?.criarAdminPadrao) {
      await AdminControlador.criarAdminPadrao();
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log("Servidor rodando: http://localhost:" + PORT)
    );
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));

module.exports = app;
