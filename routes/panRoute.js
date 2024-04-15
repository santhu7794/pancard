const express = require("express");
const tax = require("../model/panModel.js");
const route = express.Router();
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "photo/",
  filename: (req, file, pan) => {
    pan(null, file.originalname);
  },
});
const photo = multer({ storage });

let corsOptions = {
  orgin: ["http://localhost:4500"],
};
//file upload
route.post(
  "/uploadphoto",
  cors(corsOptions),
  photo.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "nofile" });
    }
    var data = {
      Cardholder: req.body.Cardholder,
      image: req.file.filename,
    };
    try {
      const name = await tax.create(data);
      return res.status(200).json(name);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
);
// route.post("/addHolderDetails", cors(corsOptions), (req, res) => {
//   const pan = new tax(req.body);
//   pan.save();
//   res.status(201).json(pan);
// });
route.get("/holderlist", cors(corsOptions), async (req, res) => {
  try {
    const holderlist = await tax.find();
    res.status(201).json(holderlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

route.put("/updatePancard/:id", cors(corsOptions), async (req, res) => {
  const update = await tax.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(201).json(update);
});
route.delete(
  "/deleteflasepandetails/:id",
  cors(corsOptions),
  async (req, res) => {
    const deletepan = await tax.findByIdAndDelete(req.params.id);
    res.status(201).json(deletepan);
  }
);
module.exports = route;
