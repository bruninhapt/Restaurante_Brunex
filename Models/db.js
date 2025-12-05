const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("Ligado ao MongoDB Atlas!");
    } catch (err) {
        console.error("Erro ao ligar ao MongoDB:", err);
    }
}

module.exports = connectDB;
