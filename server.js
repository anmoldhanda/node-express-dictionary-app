const express = require("express");
const { request } = require("http");
const axios = require("axios").default;
const { chownSync } = require("fs");
const path = require("path");
const app = express();
const port = process.env.port || 3000;

// const port = process.env.port || 3000;
// if the above port worked then fine otherwise run this command to change the port PORT=3001 nodemon server.js

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/searchword", (req, res) => {
  //   res.send("dictionary api");
  let apiword = req.query.word;
  let networkrequestdetails = {
    // api credentials
    method: "GET",
    url: "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary",
    params: { word: apiword },
    headers: {
      "X-RapidAPI-Key": "9899c63796mshaa966f42b9b993fp1f5720jsn5ecf87f99a36",
      "X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com",
    },
  };

  // demo data for testing purpose in future
  // let response = {};
  // response.data = {
  //   definition:
  //     "See Brite, v. i.\n" +
  //     "\n" +
  //     "1. Radiating or reflecting light; shedding or having much light; shining; luminous; not dark. The sun was bright o'erhead. Longfellow. The earth was dark, but the heavens were bright. Drake. The public places were as bright as at noonday. Macaulay. 2. Transmitting light; clear; transparent. From the brightest wines He 'd turn abhorrent. Thomson. 3. Having qualities that render conspicuous or attractive, or that affect the mind as light does the eye; resplendent with charms; as, bright beauty. Bright as an angel new-dropped from the sky. Parnell. 4. Having a clear, quick intellect; intelligent. 5. Sparkling with wit; lively; vivacious; shedding cheerfulness and joy around; cheerful; cheery. Be bright and jovial among your guests. Shak. 6. Illustrious; glorious. In the brightest annals of a female reign. Cotton. 7. Manifest to the mind, as light is to the eyes; clear; evident; plain. That he may with more ease, with brighter evidence, and with surer success, draw the bearner on. I. Watts. 8. Of brilliant color; of lively hue or appearance. Here the bright crocus and blue violet grew. Pope. Note: Bright is used in composition in the sense of brilliant, clear, sunny, etc.; as, bright-eyed, bright-haired, bright-hued. Syn. -- Shining; splending; luminous; lustrous; brilliant; resplendent; effulgent; refulgent; radiant; sparkling; glittering; lucid; beamy; clear; transparent; illustrious; witty; clear; vivacious; sunny.\n" +
  //     "\n" +
  //     "Splendor; brightness. [Poetic] Dark with excessive bright thy skirts appear. Milton.\n" +
  //     "\n" +
  //     "Brightly. Chaucer. I say it is the moon that shines so bright. Shak.\n" +
  //     "\n" +
  //     "To be or become overripe, as wheat, barley, or hops. [Prov. Eng.]",
  //   word: apiword,
  //   valid: true,
  // };
  // console.log(response.data.word);
  // console.log(response.data.definition);
  // response.json(apidata.data);

  axios
    .request(networkrequestdetails)
    .then((response) => {
      // console.log(networkrequestdetails.params);
      console.log(response.data.word);
      console.log(response.data.definition);
      res.json(response.data);
      // sending the api response back to the client side
    })
    .catch((error) => {
      console.log(error);
      // if any kind of internal server error occured
      res.status(500).send("error occured");
    });
});

app.listen(port, () => {
  console.log(`example app listening on port http://localhost:${port}`);
});
