function logger(req, res, next) {
    const dataHora = new Date().toLocaleString("pt-PT");
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = logger;