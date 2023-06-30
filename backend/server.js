import Passage from "@passageidentity/passage-node";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//let app = express();
//import 
//import pkg from "express";

//const cors = require("cors");

const app = express();
const PORT = 7000;
const CLIENT_URL = "http://localhost:3000";

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

// Passage requires an App ID and, optionally, an API Key
const passageConfig = {
  appID: "REmAk9iTPrmSBplcKhmWmEzT",
  apiKey: "gkaaZdylrt.y3rgP4u2PMavSNsO8NEQRdh20gA0OSQqNg15UcgaiPq1QzRqhlIkrbWlcfBVuJzA",
  authStrategy: "HEADER",
};

//const {app} = pkg;

//const cors = require("cors");

//const app = express();
//const PORT = 7000;
//const CLIENT_URL = "http://localhost:3000";

// require("dotenv").config();

// app.use(express.json());
// app.use(
//   cors({
//     origin: CLIENT_URL,
//   })
// );

// import Passage from "@passageidentity/passage-node";

// const passageConfig = {
//   appID: process.env.PASSAGE_APP_ID,
//   apiKey: process.env.PASSAGE_API_KEY,
// };

// import dotenv from "dotenv";
// dotenv.config();

//const PORT = process.env.PORT;


// example of passage middleware
// let passage = new Passage(passageConfig);
// let passageAuthMiddleware = (() => {
//     return async (req, res, next) => {
//         try {
//             let userID = await passage.authenticateRequest(req);
//             if (userID) {
//               // user authenticated
//               res.userID = userID;  
//               next();
//             }
//         } catch(e) {
//             // failed to authenticate
//             // we recommend returning a 401 or other "unauthorized" behavior
//             console.log(e);
//             res.status(401).send('Could not authenticate user!');
//         }
//     }
// })();

// app.get("/authenticatedRoute", passageAuthMiddleware, async(req, res) => {
//     let userID = res.userID
//     // do authenticated things... 
// });
//const app = express();

// Authentication using Passage class instance
let passage = new Passage(passageConfig);
app.get("/authenticatedRoute", async(req, res) => {
  try {
    // Authenticate request using Passage
    let userID = await passage.authenticateRequest(req);
    if (userID) {
      // User is authenticated
      let userData = await passage.user.get(userID);
      console.log(userData);
    }
  } catch (e) {
    // Authentication failed
    console.log(e);
    res.send("Authentication failed!");
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

