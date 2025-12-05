const mongoose = require("mongoose");

async function connectDB() {
    try {
        
        await mongoose.connect(process.env.DB_URL);
        console.log("Ligado ao MongoDB Atlas! Ligado à BD: " + mongoose.connection.name);
    } catch (err) {
        console.error("Erro ao ligar ao MongoDB:", err);
    }
}

module.exports = connectDB;
