const express = require("express");
const Books = require("../models").books;
const { checkIDInput, checkIDExist } = require("../middleware/books");
const router = express.Router();

router.use((req, res, next) => {
  next();
});

/**
 * Get All Records
 */
router.get("/", (req, res) => {
  Books.findAndCountAll()
    .then(results => {
      res.status(200).json(results.rows);
    })
    .catch(err => {
      res.status(400).json(error);
    });
});

/**
 * Get one record
 */
router.get("/:id", [checkIDInput, checkIDExist], (req, res) => {
  Books.findByPk(req.params.id, {
    // include: [{ all: true }]
  })
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
/**
 * Store Record
 */
// router.post("/", (req, res) => {});

/**
 * Update Record
 */
// router.put("/:id", [checkIDInput, checkIDExist], (req, res) => {});

/**
 * Delete Record
 */
// router.delete("/:id", [checkIDInput, checkIDExist], (req, res) => {});

module.exports = router;
