const connectDB = require("../Models/db");
const User = require("../Models/user");

async function authBasic(req, res, next) {
	const header = req.headers.authorization;

	// 1) Verificar se o header existe
	if (!header || !header.startsWith("Basic ")) {
		res.set("WWW-Authenticate", 'Basic realm="Restricted Area"');
		return res.status(401).send("Autenticação necessária.");
	}

	try {
		// garantir que a BD está ligada
		await connectDB();
		// 2) Converter Base64 para plain text

		const base64 = header.split(" ")[1];
		const decoded = Buffer.from(base64, "base64").toString("utf-8");

		const [username, password] = decoded.split(":");
		// 3) Verificar na base de dados

		const user = await User.findOne({ username, password });
		const all = await User.find();
		if (!user) {
			res.set("WWW-Authenticate", 'Basic realm="Restricted Area"');
			return res.status(401).send("Credenciais inválidas.");
		}

		// Credenciais válidas → permitir acesso
		req.user = user;
		next();
	} catch (err) {
		console.error(err);
		return res.status(500).send("Erro na autenticação.");
	}
}

module.exports = authBasic;
