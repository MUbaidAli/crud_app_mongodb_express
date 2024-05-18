const connectDB = require("./config/connectDB");
const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");
const Chat = require("./models/chat");

// setting ejs as view engine and also making a default path.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// static path for public
app.use(express.static(path.join(__dirname, "/public")));
// using method overrise
app.use(methodOverride("_method"));

//for forms data to parse
app.use(express.urlencoded({ extended: true }));

// database Connection => config/connectDB.js
connectDB();
const port = 8484;

const chat1 = new Chat({
  from: "umar",
  to: "papa",
  date: new Date(),
  msg: "",
});

// chat1
//   .save()
//   .then((res) => {
//     console.log("chat Send");
//   })
//   .catch((err) => console.log(err.errors.msg));
// http://localhost:8484/app/new

app.delete("/app/:id", async (req, res) => {
  const { id } = req.params;

  await Chat.findByIdAndDelete(id);

  res.redirect("/app");
});

app.patch("/app/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { msg: newMsg } = req.body;

  await Chat.findByIdAndUpdate(id, { msg: newMsg, date: new Date() });

  res.redirect("/app");
});

app.get("/app/edit/:id", async (req, res) => {
  const { id } = req.params;

  const data = await Chat.findOne({ _id: id });
  console.log(data, "testttt");
  res.render("edit.ejs", { data });
});

app.post("/app/new", (req, res) => {
  const { from, to, msg } = req.body;

  const data = Chat({ from, to, msg, date: new Date() });

  data
    .save()
    .then((res) => console.log("data added"))
    .catch((err) => {
      console.log(err);
    });
  //   console.log(data);
  res.redirect("/app");
});

app.get("/app/new", (req, res) => {
  res.render("newChat.ejs");
});

app.get("/app", async (req, res) => {
  const data = await Chat.find({});
  console.log(data);
  res.render("app.ejs", { data });
});

app.listen(port, () => {
  console.log("server running.");
});
