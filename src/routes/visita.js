const express = require("express");
const { route } = require(".");
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');


router.get('/visita',isAuthenticated,(req,res)=>{
    res.render("visita/visita_add");
});

// router.get("/local/edit/:id", isAuthenticated, async (req, res) => {
//     const local = await Local.findById(req.params.id).then((data) => {
//       return {
//         id: data.id,
//         lugar: data.lugar,
//         ubicacion: data.ubicacion,
//         propietario: data.propietario,
//       };
//     });
  
//     res.render("local/local_edit", { local });
//   });
  
//   router.put("/local/local_edit/:id", isAuthenticated, async (req, res) => {
//     const { lugar, ubicacion, propietario } = req.body;
//     await Local.findByIdAndUpdate(req.params.id, {
//       lugar,
//       ubicacion,
//       propietario,
//     });
//     req.flash('success_msg', 'Edición realizada exitosamente.');
//     res.redirect("/local/vista");
//   });
  

module.exports = router;
