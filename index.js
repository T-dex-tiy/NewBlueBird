const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const api_key = "";
const domain = "sandbox5b0ca462d46e428f80aae64482cfcce0.mailgun.org";
const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
const path = require("path");
const filepath = path.join(__dirname, "./mainlogo.png");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  const email = req.body.user;
  const htmlEmail = `
  <body style="padding:0;margin:0;">
    <table style="width:100%; background-color:#D48C3C;border:1px solid black;padding:0;margin:0;height:10vh">
      <tr>
        <th align="right">
          <h1>Bluebird Heli</h1><a href="https://cloudveilmountainheli.com/"><img src="cid:mainlogo.png" style="height:15vh;z-index:100;"/></a>
        </th>
      </tr>
  </table>
  <table>
    <Head style="color:blue; width:100vh: height:15vh;">This will be a title header for the email</head>
    <p style="color:red; font-size:32px;">${req.body.user}</p>
    <p>You will be flying from out of the ${req.body.Res.operatingArea}</p>
    <p>You will be picked up at our ${req.body.Res.pickupLocation}</p>
    <p>You are going to be flying with a party of ${
      req.body.Res.numberOfAttendees
    }</p>
    <p>On ${req.body.Res.day}</p>
  </table>`;
  console.log(req.body.Res, req.body.user);
  var data = {
    from: "dex.mills@dexmills.com",
    to: email,
    subject: "Hello",
    html: htmlEmail,
    inline: filepath
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
  });
});

const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} `);
});
