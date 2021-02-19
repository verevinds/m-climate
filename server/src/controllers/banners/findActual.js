module.exports = Brand => (req, res) =>
  Brand.find({
    dateEnd: {
      $gte: new Date().getTime(),
    },
    enable: true,
  })
    .select('-__v')
    .exec((error, brand) =>
      error ? console.error(error) : res.status(200).send(brand),
    );
