const express = require("express");
const Passage = require("@passageidentity/passage-node");
const cors = require("cors");
const fs = require("fs");
const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
const ILovePDFFile = require('@ilovepdf/ilovepdf-nodejs/ILovePDFFile');

const instance = new ILovePDFApi('project_public_f72f346aea6cb487650e68b2a054ef66_-WRcg1ff1dc7cc293ee2495be2a35424e7263', 'secret_key_2a6c4d02413bc4e267ed9ec7c7e44bb8_GEdTF5858a8801016d9aaf8c8e052c95fc32c');
const task = instance.newTask('unlock');

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

      task.start()
.then(() => {
  const file = new ILovePDFFile("../sampleFile.pdf")
    return task.addFile(file);
})
.then((file) => {
    file.params.password = "191999";
    return task.process();
})
.then(() => {
    return task.download();
})
.then((data) => {
    console.log('DONE');
    console.log(data)
    fs.writeFileSync("../outFile1.pdf", data)
});

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

app.post("/magicLinkMessage1", async (req, res) => {
  try{
  console.log("req", req.body)
  // task.start()
  // .then(() => {
  //   const file = new ILovePDFFile("../sampleFile.pdf")
  //     return task.addFile(file);
  // })
  // .then((file) => {
  //     file.params.password = "191999";
  //     return task.process();
  // })
  // .then(() => {
  //     return task.download();
  // })
  // .then(async(data) => {
  //     console.log('DONE');
  //     fs.writeFileSync("../outFile.pdf", data)
  //     // let magicLink = await passage.createMagicLink({
  //     //   email: req.body.targetEmail,
  //     //   redirect_url: "/magicLinkMessage" ,
  //     //   magic_link_path: "/magicLinkMessage",
  //     //   send: true,
  //     //   channel: "email"
  //     // });
  //     // console.log(magicLink.url)
  //     // res.json({message: "Link sent successfully", pdfPath: "../outFile.pdf"})
  // });
  let magicLink = await passage.createMagicLink({
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


