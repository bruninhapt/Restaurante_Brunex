const mongoose = require("mongoose");

const pratoSchema = new mongoose.Schema({
    codigo: { 
        type: Number, 
        required: [true, "O código do prato é obrigatório."],
        unique: true,
        min: [1, "O código deve ser maior que 0."]
    },

    nomePrato: { 
        type: String, 
        required: [true, "O nome do prato é obrigatório."],
        minlength: [3, "O nome deve ter pelo menos 3 caracteres."],
        maxlength: [50, "O nome não pode ter mais de 50 caracteres."]
    },

    categoriaPrato: { 
        type: String, 
        required: [true, "A categoria do prato é obrigatória."],
        minlength: [3, "Categoria demasiado curta."]
    },

    tipoPrato: { 
        type: String,
        required: [true, "O tipo de prato é obrigatório."],
        enum: {
            values: ["normal", "vegetariano", "vegan", "infantil"],
            message: "Tipo inválido (normal, vegetariano, vegan, infantil)."
        }
    },

    preco: {
        type: Number,
        min: [0, "O preço deve ser positivo."],
        validate: {
            validator: v => v >= 0,
            message: "Preço inválido. Tem de ser maior ou igual a 0."
        }
    }

}, { timestamps: true });

module.exports = mongoose.model("Prato", pratoSchema, "Pratos");

