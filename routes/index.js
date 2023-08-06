var express = require("express");
var router = express.Router();
const UserModel = require("../models/userModel");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Homepage" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Sign-Up" });
});

router.post("/signup", async function (req, res, next) {
  try {
    const newuser = new UserModel(req.body);
    await newuser.save();
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Sign-In" });
});

router.post("/signin", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

router.get("/profile", async function (req, res, next) {
  try {
    const users = await UserModel.find();
    res.render("profile", { title: "Profile", users });
  } catch (error) {
    res.send(error);
  }
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

router.get("/update/:id", async function (req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.render("update", { title: "Update", user });
  } catch (error) {
    res.send(error);
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    await UserModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/profile");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
