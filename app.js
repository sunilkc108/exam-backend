const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/auth/auth");
const adminRoute = require("./routes/admin/series");
const studentRoute = require("./routes/student/answer");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

require("./dbConfig.js");

app.use(cors());

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/student", studentRoute);

async function add(a, b) {
  return a + b;
}

// function resolveAfter2Seconds() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("resolve");
//       resolve("resolved");
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   await resolveAfter2Seconds();
//   console.log("calling");

//   // expected output: "resolved"
// }

// asyncCall();

app.get("/test", (req, res, next) => {
  res.json({ name: "Pramod", address: "Jorpati", phone: "1234" });
});

app.use((req, res, next) => {
  return next({ msg: "Page not found", status: 404 });
});

app.listen(5055, () => {
  console.log("server listening on 5055");
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let msg = err.msg || err;
  console.log(err);
  res.status(status).json({ msg: msg });
});
