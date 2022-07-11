const express = require("express");
const router = express.Router();
const User = require("../models/commentModel");

router.get("/", async (req, res) => {
  const see = await User.find({});
  //console.log(see);
  res.render("comments", { see });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  //res.redirect("comments");
  const gr = req.body;
  const add = new User(gr);
  await add.save();
  res.redirect("comments");
});

router.get("/add", async (req, res) => {
  res.render("add");
});

router.get("/addapi", async (req, res) => {
  const finder = await User.find({});
  res.json(finder);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const find = await User.findById(id);
  //console.log(find);
  res.render("view", { find });
});

router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const find = await User.findById(id);
  res.render("edit", { find });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const ig = req.body;
  const find = await User.findByIdAndUpdate(id, ig, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/comments/${find._id}`);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const del = await User.findByIdAndDelete(id);
  res.redirect("/comments");
});

module.exports = router;
