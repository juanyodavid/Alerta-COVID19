const express = require("express");
const { route } = require(".");
const router = express.Router();

const Local = require("../models/Local");
const { isAuthenticated } = require('../helpers/auth');

router.get("/local/add", isAuthenticated, (req, res) => {
  res.render("local/local_add");
});

router.post("/local/local_add",isAuthenticated, async (req, res) => {
  const { lugar, ubicacion, propietario } = req.body;
  const errors = [];
  if (!lugar) {
    errors.push({ text: "Ingrese el nombre del lugar." });
  }
  if (!ubicacion) {
    errors.push({ text: "Ingrese una ubicación." });
  }
  if (!propietario) {
    errors.push({ text: "Ingrese el nombre del propietario." });
  }
  if (errors.length > 0) {
    res.render("local/local_add", {
      errors,
      lugar,
      ubicacion,
      propietario,
    });
    // res.send('incorrecto');
  } else {
    // res.send('Datos ingresados correctamente.');
    const localNuevo = new Local({ lugar, ubicacion, propietario });
    await localNuevo.save();
    const correcto = [];
    correcto.push({ text: "Datos cargados correctamente." });
    res.render("local/local_add", { correcto });
  }
  // console.log(req.body);
});

router.get("/local/vista", isAuthenticated, async (req, res) => {
  await Local.find()
    .sort({ fecha: "desc" })
    .then((documentos) => {
      const contexto = {
        locales: documentos.map((documento) => {
          return {
            _id: documento._id,
            lugar: documento.lugar,
            ubicacion: documento.ubicacion,
            propietario: documento.propietario,
            fecha: documento.fecha,
          };
        }),
      };
      res.render("local/local_vista", {
        locales: contexto.locales,
      });
    });
});

router.get("/local/edit/:id", isAuthenticated, async (req, res) => {
  const local = await Local.findById(req.params.id).then((data) => {
    return {
      id: data.id,
      lugar: data.lugar,
      ubicacion: data.ubicacion,
      propietario: data.propietario,
    };
  });

  res.render("local/local_edit", { local });
});

router.put("/local/local_edit/:id", isAuthenticated, async (req, res) => {
  const { lugar, ubicacion, propietario } = req.body;
  await Local.findByIdAndUpdate(req.params.id, {
    lugar,
    ubicacion,
    propietario,
  });
  req.flash('success_msg', 'Edición realizada exitosamente.');
  res.redirect("/local/vista");
});

router.delete("/local/delete/:id", isAuthenticated, async (req, res) => {
  await Local.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Eliminación realizada exitosamente.');
  res.redirect("/local/vista");
});


module.exports = router;
