const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Ocorreu um erro interno. Tente novamente mais tarde."});
}

module.exports = errorHandler