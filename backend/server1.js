const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");

const app = express();
const PORT = 7000;
const CLIENT_URL = "http://localhost:3000";

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "HEADER",
});

app.post("/auth", async (req, res) => {
  try {
    const userID = await passage.authenticateRequest(req);
    if (userID) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userID);
      const identifier = email ? email : phone;

      // let magicLink = await passage.createMagicLink({
      //   email: "karasani.tejaswi01@gmail.com",
      //   redirect_url: "/magicLinkMessage" ,
      //   magic_link_path: "/magicLinkMessage",
      //   send: true,
      //   channel: "email"
      // });

      // console.log(magicLink.url)

      res.json({
        authStatus: "success",
        identifier,
      });
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.json({
      authStatus: "failure",
    });
  }
});

app.post("/magicLinkMessage", async (req, res) => {
  try{
  console.log("req", req.body)
  let magicLink = await passage.createMagicLink({
        //email: "karasani.tejaswi01@gmail.com",
        email: req.body.targetEmail,
        redirect_url: "/magicLinkMessage" ,
        magic_link_path: "/magicLinkMessage",
        send: true,
        channel: "email"
      });
      console.log(magicLink.url)
      res.json({message: "Link sent successfully"})
    }
    catch (e) {
      // Magic link not sent
      console.log(e);
      res.json({
        message: "Link is not sent",
      });
    }
})


// let magicLink = await passage.createMagicLink({
      //   email: "karasani.tejaswi01@gmail.com",
      //   redirect_url: "/magicLinkMessage" ,
      //   magic_link_path: "/magicLinkMessage",
      //   send: true,
      //   channel: "email"
      // });

      // console.log(magicLink.url)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app


