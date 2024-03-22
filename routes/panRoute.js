const express = require("express");
const tax = require("../model/panModel.js");
const route = express.Router();
const cors = require("cors");

let corsOptions = {
  orgin: ["http://localhost:4500"],
};

route.post("/addHolderDetails", cors(corsOptions), (req, res) => {
  const pan = new tax(req.body);
  pan.save();
  res.status(201).json(pan);
});
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
    const id = await tax.findByIdAndDelete(req.params.id);
    res.status(201).json(id);
  }
);
module.exports = route;
