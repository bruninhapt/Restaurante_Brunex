const express = require("express");
const router = express.Router();
const Prato = require("../Models/prato");

// GET - todos os pratos
router.get("/", async (req, res) => {
    try {
        const pratos = await Prato.find();
        res.status(200).json(pratos);
    } catch {
        res.status(500).send("Erro ao obter os pratos.");
    }
});

// GET - prato por código
router.get("/:cod", async (req, res) => {
    const cod = parseInt(req.params.cod);

    if (isNaN(cod)) {
        return res.status(400).send("O código deve ser numérico.");
    }

    try {
        const prato = await Prato.findOne({ codigo: cod });
        if (!prato) return res.status(404).send("Prato não encontrado.");
        res.status(200).json(prato);
    } catch {
        res.status(500).send("Erro na pesquisa.");
    }
});

// EXTRA: GET por categoria
router.get("/categoria/:cat", async (req, res) => {
    try {
        const pratos = await Prato.find({ categoriaPrato: req.params.cat });

        if (pratos.length === 0)
            return res.status(404).send("Nenhum prato encontrado nessa categoria.");

        res.status(200).json(pratos);
    } catch {
        res.status(500).send("Erro ao pesquisar categoria.");
    }
});

// POST - adicionar prato
router.post("/", async (req, res) => {
    try {
        const novoPrato = new Prato(req.body);
        await novoPrato.save();
        res.status(201).send("Prato criado com sucesso.");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PATCH - atualizar prato
router.patch("/:cod", async (req, res) => {
    try {
        const prato = await Prato.findOneAndUpdate(
            { codigo: parseInt(req.params.cod) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!prato) return res.status(404).send("Prato não encontrado.");

        res.status(200).send("Prato atualizado com sucesso.");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// DELETE - 1 prato
router.delete("/:cod", async (req, res) => {
    try {
        const prato = await Prato.findOneAndDelete({ codigo: parseInt(req.params.cod) });

        if (!prato) return res.status(404).send("Prato não encontrado.");

        res.status(200).send("Prato removido com sucesso.");
    } catch {
        res.status(500).send("Erro ao remover prato.");
    }
});

// DELETE - todos os pratos
router.delete("/", async (req, res) => {
    try {
        await Prato.deleteMany({});
        res.status(200).send("Todos os pratos foram apagados.");
    } catch {
        res.status(500).send("Erro ao apagar pratos.");
    }
});

module.exports = router;
