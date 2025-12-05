const express = require("express");
const app = express();
const connectDB = require("./Models/db");
require("dotenv").config({ quiet: true });

// Middleware JSON
app.use(express.json());

// Ligar à base de dados
connectDB();

// Importar middleware de autenticação
const authBasic = require("./Middleware/auth");

// Importar rotas
const menuRoutes = require("./Controllers/menu_do_dia");

// Proteger apenas as rotas do menu
app.use("/menu", authBasic, menuRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Servidor a correr na porta ${process.env.PORT}...`)
);
