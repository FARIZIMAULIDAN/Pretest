// routes/pendidikan.js
const express = require('express');
const router = express.Router();
const Model_pendidikan = require('../model/model_pendidikan');
const Model_mahasiswa = require('../model/model_mahasiswa');  // Import MahasiswaModel

router.get("/", async (req, res, next) => {
  try {
    let rows = await Model_pendidikan.getAll();
    res.render("pendidikan/index", { data: rows });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    let mahasiswaRows = await Model_mahasiswa.getAll();
    res.render("pendidikan/create", { mahasiswaData: mahasiswaRows });
  } catch (error) {
    next(error);
  }
});

router.post("/store", async (req, res, next) => {
  try {
    const pendidikanData = req.body;
    await Model_pendidikan.store(pendidikanData);
    req.flash("success", "Berhasil menyimpan data Pendidikan");
    res.redirect("/pendidikan");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data Pendidikan");
    res.redirect("/pendidikan");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let rows = await Model_pendidikan.getById(id);
    res.render("pendidikan/edit", { data: rows[0] });
  } catch (error) {
    next(error);
  }
});

router.post("/update/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const pendidikanData = req.body;
      await Model_pendidikan.update(id, pendidikanData);
      req.flash("success", "Berhasil menyimpan data Pendidikan");
      res.redirect("/pendidikan");
    } catch (error) {
      req.flash("error", "Gagal menyimpan data Pendidikan");
      res.redirect("/pendidikan");
    }
  });
  

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Model_pendidikan.delete(id);
    req.flash("success", "Berhasil menghapus data Pendidikan");
    res.redirect("/pendidikan");
  } catch (error) {
    req.flash("error", "Gagal menghapus data Pendidikan");
    res.redirect("/pendidikan");
  }
});

module.exports = router;