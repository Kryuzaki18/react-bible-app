const Books = require('../models').books;

const checkIDInput = (req, res, next) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ msg: 'Invalid ID supplied' });
  next();
};

const checkIDExist = async (req, res, next) => {
  await Books.findByPk(req.params.id)
    .then(data => {
      if (!data) return res.status(200).json({ msg: 'Record not found.' });
      next();
    })
    .catch(error => {
      return res.status(404).json({ msg: 'An error occured.' });
    });
};

module.exports = {
  checkIDInput: checkIDInput,
  checkIDExist: checkIDExist
};
