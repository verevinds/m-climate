module.exports = Portfolio => (req, res) =>
  Portfolio.find(req.query)
    .select('-__v -createdAt -updatedAt')
    .exec((error, portfolio) =>
      error ? console.error(error) : res.status(200).send(portfolio),
    );
