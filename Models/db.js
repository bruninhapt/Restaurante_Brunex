const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
    if (isConnected) {
        // já está ligado, reutiliza
        return;
    }
    try {
        await mongoose.connect(process.env.DB_URL);
        isConnected = true;
        console.log("Ligado ao MongoDB Atlas! Ligado a BD: " + mongoose.connection.name);
    } catch (err) {
        console.error("Erro ao ligar ao MongoDB:", err);
        throw err;
    }
}

module.exports = connectDB;
