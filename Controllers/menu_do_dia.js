const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Prato = require("../Models/prato");

// GET - todos os pratos
router.get("/", async (req, res) => {
	try {
		const pratos = await Prato.find();
		res.status(200).json(pratos);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro ao obter os pratos.");
	}
});

// EXTRA: GET por categoria (usa o campo 'categoria' do schema)
router.get("/categoria/:cat", async (req, res) => {
	try {
		const pratos = await Prato.find({ categoria: req.params.cat });

		if (pratos.length === 0)
			return res
				.status(404)
				.send("Nenhum prato encontrado nessa categoria.");

		res.status(200).json(pratos);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro ao pesquisar categoria.");
	}
});

// GET - prato por _id
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send("ID inválido.");
	}

	try {
		const prato = await Prato.findById(id);
		if (!prato) return res.status(404).send("Prato não encontrado.");
		res.status(200).json(prato);
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro na pesquisa.");
	}
});

// POST - adicionar prato
router.post("/", async (req, res) => {
	try {
		const novoPrato = new Prato(req.body);
		await novoPrato.save();
		res.status(201).send("Prato criado com sucesso.");
	} catch (err) {
		console.error(err);
		res.status(400).send(err.message);
	}
});

// PATCH - atualizar prato por _id
router.patch("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send("ID inválido.");
	}

	try {
		const prato = await Prato.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!prato) return res.status(404).send("Prato não encontrado.");

		res.status(200).send("Prato atualizado com sucesso.");
	} catch (err) {
		console.error(err);
		res.status(400).send(err.message);
	}
});

// DELETE - 1 prato por _id
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send("ID inválido.");
	}

	try {
		const prato = await Prato.findByIdAndDelete(id);

		if (!prato) return res.status(404).send("Prato não encontrado.");

		res.status(200).send("Prato removido com sucesso.");
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro ao remover prato.");
	}
});

// DELETE - todos os pratos
router.delete("/", async (req, res) => {
	try {
		await Prato.deleteMany({});
		res.status(200).send("Todos os pratos foram apagados.");
	} catch (err) {
		console.error(err);
		res.status(500).send("Erro ao apagar pratos.");
	}
});

module.exports = router;
