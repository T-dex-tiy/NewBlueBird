const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  console.log(req.body.Res);
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = "";
  });
});

const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} `);
});
