const express = require("express");
const Verses = require("../models").verses;
const Books = require("../models").books;

// const Op = require('sequelize').Op;
const router = express.Router();

router.use((req, res, next) => {
  next();
});

/**
 * Get All Records
 */
router.get("/", (req, res) => {
  const chapter = req.query.chapter || 1;
  const bookId = req.query.bookId || 1;
  // const filter = req.query.filter || '';
  // const fields = req.query.f ? req.query.f.split(',') : [];

  let where = {
    chapter: chapter,
    bookId: bookId
  };

  Verses.findAndCountAll({
    where: where
  })
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
router.get("/:id", (req, res) => {
  Verses.findByPk(req.params.id)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.status(400).json(error);
    });
});

/**
 * Store Record
 */
// router.post("/", (req, res) => {});

/**
 * Update Record
 */
// router.put("/:id", (req, res) => {});

/**
 * Delete Record
 */
// router.delete("/:id", (req, res) => {});

module.exports = router;
