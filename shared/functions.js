const fs = require("fs");

function lerMenu(caminho) {
    return new Promise((resolve, reject) => {
        fs.readFile(caminho, "utf8", (err, data) => {
            if (err) return reject(err);

            if (!data || data.trim() === "") {
                return resolve([]);
            }

            try {
                const json = JSON.parse(data);
                resolve(json);
            } catch (e) {
                reject("Erro na leitura");
            }
        });
    });
}

function gravarMenu(caminho, data) {
    fs.writeFile(caminho, JSON.stringify(data), (err) => {
        if (err) console.log(err);
    });
}

module.exports = {
    lerMenu,
    gravarMenu
};