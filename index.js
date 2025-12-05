const express = require("express");
const app = express();
const connectDB = require("./Models/db");

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

app.listen(3000, () => console.log("Servidor a correr na porta 3000..."));
